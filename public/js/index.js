document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById("loginModal");
  var loginIcon = document.getElementById("login-icon");
  var span = document.getElementsByClassName("close")[0];

  loginIcon.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
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
});
