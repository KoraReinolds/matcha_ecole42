<template lang="pug">
  form.form(
  )
    TextField(
      :data="fieldsData.login"
      v-model="login"
      rounded
      filled
      name="login"
    )
    TextField(
      :data="fieldsData.email"
      v-model="email"
      type='email'
      rounded
      filled
      name="email"
    )
    div.form-actions
      nuxt-link.link(to="/login") Back
      span.btn(
        :class="{ disabled: !(data_login && data_email) }"
        @click.prevent="data_login && data_email && getEmail({ login: data_login, email: data_email })"
      ) Get email
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import TextField from '@/components/TextField.vue';

export default {
  name: 'Reset-password',
  components: {
    TextField,
  },
  data: () => ({
    data_login: 'User_1',
    data_email: '123@mail.ru',
  }),
  computed: {
    ...mapGetters({
      fieldsData: 'forms/FIELDS_DATA',
    }),
    login: {
      get() { return this.data_login; },
      set(value) { this.setValue({ key: 'login', value }); },
    },
    email: {
      get() { return this.data_email; },
      set(value) { this.setValue({ key: 'email', value }); },
    },
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      getEmail: 'forms/GET_EMAIL',
    }),
    setValue({ key, value }) {
      this[`data_${key}`] = value;
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.form {
  position: relative;
  z-index: 1001;
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
