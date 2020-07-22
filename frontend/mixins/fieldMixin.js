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
    biography: {
      get() { return this.getBiography.value; },
      set(value) { this.setValue({ key: 'biography', value }); },
    },
    gender: {
      get() { return this.getGender.value; },
      set(value) { this.setValue({ key: 'gender', value }); },
    },
    preferences: {
      get() { return this.getPreferences.value; },
      set(value) { this.setValue({ key: 'preferences', value }); },
    },
    tags: {
      get() { return this.getTags.value; },
      set(value) { this.setValue({ key: 'tags', value }); },
    },
    images: {
      get() { return this.getImages.value; },
      set(value) { this.setValue({ key: 'images', value }); },
    },
    ...mapGetters({
      getLogin: 'auth/LOGIN',
      getPassword: 'auth/PASSWORD',
      getFirstName: 'auth/FIRST_NAME',
      getLastName: 'auth/LAST_NAME',
      getAge: 'auth/AGE',
      getMail: 'auth/MAIL',
      getBiography: 'auth/BIOGRAPHY',
      getGender: 'auth/GENDER',
      getPreferences: 'auth/PREFERENCES',
      getTags: 'auth/TAGS',
      getImages: 'auth/IMAGES',
    }),
  },
  methods: {
    ...mapMutations({
      setValue: 'auth/SET_VALUE',
    }),
  },
};
