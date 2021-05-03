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
      div(
        :class="$style.fields"
      )
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
import gsap from 'gsap'

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
  // transition: {
  //   beforeEnter(el) {
  //     el.style.opacity = 0.5
  //     // el.style.transform = 'scale(0,0)'
  //   },
  //   enter(el, done) {
  //     console.log(this)
  //     // gsap.timeline()
  //     //   .from(`.${this.$style.fields}`, {
  //     //     duration: 1,
  //     //     opacity: 1,
  //     //     // scale: 1,
  //     //     onComplete: done
  //     //   })
  //   },
  // },
  methods: {
    login() {
      this.$store.dispatch('forms/SIGN_IN', { socket: this.$nuxtSocket({}) })
    }
  },
  beforeRouteLeave(to, from, next) {
    gsap.timeline({ onComplete: next })
      .to(`.${this.$style.form_actions}`, { opacity: 0, x: 30, duration: 0.3, ease: 'easy.out' })
      .to(`.${this.$style.fields}`, { height: 0, opacity: 0.1, duration: 0.5, ease: 'expo.in' })
  },
  mounted() {
    gsap.timeline()
      .from(`.${this.$style.fields}`, { height: 0, opacity: 0.1, duration: 0.5, ease: 'expo.in' })
      .from(`.${this.$style.form_actions}`, { opacity: 0, x: 30, duration: 0.3, ease: 'easy.out' })
  },
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
