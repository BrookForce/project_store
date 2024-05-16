<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/sign-in">Login </router-link> |
      <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { auth, onAuthStateChanged } from './firebase';

export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    async handleSignOut() {
      try {
        await auth.signOut();
        this.isLoggedIn = false;
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    },
  },
};
</script>
<style scoped>
nav {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  background-color: #f8f9fa;
  padding: 1em;
  width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 2em;
}

nav a {
  text-decoration: none;
  color: #333;
}
</style>