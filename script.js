// Initialize the cart
let cart = [];
const discountRate = 0.1; // 10% discount
const promoBanner = document.getElementById('promo-banner');
const discountMessage = document.getElementById('discount-message');

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

  // Apply discount
  const discountApplied = totalPrice * discountRate;
  const discountedPrice = totalPrice - discountApplied;

  // Show discount applied message
  discountMessage.textContent = `You saved $${discountApplied.toFixed(2)}!`;

  totalPriceDiv.textContent = `Total (After Discount): $${discountedPrice.toFixed(2)}`;
  cartCountDiv.textContent = totalItems;
}

// Function to handle adding items to the cart
function addToCart(event) {
  const productElement = event.target.closest('.product');
  const productId = productElement.getAttribute('data-id');
  const productName = productElement.getAttribute('data-name');
  const productPrice = parseFloat(productElement.getAttribute('data-price'));
  const quantity = parseInt(productElement.querySelector('.quantity').value);

  // Check if the product is already in the cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  if (existingItemIndex > -1) {
    // Update quantity if the product is already in the cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to the cart
    cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
  }

  // Show the discount banner
  promoBanner.classList.add('show');

  // Update cart display
  updateCart();
}

// Function to update the item quantity
function updateItemQuantity(event) {
  const newQuantity = prompt('Enter new quantity:');
  if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
    const itemId = event.target.getAttribute('data-id');
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity = parseInt(newQuantity);
      alert('Quantity updated!');
      updateCart();
    }
  }
}

// Adding event listeners to product buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => button.addEventListener('click', addToCart));

// Show category products when menu item is clicked
function showCategory(category) {
  document.querySelectorAll('.products').forEach(section => section.style.display = 'none');
  document.getElementById(`${category}-section`).style.display = 'block';
}

// Initial Load: Show the text and promo ad
promoBanner.classList.add('show');
