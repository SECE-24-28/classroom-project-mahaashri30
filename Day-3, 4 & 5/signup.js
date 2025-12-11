const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const passwordStrength = document.getElementById('passwordStrength');
const signupForm = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');

togglePassword.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
});

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    const levels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#059669'];
    
    if (password.length > 0) {
        passwordStrength.textContent = `Password Strength: ${levels[strength - 1] || 'Weak'}`;
        passwordStrength.style.color = colors[strength - 1] || colors[0];
        passwordStrength.style.display = 'block';
    } else {
        passwordStrength.style.display = 'none';
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Account created successfully! Redirecting...', 'success');
            setTimeout(() => window.location.href = 'login.html', 1500);
        } else {
            showMessage(data.error || 'Signup failed', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again.', 'error');
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}
