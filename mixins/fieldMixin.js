import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    login: {
      get() { return this.$auth.user.login; },
      set(value) { this.setValue({ key: 'login', value }); },
    },
    password: {
      get() { return this.$auth.user.password; },
      set(value) { this.setValue({ key: 'password', value }); },
    },
    fname: {
      get() { return this.$auth.user.fname; },
      set(value) { this.setValue({ key: 'fname', value }); },
    },
    lname: {
      get() { return this.$auth.user.lname; },
      set(value) { this.setValue({ key: 'lname', value }); },
    },
    age: {
      get() { return this.$auth.user.age; },
      set(value) { this.setValue({ key: 'age', value }); },
    },
    email: {
      get() { return this.$auth.user.email; },
      set(value) { this.setValue({ key: 'email', value }); },
    },
    biography: {
      get() { return this.$auth.user.biography; },
      set(value) { this.setValue({ key: 'biography', value }); },
    },
    gender: {
      get() { return this.$auth.user.gender; },
      set(value) { this.setValue({ key: 'gender', value }); },
    },
    preference: {
      get() { return this.$auth.user.preference; },
      set(value) { this.setValue({ key: 'preference', value }); },
    },
    tags: {
      get() { return this.$auth.user.tags; },
      set(value) { this.setValue({ key: 'tags', value }); },
    },
    images: {
      get() { return this.$auth.user.images; },
      set(value) { this.setValue({ key: 'images', value }); },
    },
    location: {
      get() { return this.$auth.user.location; },
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
    setValue({ key, value }) {
      const newUser = {...this.$auth.user};
      newUser[key] = value;
      this.$auth.setUser(newUser);
      this.$store.commit('forms/SET_VALUE', { key, value })
    }
  },
};
