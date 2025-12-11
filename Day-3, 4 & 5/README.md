# Active Aura - Premium Gadget Store

A modern, responsive e-commerce website for gadgets with light/dark mode toggle.

## 📁 Project Structure

```
E-commerce - Gadgets/
├── home.html          # Main homepage
├── home.css           # Homepage styles
├── home.js            # Homepage functionality
├── about.html         # About Us page
├── about.css          # About page styles
├── contact.html       # Contact Us page
├── contact.css        # Contact page styles
├── contact.js         # Contact form functionality
├── faq.html           # FAQ page
├── faq.css            # FAQ page styles
├── faq.js             # FAQ accordion functionality
├── login.html         # Login page
├── login.css          # Login page styles
├── login.js           # Login functionality
├── cart.html          # Shopping cart page
├── cart.css           # Cart page styles
├── cart.js            # Cart functionality
├── images/            # Product images folder
│   ├── Active_aura_logo.jpeg
│   ├── pixel_pro_x.jpg
│   ├── activebook_15.jpg
│   ├── aurapods_pro.jpg
│   ├── camera.jpg
│   ├── tv.jpg
│   ├── bassboom_speaker.jpg
│   ├── smartwatch.jpg
│   └── headphone.jpg
└── README.md          # This file
```

## ✨ Features

### Homepage (home.html)
- ✅ Light/Dark mode toggle with localStorage persistence
- ✅ Sticky header with smooth shadow on scroll
- ✅ Search bar with icon (placeholder)
- ✅ Icon navigation (Login, Wishlist, Cart with counter)
- ✅ Animated hero slider with 3 slides
- ✅ Featured products section
- ✅ Trending products section
- ✅ All products grid
- ✅ Smooth scroll animations
- ✅ Add to cart functionality with visual feedback
- ✅ Responsive design for all screen sizes
- ✅ Premium footer with payment methods

### Login Page (login.html)
- ✅ Modern gradient background
- ✅ Email and password fields
- ✅ Toggle password visibility (eye icon)
- ✅ Form validation
- ✅ Success/error message indicators
- ✅ Remember me checkbox
- ✅ Forgot password link
- ✅ Sign up link
- ✅ Back to home link
- ✅ Smooth animations

### Cart Page (cart.html)
- ✅ Dynamic cart items rendering
- ✅ Quantity increase/decrease controls
- ✅ Auto-updating price calculations
- ✅ Remove item functionality
- ✅ Order summary with subtotal, shipping, tax
- ✅ Free shipping on orders above ₹999
- ✅ Checkout button
- ✅ Empty cart state
- ✅ Responsive layout

### About Us Page (about.html)
- ✅ Company story and mission
- ✅ Values and benefits grid
- ✅ Statistics section
- ✅ Responsive design
- ✅ Consistent navigation

### Contact Us Page (contact.html)
- ✅ Contact information display
- ✅ Contact form with validation
- ✅ Success message on submission
- ✅ Responsive grid layout
- ✅ Phone, email, and address details

### FAQ Page (faq.html)
- ✅ Accordion-style questions
- ✅ 8 common customer questions
- ✅ Interactive expand/collapse
- ✅ Return policy, shipping, warranty info
- ✅ Responsive design

## 🎨 Design Features

- **Color Palette**: Modern tech-focused with gradient accents
- **Typography**: System fonts for optimal performance
- **Animations**: Smooth transitions and hover effects
- **Icons**: SVG icons for crisp display
- **Shadows**: Subtle depth with soft shadows
- **Spacing**: Clean, breathable layout

## 🚀 How to Use

1. Open `home.html` in your browser
2. Toggle between light/dark mode using the sun/moon icon
3. Browse products and click "Add to Cart"
4. Click the cart icon to view your cart
5. Click the login icon to access the login page

## 🎯 Theme Toggle

The theme preference is saved in localStorage and persists across sessions.
- Light mode: Clean white background
- Dark mode: Deep blue/slate background

## 📱 Responsive Breakpoints

- Desktop: 1400px max-width
- Tablet: 768px and below
- Mobile: 480px and below

## 🔧 Customization

### Change Colors
Edit CSS variables in `home.css`:
```css
:root {
    --accent: #3b82f6;  /* Primary color */
    --accent-hover: #2563eb;  /* Hover state */
}
```

### Add Products
Edit the product cards in `home.html` or modify the cart data in `cart.js`

### Modify Hero Slides
Change gradient colors in `home.css`:
```css
.hero-slide:nth-child(1) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 💡 Notes

- All functionality is pure HTML/CSS/JavaScript (no frameworks)
- Images should be placed in the `images/` folder
- Cart data is currently hardcoded in `cart.js` (can be connected to backend)
- Login is simulated (can be connected to authentication API)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Built with ❤️ for Active Aura Gadget Store**