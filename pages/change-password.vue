<template lang="pug">
  form(
    :class="$style.form"
  )
    h2(
      :class="$style.form_title"
    ) Change password
    TextField(
      :data="{ ...fieldsData.password, title: 'New password' }"
      v-model="password"
      rounded
      filled
      name="password"
    )
    div(
      :class="$style.form_actions"
    )
      span.btn(
        :class="{ disabled: !data_password }"
        @click.prevent="data_password && changePass({ password: data_password, token: $route.query.token })"
      ) Change pssword
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import TextField from '@/components/TextField.vue';

export default {
  name: 'Change-password',
  components: {
    TextField,
  },
  data: () => ({
    data_password: '',
  }),
  computed: {
    ...mapGetters({
      fieldsData: 'forms/FIELDS_DATA',
    }),
    password: {
      get() { return this.data_password },
      set(value) { this.setValue({ key: 'password', value }); },
    },
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      changePass: 'forms/CHANGE_PASSWORD',
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
