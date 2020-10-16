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
    location: {
      get() { return this.getLocation.value; },
      set(value) { this.setValue({ key: 'location', value }); },
    },
    ...mapGetters({
      getLogin: 'forms/LOGIN',
      getPassword: 'forms/PASSWORD',
      getFirstName: 'forms/FIRST_NAME',
      getLastName: 'forms/LAST_NAME',
      getAge: 'forms/AGE',
      getMail: 'forms/MAIL',
      getBiography: 'forms/BIOGRAPHY',
      getGender: 'forms/GENDER',
      getPreferences: 'forms/PREFERENCES',
      getTags: 'forms/TAGS',
      getImages: 'forms/IMAGES',
      getLocation: 'forms/LOCATION',
    }),
  },
  methods: {
    ...mapMutations({
      setValue: 'forms/SET_VALUE',
    }),
  },
};
