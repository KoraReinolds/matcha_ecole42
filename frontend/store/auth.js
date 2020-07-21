import API from '~/api';
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  token: null,
  avatar: null,
  login: {
    value: '',
    errorMsg: '',
    title: 'Login',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  },
  password: {
    value: '',
    errorMsg: '',
    title: 'Password',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  },
  firstName: {
    value: '',
    errorMsg: '',
    title: 'First Name',
    valid: false,
    rules: [
      "!!value || 'Required'",
      "(value && value.length >= 3) || 'Min 3 characters'",
      "(value && value.length <= 10) || 'Max 10 characters'",
    ],
  },
  lastName: {
    value: '',
    errorMsg: '',
    title: 'Last Name',
    valid: false,
    rules: [
      "!!value || 'Required'",
      "(value && value.length >= 3) || 'Min 3 characters'",
      "(value && value.length <= 10) || 'Max 10 characters'",
    ],
  },
  age: {
    value: '',
    errorMsg: '',
    title: 'Age',
    valid: false,
    rules: [
      "!!value || 'Required'",
      "(value && Number.isInteger(+value)) || 'Age must be integer'",
      "(value && value >= 18) || 'Min 18 years old'",
      "(value && value <= 99) || 'Max 99 years old'",
    ],
  },
  mail: {
    value: '',
    errorMsg: '',
    title: 'E-mail',
    valid: false,
    rules: [
      "!!value || 'Required'",
      "value.match(/[^@]+@[^.]+\..+/) !== null || 'Must be properly formatted'",
    ],
  },
  biography: {
    value: '',
    errorMsg: '',
    title: 'Biography',
    valid: false,
    rules: [
      "!!value || 'Required'",
      "(value && value.length <= 1024) || 'Max 1024 characters'",
    ],
  },
  gender: {
    options: ['male', 'female', 'bisexual'],
    value: '',
    errorMsg: '',
    title: 'Gender',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  },
  preferences: {
    options: ['male', 'female', 'bisexual'],
    value: [],
    errorMsg: '',
    title: 'Preferences',
    valid: false,
    rules: [
      "!!value.length || 'Required'",
    ],
  },
  tags: {
    value: [],
    errorMsg: '',
    title: 'New tag',
    valid: false,
    rules: [
      "!!value.length || 'Required'",
    ],
  },
  location: {
    value: '',
    errorMsg: '',
    title: 'E-mail',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  }
})
export const getters = {
  TOKEN: (state) => state.token,
  LOGIN_VALID: (state) => [
      state.login.valid,
      state.password.valid,
    ].every((valid) => valid === true),
  REG_VALID: (state) => [
      state.login.valid,
      state.password.valid,
      state.firstName.valid,
      state.lastName.valid,
      state.mail.valid,
    ].every((valid) => valid === true),
  LOGIN: (state) => state.login,
  PASSWORD: (state) => state.password,
  FIRST_NAME: (state) => state.firstName,
  LAST_NAME: (state) => state.lastName,
  AGE: (state) => state.age,
  MAIL: (state) => state.mail,
  BIOGRAPHY: (state) => state.biography,
  GENDER: (state) => state.gender,
  PREFERENCES: (state) => state.preferences,
  TAGS: (state) => state.tags,
  LOCATION: (state) => state.location,
}
export const mutations = {
  SET_TOKEN: (state, token) => state.token = token,
  SET_VALUE: (state, { key, value }) => {
    state[key].value = value;
    if (state[key].rules) {
      let msg = null;
      state[key].rules.every((rule) => {
        msg = eval(rule);
        if (msg !== true) {
          state[key].errorMsg = msg;
          state[key].valid = false;
          return false;
        }
        return true;
      });
      if (msg === true) {
        state[key].errorMsg = null;
        state[key].valid = true;
      }
    }
  },
  SET_LOCATION: (state, location) => state.location.value = location,
  SET_USER: (state, user) => {
    state.firstName.value =   user.fname;
    state.lastName.value =    user.lname;
    state.mail.value =        user.email;
    state.age.value =         user.age;
    state.biography.value =   user.biography;
    state.gender.value =      user.gender;
    state.preferences.value = user.preference,
    state.tags.value =        user.tags,
    state.avatar =            user.avatar;
    // state.images.value =      user.images;
    if (user.location) {
      state.location.value =  user.location;
    }
  },
}
export const actions = {

  async GET_LOCATION ({ commit }) {
    let location =
      await API.getLocationByGPS().catch((e) => {}) ||
      await API.getLocationByIP().catch((e) => {}) ||
      { x: 0, y: 0 };
    commit('SET_LOCATION', location);
  },

  async GET_USER ({ commit, state }) {
    console.log({
      activationCode: state.token,
      login: state.login.value,
    })
    await API.getUser({
      activationCode: state.token,
      login: state.login.value,
    })
      .then((res) => {
        if (res.type === 'ok') {
          commit('SET_USER', res.data);
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  },

  async REGISTRATION ({ commit, state }) {
    await API.registration({
      login:    state.login.value,
      password: state.password.value,
      fname:    state.firstName.value,
      lname:    state.lastName.value,
      email:    state.mail.value,
      location: state.location.value,
    })
    .then(({ type }) => {
      if (type === 'ok') {
        this.$router.push({ path: '/settings' });
      } else if (type === 'error') {
      }
    })
    .catch((e) => {});
  },
  
  async SIGN_IN ({ commit, state }) {
    await API.login({
      login:    state.login.value,
      password: state.password.value,
      location: state.location.value,
    })
      .then(({ type, message, token, login }) => {
        if (type === 'ok') {
          Cookie.set('token', token);
          commit('SET_TOKEN', token);
          this.$router.push({ path: '/settings' });
        } else if (type === 'error') {
        }
      })
      .catch((e) => {});
  }

}