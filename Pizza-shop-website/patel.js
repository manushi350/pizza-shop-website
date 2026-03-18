// Navbar
  let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
      navbar.classList.toggle('active');
  }

  window.onscroll = () => {
      navbar.classList.remove('active');
  }
  // Dark Mode
  let darkmode = document.querySelector('#darkmode');

  darkmode.onclick = () => {
      if(darkmode.classList.contains('bx-moon')){
          darkmode.classList.replace('bx-moon','bx-sun');
          document.body.classList.add('active');
      }else{
          darkmode.classList.replace('bx-sun','bx-moon');
          document.body.classList.remove('active');
      }
  }

  // Scroll Reveal
  const sr = ScrollReveal ({
      origin: 'top',
      distance: '40px',
      duration: 2000,
      reset: true
  });


  sr.reveal(`.home-text, .home-img,
              .about-img, .about-text,
              .box, .s-box,
              .btn, .connect-text,
              .contact-box`, {
      interval: 20
  })
//cart function
let cart = [];

function addItemToCart(element) {
    const productId = element.parentNode.dataset.id;
    const productName = element.parentNode.dataset.name;
    const productPrice = element.parentNode.dataset.price; // This should be in INR
    const item = { id: productId, name: productName, price: parseFloat(productPrice) }; // Ensure price is a number
    cart.push(item);
    updateCartContents();
}

function removeItemFromCart(element) {
    const productId = element.parentNode.dataset.id;
    cart = cart.filter(item => item.id !== productId);
    updateCartContents();
}

function updateCartContents() {
    const cartIcon = document.getElementById('cart-icon');
    const cartDropdown = document.getElementById('cart-dropdown');
    cartIcon.textContent = `Cart (${cart.length})`;
    cartDropdown.innerHTML = '';
    let totalItems = 0;
    let totalAmount = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.dataset.id = item.id;
        cartItem.textContent = `${item.name} - ₹${item.price.toFixed(2)}`; // Display price in INR
        const removeBtn = document.createElement('i');
        removeBtn.className = 'bx bx-x remove-btn';
        removeBtn.onclick = () => removeItemFromCart(removeBtn);
        cartItem.appendChild(removeBtn);
        cartDropdown.appendChild(cartItem);
        totalItems++;
        totalAmount += item.price; // Sum the prices
    });

    const totalSection = document.createElement('div');
    totalSection.className = 'total-section';
    totalSection.innerHTML = `Total: ${totalItems} items - ₹${totalAmount.toFixed(2)}`; // Display total in INR
    cartDropdown.appendChild(totalSection);
    cartDropdown.classList.add('active');
    
    setTimeout(() => {
        cartDropdown.classList.remove('active');
    }, 2000);
}

document.getElementById('cart-icon').addEventListener('click', () => {
    document.getElementById('cart-dropdown').classList.toggle('active');
});

// order
document.getElementById('order-btn').addEventListener('click', () => {
    // Display popup message
    alert('Your order has been placed successfully!');

    // Empty cart items
    cart = []; // Reset the cart array
    updateCartContents(); // Update the cart contents to reflect the empty cart
});