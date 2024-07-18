document.addEventListener('DOMContentLoaded', function() {
  const catalogItems = JSON.parse(localStorage.getItem('products')) || [];
  const offers = JSON.parse(localStorage.getItem('offers')) || [];
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let filter = 'all'; // Estado inicial del filtro

  console.log('Catalog Items:', catalogItems);
  console.log('Offers:', offers);
  console.log('Categories:', categories);

  function getCategoryName(categoryId) {
    const category = categories.find(cat => cat.id === parseInt(categoryId));
    return category ? category.name : "Categoría no encontrada";
  }

  function displayCatalog() {
    const catalogList = document.querySelector('.catalog-list tbody');
    catalogList.innerHTML = '';

    // Filtrado basado en el estado del filtro
    let filteredCatalog = [];
    if (filter === 'discount') {
      filteredCatalog = catalogItems.filter(item => offers.some(offer => offer.productId === item.id));
    } else if (filter === 'no-discount') {
      filteredCatalog = catalogItems.filter(item => !offers.some(offer => offer.productId === item.id));
    } else {
      filteredCatalog = catalogItems;
    }

    console.log('Filtered Catalog:', filteredCatalog);

    filteredCatalog.forEach(item => {
      const offer = offers.find(o => o.productId === item.id);
      const price = offer ? offer.priceWithDiscount : item.price;
      const discount = offer ? offer.discount : null;
      const itemDiv = document.createElement('tr');
      itemDiv.classList.add('product-item');
      if (discount) itemDiv.classList.add('offer');
      itemDiv.innerHTML = `
        <td><strong>Nombre del producto:</strong> ${item.name}</td>
        <td><strong>Precio:</strong> $${formatNumber(price)}</td>
        <td><strong>Categoría:</strong> ${getCategoryName(item.categoryId)}</td>
        <td>${discount ? `<p class="discount">Descuento: ${discount}%</p>` : ''}</td>
        <td><button class="cta-a" onclick="addToCart('${item.name}', ${price})">Agregar al Carrito</button></td>
      `;
      catalogList.appendChild(itemDiv);
    });
  }

  function addToCart(name, price) {
    const existingCartItem = cartItems.find(item => item.name === name);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }

  function displayCart() {
    const cartList = document.querySelector('.cart-list');
    const netPriceElement = document.getElementById('net-price');
    const ivaElement = document.getElementById('iva');
    const totalPriceElement = document.getElementById('total-price');

    cartList.innerHTML = '';
    let netPrice = 0;

    cartItems.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <p><strong>Nombre del producto:</strong> ${item.name}</p>
        <p><strong>Precio:</strong> $${formatNumber(item.price)}</p>
        <p><strong>Cantidad:</strong> ${item.quantity}</p>
        <button class="cta-a remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
      `;
      cartList.appendChild(itemDiv);
      netPrice += item.price * item.quantity;
    });

    const iva = Math.round(netPrice * 0.19);
    const totalPrice = netPrice + iva;

    netPriceElement.textContent = formatNumber(netPrice);
    ivaElement.textContent = formatNumber(iva);
    totalPriceElement.textContent = formatNumber(totalPrice);
  }

  function comprar() {
    const totalPriceElement = document.getElementById('total-price').textContent.replace(/\./g, '');

    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    const fechaCompra = new Date().toLocaleDateString();
    let voucherContent = '<h2>Voucher de Compra</h2>';
    voucherContent += '<p><strong>Fecha de Compra:</strong> ' + fechaCompra + '</p>';
    voucherContent += '<p><strong>Total de la Compra:</strong> $' + formatNumber(Number(totalPriceElement)) + '</p>';
    voucherContent += '<h3>Detalles de los Productos:</h3>';
    voucherContent += '<ul>';

    cartItems.forEach(item => {
      voucherContent += '<li>' + item.name + ' - $' + formatNumber(item.price) + ' (Cantidad: ' + item.quantity + ')</li>';
    });

    voucherContent += '</ul>';

    document.getElementById('voucherContent').innerHTML = voucherContent;
    document.getElementById('voucherModal').style.display = "block";

    cartItems = [];
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }

  function formatNumber(num) {
    return num.toLocaleString('de-DE');
  }

  window.comprar = comprar;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;

  // Agregar event listeners para los botones de filtro
  document.getElementById('filter-all').addEventListener('click', () => {
    filter = 'all';
    displayCatalog();
  });

  document.getElementById('filter-discount').addEventListener('click', () => {
    filter = 'discount';
    displayCatalog();
  });

  document.getElementById('filter-no-discount').addEventListener('click', () => {
    filter = 'no-discount';
    displayCatalog();
  });

  displayCatalog();
  displayCart();

  var modal = document.getElementById("voucherModal");
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var loginModal = document.getElementById("loginModal");
  var loginIcon = document.getElementById("login-icon");
  var loginSpan = document.getElementsByClassName("close")[1];

  loginIcon.onclick = function() {
    var logoutMenu = document.getElementById("logout-menu");
    if (logoutMenu.style.display === "block") {
      logoutMenu.style.display = "none";
    } else {
      logoutMenu.style.display = "block";
    }
  }

  loginSpan.onclick = function() {
    loginModal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
  }

  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
      window.location.href = "../index.html";
    } else {
      window.location.href = './catalogo.html';
    }
  });

  document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = "../home.html";
  });
});
