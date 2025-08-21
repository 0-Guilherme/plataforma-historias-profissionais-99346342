// Authentication functionality

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    
    // Handle signup form
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Handle login form
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    // Validate form data
    if (!data.name.trim()) {
        window.utils.showToast('Por favor, informe seu nome completo', 'error');
        return;
    }
    
    if (!window.utils.validateEmail(data.email)) {
        window.utils.showToast('Por favor, informe um e-mail válido', 'error');
        return;
    }
    
    if (!window.utils.validatePassword(data.password)) {
        window.utils.showToast('A senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('#submitText').textContent;
    
    // Set loading state
    window.utils.setLoadingState(submitBtn, true, originalText);
    
    try {
        // Simulate API call
        await simulateApiCall();
        
        // Save user data (in a real app, this would come from the server)
        const userData = {
            id: Date.now(),
            name: data.name,
            email: data.email,
            createdAt: new Date().toISOString()
        };
        
        window.utils.saveToLocalStorage('user', userData);
        window.utils.showToast('Conta criada com sucesso! Bem-vindo!');
        
        // Redirect to stories page
        setTimeout(() => {
            window.location.href = 'historias.html';
        }, 1500);
        
    } catch (error) {
        window.utils.showToast('Erro ao criar conta. Tente novamente.', 'error');
    } finally {
        window.utils.setLoadingState(submitBtn, false, originalText);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    // Validate form data
    if (!window.utils.validateEmail(data.email)) {
        window.utils.showToast('Por favor, informe um e-mail válido', 'error');
        return;
    }
    
    if (!data.password.trim()) {
        window.utils.showToast('Por favor, informe sua senha', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('#submitText').textContent;
    
    // Set loading state
    window.utils.setLoadingState(submitBtn, true, originalText);
    
    try {
        // Simulate API call
        await simulateApiCall();
        
        // Simulate successful login (in a real app, this would validate against the server)
        const userData = {
            id: Date.now(),
            name: 'Usuário Logado',
            email: data.email,
            loginAt: new Date().toISOString()
        };
        
        window.utils.saveToLocalStorage('user', userData);
        window.utils.showToast('Bem-vindo de volta!');
        
        // Redirect to stories page
        setTimeout(() => {
            window.location.href = 'historias.html';
        }, 1500);
        
    } catch (error) {
        window.utils.showToast('E-mail ou senha incorretos', 'error');
    } finally {
        window.utils.setLoadingState(submitBtn, false, originalText);
    }
}

// Simulate API call delay
function simulateApiCall() {
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}

// Check if user is logged in
function isLoggedIn() {
    return window.utils.getFromLocalStorage('user') !== null;
}

// Get current user
function getCurrentUser() {
    return window.utils.getFromLocalStorage('user');
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.utils.showToast('Você foi desconectado');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Update navigation for logged in users
document.addEventListener('DOMContentLoaded', function() {
    if (isLoggedIn()) {
        const user = getCurrentUser();
        const navButtons = document.querySelector('.nav-buttons');
        
        if (navButtons) {
            navButtons.innerHTML = `
                <span class="nav-user">Olá, ${user.name.split(' ')[0]}</span>
                <button class="btn btn-ghost" onclick="logout()">Sair</button>
            `;
        }
    }
});

// Export functions for use in other scripts
window.auth = {
    isLoggedIn,
    getCurrentUser,
    logout
};