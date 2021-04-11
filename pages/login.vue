<template lang="pug">

  form(
    :class="$style.form"
    name="login_form"
    @submit.prevent="$store.dispatch('forms/SIGN_IN')"
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
  },
}
</script>

<style lang="scss" module>

@import '@/assets/css/form.scss';
@import '@/assets/css/button.scss';

</style>
