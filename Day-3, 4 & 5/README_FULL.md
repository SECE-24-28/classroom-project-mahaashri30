# Active Aura - Full E-Commerce Gadget Store

Complete full-stack e-commerce platform with frontend, backend, database, and admin panel.

## 🚀 Features

### Frontend
- ✅ Responsive homepage with hero slider
- ✅ Product listing with filters
- ✅ Product details page
- ✅ Shopping cart system
- ✅ Checkout with payment options
- ✅ User authentication (Login/Signup)
- ✅ About, Contact, FAQ pages
- ✅ Light/Dark mode toggle
- ✅ Search and filter system

### Backend
- ✅ Node.js + Express REST API
- ✅ JSON file-based database
- ✅ User authentication with bcrypt
- ✅ Product management
- ✅ Order processing
- ✅ Cart management

### Admin Panel
- ✅ Dashboard with analytics
- ✅ Product CRUD operations
- ✅ Order management
- ✅ User management
- ✅ Add/Edit/Delete products

## 📁 Project Structure

```
E-commerce - Gadgets/
├── db/
│   ├── products.json       # Product database
│   ├── users.json          # User accounts
│   ├── orders.json         # Order history
│   └── cart.json           # Shopping carts
├── images/                 # Product images
├── home.html              # Homepage
├── about.html             # About page
├── contact.html           # Contact page
├── faq.html               # FAQ page
├── login.html             # Login page
├── signup.html            # Signup page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout page
├── product-details.html   # Product details
├── admin.html             # Admin dashboard
├── *.css                  # Stylesheets
├── *.js                   # JavaScript files
├── server.js              # Backend server
└── package.json           # Dependencies
```

## 🛠 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- express (Web framework)
- bcrypt (Password hashing)
- cors (Cross-origin requests)

### 2. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Server will run on: `http://localhost:3000`

### 3. Open the Website

Open `home.html` in your browser or navigate to:
```
http://localhost:3000/home.html
```

## 🔐 Default Admin Credentials

- **Email:** admin@activeaura.com
- **Password:** admin123

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/admin/products` - Add product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

### Authentication
- `POST /api/signup` - Create new user
- `POST /api/login` - User login

### Cart
- `POST /api/cart` - Add to cart
- `GET /api/cart/:userId` - Get user cart

### Orders
- `POST /api/checkout` - Place order
- `GET /api/admin/orders` - Get all orders (admin)

### Admin
- `GET /api/admin/users` - Get all users (admin)

## 🎨 Pages Overview

### Customer Pages
1. **Home** - Hero slider, featured products, trending items
2. **Product Details** - Full product info, specs, related products
3. **Cart** - View cart, update quantities, remove items
4. **Checkout** - Shipping details, payment options
5. **Login/Signup** - User authentication
6. **About** - Company information
7. **Contact** - Contact form and info
8. **FAQ** - Common questions

### Admin Pages
1. **Dashboard** - Analytics and stats
2. **Products** - Manage products
3. **Orders** - View all orders
4. **Users** - View all users

## 🔍 Search & Filter

Products can be filtered by:
- Search query (name/description)
- Category
- Brand
- Price range
- Rating

## 💳 Payment Methods

- Credit/Debit Card (dummy validation)
- UPI
- Cash on Delivery

## 📦 Sample Products

The database includes 8 sample products:
1. Pixel Pro X (Smartphone)
2. ActiveBook 15 (Laptop)
3. AuraPods Pro (Earbuds)
4. Smart Watch Pro
5. Wireless Headphone X
6. BassBoom Speaker
7. Digital Camera 4K
8. Smart TV 55"

All products include real images from Unsplash.

## 🎯 Key Features

### Light/Dark Mode
- Toggle between themes
- Preference saved in localStorage
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

### Cart System
- Add/remove items
- Update quantities
- Auto-calculate totals
- Free shipping over ₹999

### Security
- Password hashing with bcrypt
- Input validation
- Secure API endpoints

## 🚀 Deployment

### Frontend
Deploy to:
- Netlify
- Vercel
- GitHub Pages

### Backend
Deploy to:
- Heroku
- Railway
- Render

### Database
For production, migrate to:
- MongoDB
- PostgreSQL
- MySQL

## 📝 Customization

### Add New Products
1. Use Admin Panel → Products → Add Product
2. Or edit `db/products.json` directly

### Change Colors
Edit CSS variables in `home.css`:
```css
:root {
    --accent: #3b82f6;
    --accent-hover: #2563eb;
}
```

### Add Payment Gateway
Integrate in `checkout.js`:
- Razorpay
- Stripe
- PayPal

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is available
- Run `npm install` again

### Products not loading
- Ensure server is running
- Check browser console for errors
- Verify `db/products.json` exists

### Login not working
- Check if bcrypt is installed
- Verify `db/users.json` exists

## 📄 License

MIT License - Free to use for personal and commercial projects

## 🤝 Support

For issues or questions:
- Email: support@activeaura.com
- Phone: +91 98765 43210

---

**Built with ❤️ for Active Aura Gadget Store**
