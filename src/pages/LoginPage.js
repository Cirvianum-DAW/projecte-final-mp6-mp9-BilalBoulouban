import { login } from '../services/auth.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#login-form');
  const errorMessage = document.querySelector('#error-message');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    try {
      console.log('Form submitted');
      const user = await login(username, password);
  
      if (user) {
        const userSession = {
          userName: user.userName,
          userId: user.id,
          password: user.password,
        };
        console.log(user);
        localStorage.setItem('userSession', JSON.stringify(userSession));
        localStorage.setItem('isAuthenticated', 'true');
        if (user.admin === true) {
          window.location.href = '../index.html';
        } else {
          window.location.href = '../models/models.html';
        }
      }
    } catch (error) {
      console.error(error);
      errorMessage.textContent = 'Login failed. Please try again.';
      errorMessage.style.display = 'block';
    }
  });
  
});
