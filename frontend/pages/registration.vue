<template lang="pug">
  div.form
      h2.title Registration
      TextField(
        v-for="rule in Object.values(rules)"
        :key="`registration-${rule.title}`"
        :data="rule"
        @validate="validate"
        v-model="rule.value"
      )
      div.form-actions
        nuxt-link.link(to="/login") Back
        span.btn(:class="{ disabled: !formValid }" @click.prevent="register") SignUp

</template>

<script>
import TextField from '@/components/TextField.vue';
import validateMixin from '@/mixins/validateMixin';

export default {
  name: 'Registration',
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
          (value) => (value && value.length >= 3) || 'Min 3 characters',
          (value) => (value && value.length <= 10) || 'Max 10 characters',
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
      fname: {
        value: '',
        errorMsg: '',
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
        errorMsg: '',
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
        errorMsg: '',
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
