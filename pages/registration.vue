<template lang="pug">

  form(
    :class="$style.form"
    name="register_form"
    @submit.prevent="register"
  )
    h2(
      :class="$style.form_title"
    ) Registration
    TextField(
      v-bind="fieldsData.login"
      @input="setValue({ key: 'login', value: $event })"
      name="matcha_login"
    )
    TextField(
      v-bind="fieldsData.password"
      @input="setValue({ key: 'password', value: $event })"
      type="password"
      name="matcha_password"
    )
    TextField(
      v-bind="fieldsData.fname"
      @input="setValue({ key: 'fname', value: $event })"
    )
    TextField(
      v-bind="fieldsData.lname"
      @input="setValue({ key: 'lname', value: $event })"
    )
    TextField(
      v-bind="fieldsData.email"
      @input="setValue({ key: 'email', value: $event })"
      type="email"
      name="matcha_email"
    )
    div(
      :class="$style.form_actions"
    )
      nuxt-link(
        :class="$style.form_action_link"
        to="/login"
      ) Back
      input(
        :class="$style.btn"
        type="submit"
        :disabled="!formValid"
        value="SignUp"
      )

</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import TextField from '@/components/TextField.vue';

export default {
  name: 'Registration',
  components: {
    TextField,
  },
  data: () => ({
  }),
  middleware({ store }) {
    store.commit('forms/CLEAR_FIELDS')
  },
  computed: {
    ...mapState({
      fieldsData: state => state.forms.formFields,
    }),
    ...mapGetters({
      formValid: 'forms/REG_VALID',
    }),
  },
  methods: {
    ...mapMutations({
      setValue: 'forms/VALIDATE_VALUE',
    }),
    ...mapActions({
      register: 'forms/REGISTRATION',
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

@import '@/assets/css/form.scss';
@import '@/assets/css/button.scss';

</style>
