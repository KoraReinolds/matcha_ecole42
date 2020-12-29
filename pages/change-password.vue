<template lang="pug">

  div
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
        type="password"
      )
      div(
        :class="$style.form_actions"
      )
        Button(
          @click.prevent="changePass({ password: data_password, token: $route.query.token })"
          :disabled="!$store.state.forms.formFields.password.valid"
        ) Change pssword
      
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import TextField from '@/components/TextField.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Change-password',
  components: {
    TextField,
    Button,
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
      set(value) {
        this.setValue({ key: 'password', value })
        this.checkSimplify(value)
      },
    },
  },
  methods: {
    ...mapMutations({
      clearFields: 'forms/CLEAR_FIELDS',
    }),
    ...mapActions({
      changePass: 'forms/CHANGE_PASSWORD',
      checkSimplify: 'forms/CHECK_SIMPLIFY',
    }),
    setValue({ key, value }) {
      this[`data_${key}`] = value;
      this.$store.commit('forms/VALIDATE_VALUE', { key, value })
    },
  },
  mounted() {
    this.clearFields()
  },
};
</script>

<style module lang="scss">

@import '@/assets/css/form.scss';

</style>
