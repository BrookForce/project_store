<template>
    <div class="cart">
      <h1>My Cart</h1>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty.</p>
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" />
          <div class="item-details">
            <h2>{{ item.title }}</h2>
            <p>{{ truncateDescription(item.description) }}</p>
            <p>Price: ${{ item.price }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartView',
    data() {
      return {
        cartItems: [],
      };
    },
    created() {
      this.loadCart();
    },
    methods: {
      loadCart() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      },
      removeFromCart(itemId) {
        const itemIndex = this.cartItems.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          if (this.cartItems[itemIndex].quantity > 1) {
            this.cartItems[itemIndex].quantity -= 1;
          } else {
            this.cartItems.splice(itemIndex, 1);
          }
          localStorage.setItem('cart', JSON.stringify(this.cartItems));
        }
      },
      truncateDescription(description) {
        return description.length > 100 ? description.substring(0, 100) + '...' : description;
      },
    },
  };
  </script>
  
  <style scoped>
  .cart {
    padding: 20px;
    text-align: center;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 0;
  }
  
  .cart-item img {
    max-width: 100px;
    margin-right: 20px;
  }
  
  .item-details {
    flex: 1;
    text-align: left;
  }
  
  .item-details h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .item-details p {
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  