<template lang="pug">
  div.form
    h2 Login
    TextField(
      label="Login"
      v-model="login"
      rounded
      filled
    )
    TextField(
      label="Password"
      v-model="password"
      rounded
      filled
    )
    div.form-actions
      a.link(@click="$router.push('/registration')") Registration
      a.link Forget password
      span.btn(@click.prevent="signIn({ login, password })") LogIn
</template>

<script>
import { mapActions } from 'vuex';
import TextField from '@/components/TextField.vue';

export default {
  name: 'login',
  components: {
    TextField,
  },
  data: () => ({
    location: '',
    login: '',
    password: '',
  }),
  methods: {
    ...mapActions({
      signIn: 'auth/LOGIN',
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 95%;
  max-width: 500px;
  margin: 5% auto;
  background: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  .form-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
