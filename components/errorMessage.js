// src/components/errorMessage.js

export function displayErrorMessage(message) {
    let errorElement = document.getElementById('error-message');
  
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = 'error-message';
      errorElement.className = 'text-red-500 p-2 mb-4';
      document.nav.prepend(errorElement); // Prepend to the nav container
    }
  
    errorElement.textContent = message;
  
    // Optionally, remove the error message after a few seconds
    setTimeout(() => {
      errorElement.textContent = '';
    }, 5000);
  }