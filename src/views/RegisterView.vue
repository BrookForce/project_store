<template>
    <div>
        <h1>Criar conta</h1>
        <p><input type='text' placeholder='Email' v-model='email'/></p>
        <p><input type='password' placeholder='Password' v-model='password'/></p>
        <p><button @click='register'>Criar conta</button></p>
        <p><button @click='signInWithGoogle'>Criar conta com o Google</button></p>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/compat/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((data) => {
            console.log('success');
            this.$router.push('/about');
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            this.$router.push('/about');
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
    },
  },
};
</script>