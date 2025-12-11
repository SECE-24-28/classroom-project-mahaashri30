const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

async function loadProduct() {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        const product = await response.json();
        
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `₹${product.price.toLocaleString()}`;
        document.getElementById('productOriginalPrice').textContent = `₹${product.originalPrice.toLocaleString()}`;
        document.getElementById('productDiscount').textContent = `${product.discount}% OFF`;
        document.getElementById('productDescription').textContent = product.description;
        
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        document.getElementById('productRating').textContent = stars;
        document.querySelector('.rating-text').textContent = `${product.rating} / 5`;
        
        const specsList = document.getElementById('productSpecs');
        product.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });
        
        loadRelatedProducts(product.category);
    } catch (error) {
        console.error('Failed to load product:', error);
    }
}

async function loadRelatedProducts(category) {
    try {
        const response = await fetch(`http://localhost:3000/api/products?category=${category}`);
        const products = await response.json();
        const related = products.filter(p => p.id != productId).slice(0, 4);
        
        const grid = document.getElementById('relatedProducts');
        related.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="discount-tag">${product.discount}% OFF</div>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price-row">
                    <span class="price">₹${product.price.toLocaleString()}</span>
                    <span class="old-price">₹${product.originalPrice.toLocaleString()}</span>
                </div>
                <button class="add-cart-btn" onclick="window.location.href='product-details.html?id=${product.id}'">View Details</button>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to load related products:', error);
    }
}

document.getElementById('addToCartBtn').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id == productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const btn = document.getElementById('addToCartBtn');
    btn.textContent = '✓ Added to Cart';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.background = '';
    }, 2000);
    
    updateCartCount();
});

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

loadProduct();
updateCartCount();
