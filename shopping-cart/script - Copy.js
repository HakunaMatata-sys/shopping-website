// Initialize the cart
let cart = [];

// Function to update the cart display
function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalPriceDiv = document.getElementById('total-price');
  const cartCountDiv = document.getElementById('cart-count');

  cartItemsDiv.innerHTML = ''; // Clear the previous cart items
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</span>
      <button class="update-quantity" data-id="${item.id}">Update Quantity</button>
    `;
    cartItemsDiv.appendChild(itemDiv);

    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  totalPriceDiv.textContent = `Total: $${totalPrice.toFixed(2)}`;
  cartCountDiv.textContent = totalItems;

  // Display alert for updates in the cart
  if (totalItems > 0) {
    alert(`You have ${totalItems} item(s) in your cart.`);
  } else {
    alert("Your cart is empty.");
  }
}

// Function to handle adding items to the cart
function addToCart(event) {
  const productElement = event.target.closest('.product');
  const productId = productElement.getAttribute('data-id');
  const productName = productElement.getAttribute('data-name');
  const productPrice = parseFloat(productElement.getAttribute('data-price'));
  const quantity = parseInt(productElement.querySelector('.quantity').value);

  const existingItemIndex = cart.findIndex(item => item.id === productId);
  if (existingItemIndex > -1) {
    // If item already exists in the cart, update the quantity
    cart[existingItemIndex].quantity += quantity;
    alert(`${quantity} more ${productName} added to the cart.`);
  } else {
    // Add new item to the cart
    cart.push({ id: productId, name: productName, price: productPrice, quantity });
    alert(`${productName} added to the cart.`);
  }

  updateCart();
}

// Function to handle updating item quantity
function updateItemQuantity(event) {
  const productId = event.target.getAttribute('data-id');
  const newQuantity = prompt("Enter the new quantity:");
  const quantity = parseInt(newQuantity);

  if (isNaN(quantity) || quantity <= 0) {
    alert('Invalid quantity');
    return;
  }

  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity = quantity;
    alert(`Quantity of ${cart[itemIndex].name} updated to ${quantity}.`);
    updateCart();
  }
}

// Event listeners
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', addToCart);
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('update-quantity')) {
    updateItemQuantity(event);
  }
});

// Initialize cart display
updateCart();
