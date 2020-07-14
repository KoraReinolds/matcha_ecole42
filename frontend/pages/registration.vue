<template lang="pug">
  div.form
      h2 Registration
      TextField(
        v-for="rule in Object.values(rules)"
        :key="`registration-${rule.title}`"
        :label="rule.title"
        v-model="rule.value"
        :rules="rule"
      )
      div.form-actions
        nuxt-link.link(to="/login") Back
        span.btn(:class="{ disabled: !formValid }" @click.prevent="register") SignUp

</template>

<script>
import TextField from '@/components/TextField.vue';

export default {
  name: 'Registration',
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
          (value) => (value && value.length >= 3) || 'Min 3 characters',
          (value) => (value && value.length <= 10) || 'Max 10 characters',
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
      fname: {
        value: '',
        title: 'First Name',
        valid: false,
        rules: [
          (value) => !!value || 'Required',
          (value) => (value && value.length >= 3) || 'Min 3 characters',
          (value) => (value && value.length <= 10) || 'Max 10 characters',
        ],
      },
      lname: {
        value: '',
        title: 'Last Name',
        valid: false,
        rules: [
          (value) => !!value || 'Required',
          (value) => (value && value.length >= 3) || 'Min 3 characters',
          (value) => (value && value.length <= 10) || 'Max 10 characters',
        ],
      },
      email: {
        value: '',
        title: 'E-mail',
        valid: false,
        rules: [
          (value) => !!value || 'Required',
          (value) => value.match(/[^@]+@[^.]+\..+/) !== null || 'Must be properly formatted',
        ],
      }
    },
  }),
  computed: {
    formValid: function() {
      return Object.values(this.rules).every((rule) => rule.valid === true);
    },
  },
  methods: {
    register() {
      if (this.formValid) this.$store.dispatch('auth/REGISTRATION', 
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
