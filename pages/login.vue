<template lang="pug">

  div
    form(
      :class="[$style.form, { [$style.hide]: $auth.loggedIn }]"
      name="login_form"
      @submit.prevent="login"
    )
      h2(
        :class="$style.form_title"
      ) Login
      TextField(
        v-bind="$store.state.forms.formFields.login"
        @input="$store.commit('forms/SET_VALUE', { key: 'login', value: $event })"
        outlined
        filled
        name="matcha_login"
      )
      TextField(
        v-bind="$store.state.forms.formFields.password"
        @input="$store.commit('forms/SET_VALUE', { key: 'password', value: $event })"
        type='password'
        outlined
        filled
        name="matcha_password"
      )
      div(
        :class="$style.form_actions"
      )
        nuxt-link(
          :class="$style.form_action_link"
          to="/registration"
        ) Registration
        input(
          :class="$style.btn"
          type="submit"
          :disabled="!$store.getters['forms/LOGIN_VALID']"
          value="Login"
        )

</template>

<script>
import TextField from '@/components/TextField.vue'

export default {
  name: 'Login',
  components: {
    TextField,
  },
  middleware({ store }) {
    store.commit('forms/CLEAR_FIELDS')
    // set initial values for easy entrance
    store.commit('forms/SET_VALUE', { key: 'login', value: 'User_1' })
    store.commit('forms/SET_VALUE', { key: 'password', value: '123' })
  },
  methods: {
    login() {
      this.$store.dispatch('forms/SIGN_IN', { socket: this.$nuxtSocket({}) })
    }
  }
}
</script>

<style lang="scss" module>

@import '@/assets/css/form.scss';
@import '@/assets/css/button.scss';

.hide {
  transform: scale(0.5);
  opacity: 0;
  transition: all 0.5s;
}

</style>
