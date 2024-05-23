<template>
  <div class="home">
    <h1>Lucas' Store</h1>
    <input
      type="text"
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Search products..."
      class="search-bar"
    />
    <div class="products">
      <div
        class="product"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <img :src="product.image" :alt="product.title" @click="goToProductDetail(product.id)" />
        <h2>{{ product.title }}</h2>
        <p>{{ truncateDescription(product.description) }}</p>
        <p>Price: ${{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
    <button @click="loadMoreProducts" class="load-more">Load More</button>
    <div v-if="notification" class="notification">{{ notification }}</div>
  </div>
</template>

<script>
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export default {
  name: 'HomeView',
  data() {
    return {
      allProducts: [],
      products: [],
      searchQuery: '',
      user: null,
      productsPerPage: 10,
      notification: null,
    };
  },
  async created() {
    await this.fetchProducts();
    this.user = getAuth().currentUser;
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.allProducts = response.data;
        this.products = this.allProducts.slice(0, this.productsPerPage);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    loadMoreProducts() {
      if (this.products.length < this.allProducts.length) {
        const nextProducts = this.allProducts.slice(this.products.length, this.products.length + this.productsPerPage);
        this.products = [...this.products, ...nextProducts];
      } else {
        const shuffledProducts = this.shuffleArray(this.allProducts).slice(0, this.productsPerPage);
        this.products = [...this.products, ...shuffledProducts];
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    truncateDescription(description) {
      return description.length > 100 ? description.substring(0, 100) + '...' : description;
    },
    goToProductDetail(productId) {
      this.$router.push(`/product/${productId}`);
    },
    addToCart(product) {
      const user = getAuth().currentUser;
      if (!user) {
        this.showNotification('You need to be logged in to add products to the cart.');
        return;
      }

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.showNotification('Product added to cart!');
    },
    showNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },
    onSearch() {
      if (this.searchQuery.length > 2) {
        this.saveSearchQuery(this.searchQuery);
      }
    },
    saveSearchQuery(query) {
      const searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searches.includes(query)) {
        searches.push(query);
        localStorage.setItem('searchHistory', JSON.stringify(searches));
      }
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

.search-bar {
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 200px;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;
  background-color: var(--background-color-light);
  color: var(--text-color-light);
}

body.dark-theme .product {
  background-color: var(--background-color-dark);
  color: var(--text-color-dark);
}

.product:hover {
  transform: scale(1.05);
}

.product img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.product h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.product p {
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.load-more {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.load-more:hover {
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
