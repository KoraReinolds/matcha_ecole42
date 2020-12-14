<template lang="pug">
  form.form(
  )
    TextField(
      :data="fieldsData.password"
      v-model="password"
      rounded
      filled
      name="password"
    )
    div.form-actions
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
