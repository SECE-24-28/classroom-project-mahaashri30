const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const formMessage = document.getElementById('formMessage');

togglePassword.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    togglePassword.classList.toggle('active');
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            showMessage('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                if (data.user.role === 'admin') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'home.html';
                }
            }, 1500);
        } else {
            showMessage(data.error || 'Login failed', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
