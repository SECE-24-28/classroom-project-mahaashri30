// Cart functionality
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

let cartItems = getCart();

const cartItemsContainer = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartSummary = document.getElementById('cartSummary');
const checkoutBtn = document.getElementById('checkoutBtn');

function renderCart() {
    if (cartItems.length === 0) {
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCart);
        return;
    }

    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">₹${item.price.toLocaleString()}</div>
            </div>
            <div class="item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn decrease" data-id="${item.id}">−</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join('');

    updateSummary();
    attachEventListeners();
}

function updateSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    document.getElementById('tax').textContent = `₹${tax.toLocaleString()}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString()}`;
}

function attachEventListeners() {
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cartItems.find(i => i.id == id);
            if (item) {
                item.quantity++;
                saveCart(cartItems);
                renderCart();
            }
        });
    });

    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cartItems.find(i => i.id == id);
            if (item && item.quantity > 1) {
                item.quantity--;
                saveCart(cartItems);
                renderCart();
            }
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            cartItems = cartItems.filter(i => i.id != id);
            saveCart(cartItems);
            renderCart();
        });
    });
}

checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Store cart items for checkout
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
    window.location.href = 'checkout.html';
});

// Refresh cart from localStorage on page load
function refreshCart() {
    cartItems = getCart();
    renderCart();
}

// Initialize cart
refreshCart();

// Listen for storage changes from other pages
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        refreshCart();
    }
});
