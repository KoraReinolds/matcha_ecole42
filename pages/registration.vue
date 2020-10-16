<template lang="pug">
  form.form
      h2.title Registration
      TextField(
        :data="getLogin"
        v-model="login"
        name="login"
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
        type="email"
        name="email"
      )
      div.form-actions
        nuxt-link.link(to="/login") Back
        span.btn(
          :class="{ disabled: !formValid }"
          @click.prevent="register"
        ) SignUp

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
      formValid: 'forms/REG_VALID',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
    register() {
      if (this.formValid) this.$store.dispatch('forms/REGISTRATION');
    }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.form {
  .title {
    font-size: 24px;
  }
}
</style>
