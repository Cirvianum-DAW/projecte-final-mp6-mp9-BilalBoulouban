document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const errorMessage = document.querySelector('#error-message');
    const apiBaseUrl = 'https://api.example.com/auth';
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = loginForm.username.value;
      const password = loginForm.password.value;
  
      try {
        const response = await fetch(apiBaseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
  
        // Redirecciona a la página de dashboard después del inicio de sesión exitoso
        window.location.href = '/dashboard.html';
      } catch (error) {
        console.error('An error occurred during login:', error);
        errorMessage.style.display = 'block';
      }
    });
  });
  