import fetchFromApi from '../services/fetchAPI.js';

export async function register(username, password) {
  try {
    const response = await fetchFromApi('users', {
      method: 'POST',
      body: JSON.stringify({ userName: username, password: password }),
    });
    if (!response) {
      throw new Error('Registration failed');
    }
    return response;
  } catch (error) {
    console.error('An error occurred while registering:', error);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.querySelector('#register-form');
  const errorMessage = document.querySelector('#error-message');
  const apiBaseUrl = 'https://66437f986c6a6565870755ab.mockapi.io/users';

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = registerForm.username.value;
    const password = registerForm.password.value;

    try {
      const response = await register(username, password);

      if (!response) {
        throw new Error('Registration failed');
      }

      localStorage.setItem('token', response.token);

      // Redirecciona a la página de login después del registro exitoso
      window.location.href = '/login.html';
    } catch (error) {
      console.error('An error occurred during registration:', error);
      errorMessage.style.display = 'block';
    }
  });
});
