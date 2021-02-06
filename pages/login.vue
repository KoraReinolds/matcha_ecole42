<template lang="pug">

  form(
    :class="$style.form"
    name="login_form"
    @submit.prevent="signIn"
  )
    h2(
      :class="$style.form_title"
    ) Login
    TextField(
      v-bind="fieldsData.login"
      @input="setValue({ key: 'login', value: $event })"
      outlined
      filled
      name="matcha_login"
    )
    TextField(
      v-bind="fieldsData.password"
      @input="setValue({ key: 'password', value: $event })"
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
        :disabled="!loginValid"
        value="Login"
      )

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import TextField from '@/components/TextField.vue'

export default {
  name: 'Login',
  components: {
    TextField,
  },
  data: () => ({
  }),
  middleware({ store }) {
    store.commit('forms/CLEAR_FIELDS')
  },
  computed: {
    ...mapState({
      fieldsData: state => state.forms.formFields,
    }),
    ...mapGetters({
      loginValid: 'forms/LOGIN_VALID'
    }),
  },
  methods: {
    ...mapMutations({
      setValue: 'forms/SET_VALUE',
    }),
    ...mapActions({
      signIn: 'forms/SIGN_IN',
    }),
  },
  mounted() {
  },
};
</script>

<style lang="scss" module>

@import '@/assets/css/form.scss';
@import '@/assets/css/button.scss';

</style>
