const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('cat');

const categoryMap = {
    'earbuds': 'Earbuds',
    'mobiles': 'Mobiles',
    'laptops': 'Laptops',
    'tablets': 'Tablets',
    'smartwatches': 'Smartwatches',
    'gaming': 'Gaming',
    'speakers': 'Speakers',
    'other': 'Other'
};

document.getElementById('categoryTitle').textContent = categoryMap[category] || 'All Products';
document.getElementById('categoryDesc').textContent = `Explore our ${categoryMap[category] || 'products'} collection`;

// Cart functionality
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);
    showAddedToCartMessage();
}

function buyNow(product) {
    // Store single product for checkout
    const checkoutItem = { ...product, quantity: 1 };
    localStorage.setItem('checkoutItems', JSON.stringify([checkoutItem]));
    window.location.href = 'checkout.html';
}

function showAddedToCartMessage() {
    // Create and show success message
    const message = document.createElement('div');
    message.className = 'cart-success-message';
    message.textContent = '✓ Added to cart!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 2000);
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function loadCategoryProducts() {
    try {
        // Filter products by category from products-data.js
        const products = allProducts.filter(product => 
            product.category === categoryMap[category]
        );
        
        const grid = document.getElementById('categoryProducts');
        
        if (products.length === 0) {
            grid.innerHTML = '<p style="text-align:center;padding:60px;color:var(--text-secondary);">No products found in this category</p>';
            return;
        }
        
        grid.innerHTML = products.map(product => `
            <article class="product-card">
                <div class="discount-tag">${product.discount}% OFF</div>
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="price-row">
                    <span class="price">₹${product.price.toLocaleString()}</span>
                    <span class="old-price">₹${product.originalPrice.toLocaleString()}</span>
                </div>
                <div class="product-actions">
                    <button class="add-cart-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">Add to Cart</button>
                    <button class="buy-now-btn" onclick="buyNow(${JSON.stringify(product).replace(/"/g, '&quot;')})">Buy Now</button>
                </div>
            </article>
        `).join('');
    } catch (error) {
        console.error('Failed to load products:', error);
        document.getElementById('categoryProducts').innerHTML = '<p style="text-align:center;padding:60px;color:var(--text-secondary);">Failed to load products. Please try again.</p>';
    }
}

// Initialize
loadCategoryProducts();
updateCartCount();
