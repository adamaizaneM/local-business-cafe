// script.js

document.addEventListener('DOMContentLoaded', () => {
    let cart = []; // Initialize an empty array to store cart items
  
    // Function to add products to the cart
    window.addToCart = function(productName, productPrice) {
      const existingProductIndex = cart.findIndex(item => item.name === productName);
      
      if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1; // Increase quantity if product already in cart
      } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 }); // Add new product to cart
      }
  
      updateCartCount(); // Update cart count displayed on the page
      alert(`${productName} has been added to your cart.`); // Feedback to user
    };
  
    // Function to update the cart count displayed in the navigation
    function updateCartCount() {
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
      document.getElementById('cartCount').textContent = cartCount; // Update cart count display
    }
  
    // Function to toggle the cart modal visibility
    window.toggleCart = function() {
      const cartModal = document.getElementById('cartModal');
      if (cartModal.style.display === "none" || cartModal.style.display === "") {
        displayCartItems(); // Update cart items before showing
        cartModal.style.display = "block"; // Show the cart modal
      } else {
        cartModal.style.display = "none"; // Hide the cart modal
      }
    };
  
    // Function to display cart items in the modal
    function displayCartItems() {
      const cartItemsContainer = document.getElementById('cartItems');
      cartItemsContainer.innerHTML = ''; // Clear previous items
  
      let total = 0;
  
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        // Create a cart item element
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}`;
  
        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-item';
        removeButton.onclick = () => removeFromCart(index); // Set the remove function
  
        // Append item and remove button to container
        cartItem.appendChild(removeButton);
        cartItemsContainer.appendChild(cartItem);
      });
  
      document.getElementById('cartTotal').textContent = total.toFixed(2); // Update the total price
    }
  
    // Function to remove items from the cart
    function removeFromCart(index) {
      cart.splice(index, 1); // Remove item at the specified index
      updateCartCount(); // Update cart count display
      displayCartItems(); // Refresh cart display
    }
  
    // Function to sort products by price
    window.sortProducts = function(order) {
      const productContainer = document.getElementById('productContainer');
      const products = Array.from(productContainer.getElementsByClassName('product'));
  
      products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        return order === 'asc' ? priceA - priceB : priceB - priceA;
      });
  
      products.forEach(product => productContainer.appendChild(product));
    };
  
    // Function to filter products based on search input
    window.filterProducts = function() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const products = document.getElementsByClassName('product');
  
      Array.from(products).forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        product.style.display = productName.includes(searchInput) ? '' : 'none';
      });
    };
  });
  