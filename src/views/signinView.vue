<template>
    <div>
        <h1>Entrar na conta</h1>
        <p><input type='text' placeholder='Email' v-model='email'/></p>
        <p><input type='password' placeholder='Password' v-model='password'/></p>
        <p v-if="errMsg">{{ errMsg }}</p>
        <p><button @click='register'>Entrar</button></p>
        <p><button @click='signInWithGoogle'>Entrar com o Google</button></p>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref } from 'vue';
import { auth } from '../firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
      errMsg: null,
    };
  },
  methods: {
    register() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
            console.log('success');
            this.$router.push('/about');
        })
        .catch((error) => {
            console.log(error.code);
            this.errMsg = error.message;
        });
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
            console.log('success');
            this.$router.push('/about');
        })
        .catch((error) => {
            console.log(error.code);
            this.errMsg = error.message;
        });
    },
  },
};
</script>