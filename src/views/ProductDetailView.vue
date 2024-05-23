<template>
  <div class="product-detail" v-if="product">
    <img :src="product.image" :alt="product.title" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <button @click="addToCart(product)">Add to Cart</button>
    <div v-if="notification" class="notification">{{ notification }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export default {
  name: 'ProductDetailView',
  data() {
    return {
      product: null,
      notification: null,
    };
  },
  async created() {
    const productId = this.$route.params.id;
    await this.fetchProduct(productId);
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    addToCart(product) {
      const user = getAuth().currentUser;
      if (!user) {
        this.showNotification('You need to be logged in to add products to the cart.');
        return;
      }

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.showNotification('Product added to cart!');
    },
    showNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
  text-align: center;
}

.product-detail img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.product-detail h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.product-detail p {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.notification {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #28a745;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
