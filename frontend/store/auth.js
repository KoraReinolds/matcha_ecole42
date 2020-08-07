import API from '~/api';
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  token: null,
  login: {
    value: 'mskiles',
    errorMsg: '',
    title: 'Login',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  },
  password: {
    value: '123',
    errorMsg: '',
    title: 'Password',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  },
  firstName: {
    value: 'maslyn',
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
    value: 'skiles',
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
    value: 'reinoldskora@gmail.com',
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
  images: {
    main: 0,
    value: [],
    errorMsg: '',
    title: 'Images',
    valid: false,
    rules: [
      "!!value.length || 'Required'",
    ],
  },
  location: {
    value: '',
    errorMsg: '',
    title: 'Location',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  },
  curLocation: null,
})
export const getters = {
  INFO_FILLED: (state) => Object.values(state)
    .filter(el => el && el.value !== undefined)
    .map(val => val.value)
    .some(val => val === '' || val === [] || val === null),
  GET_USER: (state) => Object.entries(state).reduce((sum, [key, val]) => {
    if (val && val.value) sum[key] = val.value;
    return sum;
  }, {}),
  CUR_LOCATION: (state) => state.curLocation,
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
  IMAGES: (state) => state.images,
  LOCATION: (state) => state.location,
}
export const mutations = {
  SET_MAIN_IMAGE: (state, index) => state.images.main = index,
  SET_TOKEN: (state, token) => state.token = token,
  SET_VALUE: (state, { key, value }) => {
    console.log(key, value);
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
  SET_USER: (state, user) => {
    state.firstName.value =   user.fname;
    state.lastName.value =    user.lname;
    state.mail.value =        user.email;
    state.age.value =         user.age;
    state.biography.value =   user.biography;
    state.gender.value =      user.gender;
    state.preferences.value = user.preference,
    state.tags.value =        user.tags,
    state.images.value =      user.images;
    if (user.location) {
      state.location.value =  user.location;
    }
    state.images.main =       user.avatar;
  },
  SET_CUR_LOCATION: (state, location) => state.curLocation = location,
  CLEAR_FIELDS: (state) => {
    state.token = '';
    state.login.value = '';
    state.password.value = '';
    state.firstName.value = '';
    state.lastName.value = '';
    state.mail.value = '';
    state.age.value = '';
    state.biography.value = '';
    state.gender.value = '';
    state.preferences.value = [];
    state.tags.value = [];
    state.images.value = [];
    state.location.value = null;
  }
}
export const actions = {

  async UPDATE_USER ({ commit, state }) {
    await API.updateUser({
      activationCode: state.token,
      avatar:         state.images.main,
      login:          state.login.value,
      password:       state.password.value,
      firstName:      state.firstName.value,
      lastName:       state.lastName.value,
      mail:           state.mail.value,
      biography:      state.biography.value,
      gender:         state.gender.value,
      preference:    state.preferences.value,
      tags:           state.tags.value,
      images:         state.images.value,
      location:       state.location.value,
    })
    .then(({ type }) => {
      if (type === 'ok') {
      } else if (type === 'error') {
      }
    })
    .catch((e) => {});
  },

  LOGOUT ({ commit }) {
    this.$router.push({ name: 'login' });
    Cookie.remove('token');
    commit('CLEAR_FIELDS');
  },

  async GET_LOCATION ({ commit }) {
    let location =
      await API.getLocationByGPS().catch((e) => {}) ||
      await API.getLocationByIP().catch((e) => {}) ||
      { x: 0, y: 0 };
    commit('SET_CUR_LOCATION', location);
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

  async REGISTRATION ({ commit, dispatch, state }) {
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
        dispatch('SIGN_IN');
      } else if (type === 'error') {
      }
    })
    .catch((e) => {});
  },
  
  async SIGN_IN ({ commit, state }) {
    await API.login({
      login:    state.login.value,
      password: state.password.value,
      location: state.curLocation,
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
  },

  LOAD_IMAGE ({ commit, state }, files) {
    const len = state.images.value.length;
    if (files[0].type === 'image/jpeg' && len < 5) {
      const img = {
        src: null,
        index: [0,1,2,3,4].filter(val => 
          !state.images.value.map(img => img.index).includes(val))[0],
      };
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const fd = new FormData();
        fd.append('image', reader.result.split(',')[1]);
        API.uploadImage(fd)
          .then((resp) => {
            img.src = resp.data.data.display_url;
            commit('SET_VALUE', {
              key: 'images',
              value: [...state.images.value, img],
            });
            console.log(img);
            if (!len) commit('SET_MAIN_IMAGE', 0);
          })
          .catch((e) => console.log(e));
      };
    }
  }

}