<template>
  <div :class="[currentTheme]">
    <nav class="navbar">
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/profile" v-if="isLoggedIn">Cart</router-link>
        <router-link to="/search-history" v-if="isLoggedIn">Search History</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/sign-in">Login</router-link>
        <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
        <font-awesome-icon :icon="themeIcon" @click="toggleTheme" class="theme-icon"></font-awesome-icon>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { auth, onAuthStateChanged } from './firebase';
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['theme']),
    currentTheme() {
      return this.theme + '-theme';
    },
    themeIcon() {
      return this.theme === 'light' ? 'moon' : 'sun';
    }
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
    });
    document.body.className = this.currentTheme; // Initialize theme
  },
  watch: {
    theme(newTheme) {
      document.body.className = newTheme + '-theme'; // Update theme when changed
    },
  },
  methods: {
    ...mapActions(['toggleTheme']),
    async handleSignOut() {
      try {
        await auth.signOut();
        this.isLoggedIn = false;
        if (this.$route.path !== '/sign-in') {
          this.$router.push('/sign-in');
        }
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    },
  },
};
</script>

<style scoped>
@import './assets/themes.css';

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  background-color: var(--background-color-light);
  color: var(--text-color-light);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

body.dark-theme .navbar {
  background-color: var(--background-color-dark);
  color: var(--text-color-dark);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1em;
}

nav a, nav button {
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5em 1em;
  transition: background-color 0.3s;
}

nav a:hover, nav button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.theme-icon {
  cursor: pointer;
  font-size: 1.5em;
}
</style>
