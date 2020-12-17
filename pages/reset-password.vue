<template lang="pug">
  form(
    :class="$style.form"
  )
    h2(
      :class="$style.form_title"
    ) Remind password
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
    div(
      :class="$style.form_actions"
    )
      nuxt-link(
        :class="$style.form_action_link"
        to="/login"
      ) Back
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

<style module lang="scss">

@import '@/assets/css/form.scss';

</style>
