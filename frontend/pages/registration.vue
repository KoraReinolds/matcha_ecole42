<template lang="pug">
  div.form
      h2.title Registration
      TextField(
        :data="getLogin"
        v-model="login"
      )
      TextField(
        :data="getPassword"
        v-model="password"
      )
      TextField(
        :data="getFirstName"
        v-model="firstName"
      )
      TextField(
        :data="getLastName"
        v-model="lastName"
      )
      TextField(
        :data="getMail"
        v-model="mail"
      )
      div.form-actions
        nuxt-link.link(to="/login") Back
        span.btn(:class="{ disabled: !formValid }" @click.prevent="register") SignUp

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import fieldMixin from '@/mixins/fieldMixin';
import TextField from '@/components/TextField.vue';

export default {
  name: 'Registration',
  mixins: [fieldMixin],
  components: {
    TextField,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      formValid: 'auth/REG_VALID',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
    register() {
      if (this.formValid) this.$store.dispatch('auth/REGISTRATION');
    }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
</style>
