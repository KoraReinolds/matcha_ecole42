<template lang="pug">

  div
    form(
      :class="$style.form"
      v-on:keyup.enter="signIn()"
    )
      h2(
        :class="$style.form_title"
      ) Login
      TextField(
        :data="fieldsData.login"
        v-model="login"
        outlined
        filled
        name="login"
      )
      TextField(
        :data="fieldsData.password"
        v-model="password"
        type='password'
        outlined
        filled
        name="password"
      )
      div(
        :class="$style.form_actions"
      )
        nuxt-link(
          :class="$style.form_action_link"
          to="/registration"
        ) Registration
        nuxt-link(
          :class="$style.form_action_link"
          to="/reset-password"
        ) Forget password
        Button(
          @click.prevent="signIn"
          :disabled="!formValid || !location"
        ) LogIn

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TextField from '@/components/TextField.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'Login',
  components: {
    TextField,
    Button,
  },
  data: () => ({
    data_login: 'User_1',
    data_password: '123',
  }),
  computed: {
    ...mapGetters({
      fieldsData: 'forms/FIELDS_DATA',
      formValid: 'forms/LOGIN_VALID',
      location: 'forms/MY_LOCATION',
    }),
    login: {
      get() { return this.data_login; },
      set(value) { this.setValue({ key: 'login', value }) },
    },
    password: {
      get() { return this.data_password; },
      set(value) { this.setValue({ key: 'password', value }) },
    },
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),

    setValue({ key, value }) {
      this[`data_${key}`] = value
      this.$store.commit('forms/VALIDATE_VALUE', { key, value })
    },
    signIn() {
      this.$store.dispatch('forms/SIGN_IN', {
        login: this.data_login,
        password: this.data_password,
      })
    }
  },
  mounted() {
  },
};
</script>

<style lang="scss" module>

@import '@/assets/css/form.scss';

</style>
