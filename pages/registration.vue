<template lang="pug">
  form.form
      h2.title Registration
      TextField(
        :data="getLogin"
        v-model="login"
        name="login"
      )
      TextField(
        :data="getPassword"
        v-model="password"
      )
      TextField(
        :data="getFirstName"
        v-model="firstName"
      )
      TextField(
        :data="getLastName"
        v-model="lastName"
      )
      TextField(
        :data="getMail"
        v-model="mail"
        type="email"
        name="email"
      )
      div.form-actions
        nuxt-link.link(to="/login") Back
        span.btn(
          :class="{ disabled: !formValid }"
          @click.prevent="register"
        ) SignUp

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import fieldMixin from '@/mixins/fieldMixin';
import TextField from '@/components/TextField.vue';

export default {
  name: 'Registration',
  components: {
    TextField,
  },
  data: () => ({
    data_login: '',
    data_password: '',
    data_fname: '',
    data_lname: '',
    data_email: '',
  }),
  computed: {
    ...mapGetters({
      formValid: 'forms/REG_VALID',
      getLogin: 'forms/LOGIN',
      getPassword: 'forms/PASSWORD',
      getFirstName: 'forms/FIRST_NAME',
      getLastName: 'forms/LAST_NAME',
      getMail: 'forms/MAIL',
    }),
    login: {
      get() { return this.data_login; },
      set(value) { this.setValue({ key: 'login', value }); },
    },
    password: {
      get() { return this.data_password; },
      set(value) { this.setValue({ key: 'password', value }); },
    },
    firstName: {
      get() { return this.data_fname; },
      set(value) { this.setValue({ key: 'fname', value }); },
    },
    lastName: {
      get() { return this.data_lname; },
      set(value) { this.setValue({ key: 'lname', value }); },
    },
    mail: {
      get() { return this.data_email; },
      set(value) { this.setValue({ key: 'email', value }); },
    },
  },
  methods: {
    ...mapMutations({
      }),
    ...mapActions({
      }),
    setValue({ key, value }) {
      this[`data_${key}`] = value;
      this.$store.commit('forms/SET_VALUE', { key, value })
    },
    register() {
      if (this.formValid) this.$store.dispatch('forms/REGISTRATION', {
        login: this.data_login,
        password: this.data_password,
        fname: this.data_fname,
        lname: this.data_lname,
        email: this.data_email,
      });
    }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.form {
  .title {
    font-size: 24px;
  }
}
</style>
