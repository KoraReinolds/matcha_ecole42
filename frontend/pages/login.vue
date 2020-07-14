<template lang="pug">
  div.form
    h2 Login
    TextField(
      v-for="rule in Object.values(rules)"
      rounded
      filled
      :key="`login-${rule.title}`"
      :label="rule.title"
      v-model="rule.value"
      @valid="rule.valid = $event.value"
      :rules="rule"
    )
    div.form-actions
      nuxt-link.link(to="/registration") Registration
      a.link Forget password
      span.btn(:class="{ disabled: !formValid }" @click.prevent="login()") LogIn
</template>

<script>
import TextField from '@/components/TextField.vue';

export default {
  name: 'login',
  components: {
    TextField,
  },
  data: () => ({
    rules: {
      login: {
        value: '',
        title: 'Login',
        valid: false,
        rules: [
          (value) => !!value || 'Required',
        ],
      },
      password: {
        value: '',
        title: 'Password',
        valid: false,
        rules: [
          (value) => !!value || 'Required',
        ],
      },
    }
  }),
  computed: {
    formValid: function() {
      return Object.values(this.rules).every((rule) => rule.valid === true);
    },
  },
  methods: {
    login() {
      if (this.formValid) this.$store.dispatch('auth/LOGIN',
        Object.entries(this.rules)
          .reduce((req, [key, rule]) => {
            req[key] = rule.value;
            return req;
          }, {})
      );
    }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
</style>
