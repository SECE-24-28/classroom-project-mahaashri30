const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('.'));

// Helper functions
const readJSON = async (filename) => {
  const data = await fs.readFile(path.join(__dirname, 'db', filename), 'utf8');
  return JSON.parse(data);
};

const writeJSON = async (filename, data) => {
  await fs.writeFile(path.join(__dirname, 'db', filename), JSON.stringify(data, null, 2));
};

// Products API
app.get('/api/products', async (req, res) => {
  try {
    const products = await readJSON('products.json');
    const { category, brand, minPrice, maxPrice, search } = req.query;
    
    let filtered = products;
    
    if (category) filtered = filtered.filter(p => p.category === category);
    if (brand) filtered = filtered.filter(p => p.brand === brand);
    if (minPrice) filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    if (search) filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readJSON('products.json');
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// User Authentication
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await readJSON('users.json');
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await writeJSON('users.json', users);
    
    res.json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readJSON('users.json');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      message: 'Login successful', 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Cart API
app.post('/api/cart', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cart = await readJSON('cart.json');
    
    const existingItem = cart.find(item => item.userId === userId && item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ userId, productId, quantity, addedAt: new Date().toISOString() });
    }
    
    await writeJSON('cart.json', cart);
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.get('/api/cart/:userId', async (req, res) => {
  try {
    const cart = await readJSON('cart.json');
    const products = await readJSON('products.json');
    const userCart = cart.filter(item => item.userId === parseInt(req.params.userId));
    
    const cartWithProducts = userCart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...item, product };
    });
    
    res.json(cartWithProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Orders API
app.post('/api/checkout', async (req, res) => {
  try {
    const { userId, items, total, shippingDetails } = req.body;
    const orders = await readJSON('orders.json');
    
    const newOrder = {
      id: orders.length + 1,
      userId,
      items,
      total,
      shippingDetails,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    await writeJSON('orders.json', orders);
    
    // Clear user cart
    const cart = await readJSON('cart.json');
    const updatedCart = cart.filter(item => item.userId !== userId);
    await writeJSON('cart.json', updatedCart);
    
    res.json({ message: 'Order placed successfully', orderId: newOrder.id });
  } catch (error) {
    res.status(500).json({ error: 'Checkout failed' });
  }
});

// Admin APIs
app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await readJSON('orders.json');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await readJSON('users.json');
    const sanitized = users.map(({ password, ...user }) => user);
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/admin/products', async (req, res) => {
  try {
    const products = await readJSON('products.json');
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    await writeJSON('products.json', products);
    res.json({ message: 'Product added', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const products = await readJSON('products.json');
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      await writeJSON('products.json', products);
      res.json({ message: 'Product updated' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const products = await readJSON('products.json');
    const filtered = products.filter(p => p.id !== parseInt(req.params.id));
    await writeJSON('products.json', filtered);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
