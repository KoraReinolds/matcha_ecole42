<template lang="pug">
  form.form
    h2.title Login
    TextField(
      :data="getLogin"
      v-model="login"
      rounded
      filled
      name="login"
    )
    TextField(
      :data="getPassword"
      v-model="password"
      type='password'
      rounded
      filled
      name="password"
    )
    div.form-actions
      nuxt-link.link(
        to="/registration"
      ) Registration
      a.link Forget password
      span.btn(
        :class="{ disabled: !formValid }"
        @click.prevent="signIn()"
      ) LogIn
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import fieldMixin from '@/mixins/fieldMixin';
import TextField from '@/components/TextField.vue';

export default {
  name: 'login',
  mixins: [fieldMixin],
  components: {
    TextField,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      formValid: 'forms/LOGIN_VALID',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
    signIn() {
      if (this.formValid) this.$store.dispatch('forms/SIGN_IN');
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
  @media (max-width: map-get($grid-breakpoints, sm)) {
    .form-actions {
      display: flex;
      flex-direction: column;
      .link {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
