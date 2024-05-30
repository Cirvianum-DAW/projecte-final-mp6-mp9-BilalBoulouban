document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#register-form');
    const editForm = document.querySelector('#edit-form');
    const userTableBody = document.querySelector('#user-table tbody');
  
    const apiBaseUrl = 'https://api.example.com/users';
  
    // Función para obtener todos los usuarios
    async function fetchUsers() {
      const response = await fetch(apiBaseUrl);
      const users = await response.json();
      return users;
    }
  
    // Función para agregar un usuario a la tabla
    function addUserToTable(user) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.username}</td>
        <td>
          <button class="edit-btn" data-id="${user.id}">Edit</button>
          <button class="delete-btn" data-id="${user.id}">Delete</button>
        </td>
      `;
      userTableBody.appendChild(row);
    }
  
    // Función para cargar todos los usuarios en la tabla
    async function loadUsers() {
      const users = await fetchUsers();
      users.forEach(addUserToTable);
    }
  
    // Manejar el formulario de registro
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = registerForm.username.value;
      const password = registerForm.password.value;
  
      await fetch(apiBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      loadUsers();
    });
  
    // Manejar el formulario de edición
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = editForm.dataset.id;
      const username = editForm.username.value;
      const password = editForm.password.value;
  
      await fetch(`${apiBaseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      loadUsers();
    });
  
    // Manejar botones de editar y eliminar
    userTableBody.addEventListener('click', async (event) => {
      if (event.target.classList.contains('edit-btn')) {
        const id = event.target.dataset.id;
        const user = await fetch(`${apiBaseUrl}/${id}`).then((res) => res.json());
        editForm.username.value = user.username;
        editForm.password.value = '';
        editForm.dataset.id = id;
      } else if (event.target.classList.contains('delete-btn')) {
        const id = event.target.dataset.id;
        await fetch(`${apiBaseUrl}/${id}`, {
          method: 'DELETE',
        });
        loadUsers();
      }
    });
  
    // Cargar usuarios al cargar la página
    loadUsers();
  });
  