document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const message = document.createElement('div');
    message.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
    
    // Reset form
    this.reset();
});