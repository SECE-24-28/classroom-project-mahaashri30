function loadOrderSummary() {
    // Check for checkout items (from Buy Now) or cart items
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || 'null');
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const items = checkoutItems || cartItems;
    const orderItems = document.getElementById('orderItems');
    let subtotal = 0;
    
    if (items.length === 0) {
        orderItems.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">No items to checkout</p>';
        return;
    }
    
    orderItems.innerHTML = '';
    
    items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        orderItems.innerHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;object-fit:cover;border-radius:4px;">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <span class="item-price">₹${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });
    
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString()}`;
}

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems') || 'null');
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const items = checkoutItems || cartItems;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (items.length === 0) {
        alert('No items to checkout!');
        return;
    }
    
    const orderData = {
        orderId: 'ORD' + Date.now(),
        userId: user.id || 'guest',
        items: items,
        total: parseInt(document.getElementById('total').textContent.replace(/[₹,]/g, '')),
        shippingDetails: {
            name: e.target[0].value,
            phone: e.target[1].value,
            email: e.target[2].value,
            address: e.target[3].value,
            city: e.target[4].value,
            pincode: e.target[5].value
        },
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        orderDate: new Date().toISOString()
    };
    
    // Save order to localStorage (simulate backend)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart and checkout items
    if (checkoutItems) {
        localStorage.removeItem('checkoutItems');
    } else {
        localStorage.removeItem('cart');
    }
    
    // Show success message
    alert(`Order placed successfully! Order ID: ${orderData.orderId}`);
    window.location.href = 'home.html';
});

loadOrderSummary();
