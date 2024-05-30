/* eslint-disable indent */
export function renderNavbar(isLoggedIn = false, isAdmin = false) {
    // Add event listener to the document body and listen for click events on any element with the id "logoutButton"
    // Seria millor alguna altra aproximació, però tenim problemes afegint event listeners a elements que encara no existeixen
    // Així que aquesta és una solució ràpida i bruta pel logout!
    document.body.addEventListener('click', function (event) {
      if (event.target && event.target.id === 'logoutButton') {
        console.log('Logging out...');
        localStorage.removeItem('user');
      }
    });
  
    const existingNavbar = document.querySelector('nav');
    if (existingNavbar) {
      existingNavbar.remove();
    }
  
    if (!document.querySelector('.navbar')) {
      console.log('Rendering navbar');
      const navbar = document.createElement('nav');
      // This is a way to keep my navbar fixed at the top of the page
      navbar.classList.add('w-full', 'mb-10', 'bg-white', 'shadow-md', 'text-lg');
  
      const currentPath = window.location.pathname;
  
      let links = `
        <li><a href="index.html" class="text-blue-500 hover:text-blue-700 ${
          currentPath === '/index.html' || currentPath === '/' ? 'active' : ''
        }">Home</a></li>
      `;
  
      if (isLoggedIn) {
        links += `
          <li><a href="dashboard.html" class="text-blue-500 hover:text-blue-700 ${
            currentPath === '/dashboard.html' ? 'active' : ''
          }">Dashboard</a></li>
          <li><a id="logoutButton" href="index.html" class="btn btn-primary bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Logout</a></li>  
        `;
      } else {
        links += `
          <li><a href="login.html" class="btn btn-primary bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${
            currentPath === '/login.html' ? 'active' : ''
          }">Login</a></li>
        `;
      }
  
      if (isAdmin) {
        links += `
          <li><a href="admin.html" class="btn btn-primary bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${
            currentPath === '/admin.html' ? 'active' : ''
          }">Admin</a></li>
        `;
      }
  
      navbar.innerHTML = `
        <ul class="flex justify-between items-center p-4">
          ${links}
        </ul>
      `;
  
      document.body.prepend(navbar);
    }
  }