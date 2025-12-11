# 🚀 Quick Start Guide

## Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Server
```bash
npm start
```

### Step 3: Open Website
Open your browser and go to:
```
http://localhost:3000/home.html
```

## 🎯 What You Can Do

### As a Customer:
1. Browse products on homepage
2. View product details
3. Add items to cart
4. Checkout and place orders
5. Create account / Login

### As an Admin:
1. Login with: `admin@activeaura.com` / `admin123`
2. View dashboard analytics
3. Add/Edit/Delete products
4. Manage orders
5. View users

## 📂 Key Files

- **home.html** - Main homepage
- **product-details.html** - Product page
- **cart.html** - Shopping cart
- **checkout.html** - Checkout page
- **admin.html** - Admin dashboard
- **server.js** - Backend API

## 🔧 Configuration

### Change Port
Edit `server.js`:
```javascript
const PORT = 3000; // Change to your preferred port
```

### Add Products
1. Go to Admin Panel
2. Click "Add Product"
3. Fill in details with image URL from Unsplash

### Customize Theme
Edit `home.css` CSS variables:
```css
:root {
    --accent: #3b82f6;
    --bg-primary: #ffffff;
}
```

## 🐛 Common Issues

**Server won't start?**
- Make sure port 3000 is free
- Run `npm install` again

**Can't login?**
- Check if server is running
- Try default admin credentials

**Products not showing?**
- Verify `db/products.json` exists
- Check browser console for errors

## 📱 Test on Mobile

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Open on mobile: `http://YOUR_IP:3000/home.html`

## 🎨 Customization Tips

1. **Add your logo**: Replace `images/Active_aura_logo.jpeg`
2. **Change colors**: Edit CSS variables in `home.css`
3. **Add products**: Use admin panel or edit `db/products.json`
4. **Modify footer**: Edit footer section in HTML files

## 📦 Production Deployment

### Frontend (Netlify/Vercel)
1. Push code to GitHub
2. Connect repository
3. Deploy

### Backend (Heroku/Railway)
1. Create new app
2. Connect GitHub repo
3. Add environment variables
4. Deploy

## 💡 Pro Tips

- Use real product images from Unsplash/Pexels
- Test on multiple devices
- Enable HTTPS in production
- Migrate to real database (MongoDB/PostgreSQL)
- Add email notifications
- Integrate payment gateway (Razorpay/Stripe)

## 🆘 Need Help?

- Check `README_FULL.md` for detailed documentation
- Review API endpoints in server.js
- Check browser console for errors
- Verify all files are in correct locations

---

**Happy Coding! 🎉**
