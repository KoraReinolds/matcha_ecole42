<template lang="pug">
  form(
    :class="$style.form"
  )
      h2(
        :class="$style.form_title"
      ) Registration
      TextField(
        :data="fieldsData.login"
        v-model="login"
        name="login"
      )
      TextField(
        :data="fieldsData.password"
        v-model="password"
      )
      TextField(
        :data="fieldsData.fname"
        v-model="firstName"
      )
      TextField(
        :data="fieldsData.lname"
        v-model="lastName"
      )
      TextField(
        :data="fieldsData.email"
        v-model="mail"
        type="email"
        name="email"
      )
      div(
        :class="$style.form_actions"
      )
        nuxt-link(
          :class="$style.form_action_link"
          to="/login"
        ) Back
        Button(
          @click.prevent="register"
          :disabled="!formValid"
        ) SignUp

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import TextField from '@/components/TextField.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Registration',
  components: {
    TextField,
    Button,
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
      fieldsData: 'forms/FIELDS_DATA',
      formValid: 'forms/REG_VALID',
    }),
    login: {
      get() { return this.data_login; },
      set(value) { this.setValue({ key: 'login', value }) },
    },
    password: {
      get() { return this.data_password; },
      set(value) { this.setValue({ key: 'password', value }) },
    },
    firstName: {
      get() { return this.data_fname; },
      set(value) { this.setValue({ key: 'fname', value }) },
    },
    lastName: {
      get() { return this.data_lname; },
      set(value) { this.setValue({ key: 'lname', value }) },
    },
    mail: {
      get() { return this.data_email; },
      set(value) { this.setValue({ key: 'email', value }) },
    },
  },
  methods: {
    ...mapMutations({
      }),
    ...mapActions({
      }),
    setValue({ key, value }) {
      this[`data_${key}`] = value;
      this.$store.commit('forms/VALIDATE_VALUE', { key, value })
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

<style module lang="scss">

@import '@/assets/css/form.scss';

</style>
