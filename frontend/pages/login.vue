<template lang="pug">
  div.form
    h2.title Login
    TextField(
      :data="getLogin"
      v-model="login"
      rounded
      filled
    )
    TextField(
      :data="getPassword"
      v-model="password"
      rounded
      filled
    )
    div.form-actions
      nuxt-link.link(
        to="/registration"
      ) Registration
      a.link Forget password
      span.btn(:class="{ disabled: !formValid }" @click.prevent="signIn()") LogIn
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
      formValid: 'auth/LOGIN_VALID',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
    }),
    signIn() {
      if (this.formValid) this.$store.dispatch('auth/SIGN_IN');
    }
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
</style>
