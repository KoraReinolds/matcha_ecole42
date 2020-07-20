<template lang="pug">
  div#settings
    TextField.form-field(
      outlined
      :data="getFirstName"
      v-model.trim="firstName"
    )
    TextField.form-field(
      outlined
      :data="getLastName"
      v-model="lastName"
    )
    TextField.form-field(
      outlined
      :data="getAge"
      v-model.trim="age"
    )
    TextField.form-field(
      outlined
      :data="getMail"
      v-model.trim="mail"
    )
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import TextField from '@/components/TextField.vue';
import fieldMixin from '@/mixins/fieldMixin';

export default {
  name: 'Settings',
  mixins: [fieldMixin],
  components: {
    TextField,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      getUser: 'auth/GET_USER'
    }),
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped lang="scss">

#settings {
  padding: 0 10px;
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  .form-field {
    min-width: 300px;
    width: 40%;
    margin: 0 4% 0 4%;
  }
  .map,
  .images,
  .textarea,
  .form-actions {
    width: 100%;
  }
  // @media (max-width: $mobile-breakpoint) {
  //   .btn {
  //     width: 100%;
  //   }
  // }
}
</style>
