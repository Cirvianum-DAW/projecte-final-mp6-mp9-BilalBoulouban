// Funció per comprovar si l'usuari està autenticat
function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

// Funció per gestionar el logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('isAuthenticated');
  // Redirecciona a la pàgina d'inici després de tancar la sessió
  window.location.href = 'index.html';
}

// Funció per gestionar la visibilitat dels enllaços de navegació
function renderNavbar(isAuthenticated) {
  const navLinks = document.getElementById('nav-links');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const profileLink = document.getElementById('profile-link');
  const logoutLink = document.getElementById('logout-link');

  if (isAuthenticated) {
      loginLink.style.display = 'none';
      registerLink.style.display = 'none';
      profileLink.style.display = 'block';
      logoutLink.style.display = 'block';
  } else {
      loginLink.style.display = 'block';
      registerLink.style.display = 'block';
      profileLink.style.display = 'none';
      logoutLink.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar(isAuthenticated());
});
function renderNavbar() {
  const isAuthenticated = localStorage.getItem('userSession') !== null;
  const logoutLink = document.getElementById('logout-link');

  if (isAuthenticated) {
    logoutLink.style.display = 'block';
  } else {
    logoutLink.style.display = 'none';
  }

  logoutLink.addEventListener('click', function (event) {
    event.preventDefault(); 
    logout(); 
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
});
