// Section Navigation
document.querySelectorAll('.admin-nav a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        
        document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
        
        document.getElementById('sectionTitle').textContent = 
            section.charAt(0).toUpperCase() + section.slice(1);
        
        loadSectionData(section);
    });
});

async function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            await loadDashboard();
            break;
        case 'products':
            await loadProducts();
            break;
        case 'orders':
            await loadOrders();
            break;
        case 'users':
            await loadUsers();
            break;
    }
}

async function loadDashboard() {
    try {
        const [products, orders, users] = await Promise.all([
            fetch('http://localhost:3000/api/products').then(r => r.json()),
            fetch('http://localhost:3000/api/admin/orders').then(r => r.json()),
            fetch('http://localhost:3000/api/admin/users').then(r => r.json())
        ]);
        
        document.getElementById('totalProducts').textContent = products.length;
        document.getElementById('totalOrders').textContent = orders.length;
        document.getElementById('totalUsers').textContent = users.length;
        
        const revenue = orders.reduce((sum, order) => sum + order.total, 0);
        document.getElementById('totalRevenue').textContent = `₹${revenue.toLocaleString()}`;
    } catch (error) {
        console.error('Failed to load dashboard:', error);
    }
}

async function loadProducts() {
    try {
        const products = await fetch('http://localhost:3000/api/products').then(r => r.json());
        const tbody = document.getElementById('productsTableBody');
        
        tbody.innerHTML = products.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>₹${p.price.toLocaleString()}</td>
                <td>${p.stock}</td>
                <td>
                    <button onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

async function loadOrders() {
    try {
        const orders = await fetch('http://localhost:3000/api/admin/orders').then(r => r.json());
        const tbody = document.getElementById('ordersTableBody');
        
        tbody.innerHTML = orders.map(o => `
            <tr>
                <td>${o.id}</td>
                <td>${o.userId}</td>
                <td>₹${o.total.toLocaleString()}</td>
                <td>${o.status}</td>
                <td>${new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Failed to load orders:', error);
    }
}

async function loadUsers() {
    try {
        const users = await fetch('http://localhost:3000/api/admin/users').then(r => r.json());
        const tbody = document.getElementById('usersTableBody');
        
        tbody.innerHTML = users.map(u => `
            <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>${new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Failed to load users:', error);
    }
}

function showAddProduct() {
    document.getElementById('addProductModal').classList.add('active');
}

function closeModal() {
    document.getElementById('addProductModal').classList.remove('active');
}

document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target[0].value,
        category: e.target[1].value,
        brand: e.target[2].value,
        price: parseInt(e.target[3].value),
        originalPrice: parseInt(e.target[4].value),
        stock: parseInt(e.target[5].value),
        image: e.target[6].value,
        description: e.target[7].value,
        discount: Math.round((1 - parseInt(e.target[3].value) / parseInt(e.target[4].value)) * 100),
        rating: 4.5,
        specs: []
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/admin/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Product added successfully!');
            closeModal();
            loadProducts();
        }
    } catch (error) {
        alert('Failed to add product');
    }
});

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await fetch(`http://localhost:3000/api/admin/products/${id}`, { method: 'DELETE' });
            loadProducts();
        } catch (error) {
            alert('Failed to delete product');
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Load dashboard on page load
loadDashboard();
