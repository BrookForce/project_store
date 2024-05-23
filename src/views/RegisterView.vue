<template>
  <div class="register">
    <h1>Register</h1>
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="register">Register</button>
    <button @click="registerWithGoogle" class="google-button">Register with Google</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async register() {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/home'); // Redirect to home page after successful registration
      } catch (error) {
        this.error = 'Registration failed: ' + error.message;
      }
    },
    async registerWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        this.$router.push('/home'); // Redirect to home page after successful registration
      } catch (error) {
        this.error = 'Google registration failed: ' + error.message;
      }
    },
  },
};
</script>

<style scoped>
.register {
  text-align: center;
  max-width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.register input {
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register button {
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register button:hover {
  background-color: #0056b3;
}

.google-button {
  background-color: #db4437; /* Google button color */
}

.google-button:hover {
  background-color: #c23321; /* Darker Google button color */
}
</style>
