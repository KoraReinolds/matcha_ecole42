import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    login: {
      get() { return this.getLogin.value; },
      set(value) { this.setValue({ key: 'login', value }); },
    },
    password: {
      get() { return this.getPassword.value; },
      set(value) { this.setValue({ key: 'password', value }); },
    },
    firstName: {
      get() { return this.getFirstName.value; },
      set(value) { this.setValue({ key: 'firstName', value }); },
    },
    lastName: {
      get() { return this.getLastName.value; },
      set(value) { this.setValue({ key: 'lastName', value }); },
    },
    age: {
      get() { return this.getAge.value; },
      set(value) { this.setValue({ key: 'age', value }); },
    },
    mail: {
      get() { return this.getMail.value; },
      set(value) { this.setValue({ key: 'mail', value }); },
    },
    ...mapGetters({
      getLogin: 'auth/LOGIN',
      getPassword: 'auth/PASSWORD',
      getFirstName: 'auth/FIRST_NAME',
      getLastName: 'auth/LAST_NAME',
      getAge: 'auth/AGE',
      getMail: 'auth/MAIL',
    }),
  },
  methods: {
    ...mapMutations({
      setValue: 'auth/SET_VALUE',
    }),
  },
};
