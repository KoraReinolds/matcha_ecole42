<template lang="pug">
  div.form
    h2.title Login
    TextField(
      v-for="rule in Object.values(rules)"
      rounded
      filled
      :key="`login-${rule.title}`"
      :data="rule"
      @validate="validate"
      v-model="rule.value"
    )
    div.form-actions
      nuxt-link.link(to="/registration") Registration
      a.link Forget password
      span.btn(:class="{ disabled: !formValid }" @click.prevent="login()") LogIn
</template>

<script>
import TextField from '@/components/TextField.vue';
import validateMixin from '@/mixins/validateMixin';

export default {
  name: 'login',
  mixins: [validateMixin],
  components: {
    TextField,
  },
  data: () => ({
    rules: {
      login: {
        value: '',
        errorMsg: '',
        title: 'Login',
        valid: false,
        rules: [
          (value) => !!value || 'Required',
        ],
      },
      password: {
        value: '',
        errorMsg: '',
        title: 'Password',
        valid: false,
        rules: [
          (value) => !!value || 'Required',
        ],
      },
    }
  }),
  computed: {
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
