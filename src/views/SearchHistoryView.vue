<template>
    <div class="search-history">
      <h1>Search History</h1>
      <ul>
        <li v-for="query in searchHistory" :key="query">{{ query }}</li>
      </ul>
      <button @click="clearHistory">Clear History</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchHistoryView',
    data() {
      return {
        searchHistory: [],
      };
    },
    created() {
      this.loadSearchHistory();
    },
    methods: {
      loadSearchHistory() {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      },
      clearHistory() {
        localStorage.removeItem('searchHistory');
        this.searchHistory = [];
      },
    },
  };
  </script>
  
  <style scoped>
  .search-history {
    padding: 20px;
    text-align: center;
  }
  
  .search-history ul {
    list-style-type: none;
    padding: 0;
  }
  
  .search-history li {
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
  