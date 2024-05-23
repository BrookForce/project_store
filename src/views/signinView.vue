<template>
  <div class="sign-in">
    <h1>Login</h1>
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="signIn">Sign In</button>
    <button @click="signInWithGoogle" class="google-button">Login with Google</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default {
  name: 'SigninView',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async signIn() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        if (this.$route.path !== '/') {
          this.$router.push('/'); // Redireciona para a página inicial após login bem-sucedido
        }
      } catch (error) {
        this.error = 'Login failed: ' + error.message;
      }
    },
    async signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        if (this.$route.path !== '/') {
          this.$router.push('/'); // Redireciona para a página inicial após login bem-sucedido
        }
      } catch (error) {
        this.error = 'Google login failed: ' + error.message;
      }
    },
  },
};
</script>

<style scoped>
.sign-in {
  text-align: center;
  max-width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.sign-in input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.sign-in button {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sign-in button:hover {
  background-color: #0056b3;
}

.google-button {
  background-color: #db4437; /* Google button color */
}

.google-button:hover {
  background-color: #c23321; /* Darker Google button color */
}
</style>
