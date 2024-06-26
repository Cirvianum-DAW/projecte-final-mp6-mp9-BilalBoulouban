document.addEventListener('DOMContentLoaded', async () => {
  const products = [
    { id: 1, name: "Arabic Basbousa", price: 5.00, category: "cake" },
    { id: 2, name: "Vanilla Bliss", price: 6.50, category: "cake" },
    { id: 3, name: "Blueberry Delight", price: 7.00, category: "cake" },
    { id: 4, name: "Chocolate Temptation", price: 8.00, category: "cake" },
    { id: 5, name: "Black Coffee", price: 2.50, category: "coffee" },
    { id: 6, name: "Vanilla Latte", price: 3.50, category: "coffee" },
    { id: 7, name: "Cappuccino", price: 3.00, category: "coffee" },
    { id: 8, name: "Espresso", price: 2.00, category: "coffee" }
  ];

  const orderList = document.querySelector('#order-list');
  const orderTotal = document.querySelector('#order-total');
  const placeOrderBtn = document.querySelector('#place-order-btn');
  let order = [];

  function addProductToOrder(product) {
    const existingProduct = order.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      order.push({ ...product, quantity: 1 });
    }
    renderOrder();
  }

  function removeProductFromOrder(productId) {
    const productIndex = order.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      if (order[productIndex].quantity > 1) {
        order[productIndex].quantity -= 1;
      } else {
        order.splice(productIndex, 1);
      }
    }
    renderOrder();
  }

  function renderOrder() {
    orderList.innerHTML = '';
    let total = 0;
    order.forEach((item) => {
      total += item.price * item.quantity;
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
          <button class="remove-from-order-btn bg-red-500 text-white p-1 ml-2 rounded" data-id="${item.id}">Remove</button>
        `;
      orderList.appendChild(listItem);
    });
    orderTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product border p-4 rounded';
    productDiv.innerHTML = `
        <h4 class="text-xl font-bold">${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-order-btn bg-amber-800 text-white p-2 rounded" data-id="${product.id}">Add to Order</button>
      `;
    document.querySelector('#products').appendChild(productDiv);
  });

  document.querySelector('#products').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-order-btn')) {
      const productId = parseInt(event.target.dataset.id, 10);
      const product = products.find((p) => p.id === productId);
      addProductToOrder(product);
    }
  });

  orderList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-order-btn')) {
      const productId = parseInt(event.target.dataset.id, 10);
      removeProductFromOrder(productId);
    }
  });

  placeOrderBtn.addEventListener('click', async () => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    console.log(userSession);
    console.log(order);
  
    try {
      const response = await fetch(`https://66437f986c6a6565870755ab.mockapi.io/users/${userSession.userId}/comandes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          createdAt: new Date().toISOString(),
          name: userSession.userName,
          products_id: order.map(item => item.id).join(','),
          userId: userSession.userId
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Order placed:', data);
      showMessage('success', 'Order placed successfully');
      order = [];
      renderOrder();
    } catch (error) {
      console.error('Failed to place order:', error);
      showMessage('error', 'Failed to place order. Please try again.');
    }
  });

  function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} p-2 rounded text-white mb-2`;
    messageDiv.textContent = message;

    if (type === 'success') {
      messageDiv.classList.add('bg-green-500');
    } else if (type === 'error') {
      messageDiv.classList.add('bg-red-500');
    }

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Función para recuperar las órdenes del usuario desde el servidor
  async function getUserOrders(userId) {
    try {
      const response = await fetch(`https://66437f986c6a6565870755ab.mockapi.io/users/${userId}/comandes`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user orders: ${response.statusText}`);
      }
      const orders = await response.json();
      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  async function displayUserOrders(userId) {
    try {
      const userOrders = await getUserOrders(userId);
      const userOrdersList = document.getElementById('user-orders-list');
      userOrdersList.innerHTML = '';

      userOrders.forEach(order => {
        const listItem = document.createElement('li');
        listItem.textContent = `Order ID: ${order.id}, Created At: ${order.createdAt}, User: ${order.name}`;

        const productIds = order.products_id.split(',').map(id => parseInt(id));
        const orderProducts = products.filter(product => productIds.includes(product.id));

        orderProducts.forEach(product => {
          const productItem = document.createElement('p');
          productItem.textContent = `Product: ${product.name}`;
          listItem.appendChild(productItem);
        });

        userOrdersList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error displaying user orders:', error);
    }
  }

  const userSession = JSON.parse(localStorage.getItem('userSession'));
  const userId = userSession.userId;
  displayUserOrders(userId);
});
