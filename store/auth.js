import API from '~/api';
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  token: null,
  login: {
    value: 'mskiles',
    errorMsg: '',
    title: 'Login',
    valid: true,
    rules: [
      "!!value || 'Required'",
    ],
  },
  password: {
    value: '123',
    errorMsg: '',
    title: 'Password',
    valid: true,
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
  likeList: [],
  filledInformation: false,
})
export const getters = {
  INFO_FILLED: (state) => state.filledInformation,
  GET_USER: (state) => Object.entries(state).reduce((sum, [key, val]) => {
    if (val) sum[key] = val.value;
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
  UPDATE_VALID: (state) => [
      state.firstName.valid,
      state.lastName.valid,
      state.age.valid,
      state.mail.valid,
      state.biography.valid,
      state.gender.valid,
      state.preferences.valid,
      state.tags.valid,
      state.images.valid,
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
  MY_LOCATION: (state) => state.curLocation || state.location.value,
  MY_LIKES: (state) => state.likeList,
}
export const mutations = {
  SET_INFO_AS_FILLED: (state) => state.filledInformation = true,
  TOGGLE_LIKE_USER: (state, likeList) => state.likeList = likeList,
  SET_MAIN_IMAGE: (state, index) => state.images.main = index,
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
  SET_USER: (state, user) => {
    state.firstName.value =   user.fname;
    state.lastName.value =    user.lname;
    state.mail.value =        user.email;
    state.age.value =         user.age;
    state.biography.value =   user.biography;
    state.gender.value =      user.gender;
    state.preferences.value = user.preference || [],
    state.tags.value =        user.tags,
    state.images.value =      user.images || [];
    state.images.main =       user.avatar;
    state.likeList =          user.likeList;
    state.filledInformation = user.filledInformation;
    state.location.value =    user.location;
    state.curLocation =       user.curLocation;
    state.login.value =       user.login;
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
    const userNew = {
      activationCode: state.token,
      avatar:         state.images.main,
      login:          state.login.value,
      password:       state.password.value,
      firstName:      state.firstName.value,
      lastName:       state.lastName.value,
      mail:           state.mail.value,
      age:            state.age.value,
      biography:      state.biography.value,
      gender:         state.gender.value,
      preference:     state.preferences.value,
      tags:           state.tags.value,
      images:         state.images.value,
      location:       state.location.value,
    };
    const { type } = await this.$axios.$post('profile-update', userNew)
    if (type === 'ok') {
      commit('SET_INFO_AS_FILLED');
      commit('users/SET_INIT_TOOLS', userNew, { root: true });
    } else if (type === 'error') {
    }
  },

  async LOGOUT ({ commit, state }) {
    const res = await this.$axios.$post('logout', {
      activationCode: state.token,
    })
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

  async GET_USER ({ commit, state, dispatch }, login) {
    const res = await this.$axios.$post('profile-get', {
      activationCode: state.token,
      login,
    })
    if (res.type === 'ok') {
      commit('users/SET_INIT_TOOLS', res.data, { root: true });
      commit('SET_USER', res.data);
      commit('SET_VALUE', { key: 'age',         value: res.data.age });
      commit('SET_VALUE', { key: 'firstName',   value: res.data.fname });
      commit('SET_VALUE', { key: 'lastName',    value: res.data.lname });
      commit('SET_VALUE', { key: 'mail',        value: res.data.email });
      commit('SET_VALUE', { key: 'biography',   value: res.data.biography });
      commit('SET_VALUE', { key: 'gender',      value: res.data.gender });
      commit('SET_VALUE', { key: 'preferences', value: res.data.preference });
      commit('SET_VALUE', { key: 'tags',        value: res.data.tags });
      commit('SET_VALUE', { key: 'images',      value: res.data.images });
      if (this.$router.currentRoute.name === 'main') {
        dispatch('users/GET_USERS', null, { root: true });
      }
    } else if (res.type === 'error') {
    }
  },

  async REGISTRATION ({ commit, dispatch, state }) {
    const { type } = await this.$axios.$post('register', {
      login:    state.login.value,
      password: state.password.value,
      fname:    state.firstName.value,
      lname:    state.lastName.value,
      email:    state.mail.value,
      location: state.location.value,
    })
    if (type === 'ok') {
      dispatch('SIGN_IN');
    } else if (type === 'error') {
    }
  },
  
  async SIGN_IN ({ commit, state }) {
    const { type, message, token, login } =
      await this.$axios.$post('login', {
        login:    state.login.value,
        password: state.password.value,
        location: state.curLocation,
      })
    if (type === 'ok') {
      Cookie.set('token', token);
      commit('SET_TOKEN', token);
      const res = await this.$axios.$post('profile-get', {
        activationCode: token,
        login,
      })
      if (res.type === 'ok') {
        commit('SET_USER', res.data);
        commit('users/SET_INIT_TOOLS', res.data, { root: true });
        this.$router.push({ path: 
          res.data.filledInformation ?
          '/main' :
          '/settings'
        });
      } else if (res.type === 'error') {
      }
    } else if (type === 'error') {
    }
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
      reader.onload = async () => {
        const fd = new FormData();
        fd.append('image', reader.result.split(',')[1]);
        const resp = await this.$axios.$post(`https://api.imgbb.com/1/upload?
          expiration=3600&
          key=52cdc2758163512d48d7ac9715a14c64`, fd)
        img.src = resp.data.display_url;
        commit('SET_VALUE', {
          key: 'images',
          value: [...state.images.value, img],
        });
        console.log(img);
        if (!len) commit('SET_MAIN_IMAGE', 0);
      };
    }
  },

  async LIKE ({ commit, state }, login) {
    let index = state.likeList.indexOf(login);
    let newLikeList = [...state.likeList];
    if (index === -1) {
      newLikeList.push(login);
    } else {
      newLikeList.splice(index, 1);
    }
    const { type, message } = await this.$axios.$post('like-user', {
      login,
      likeList: newLikeList,
      target: login,
      action: index === -1 ? 'like' : 'dislike',
      activationCode: state.token,
    })
    if (type === 'ok') {
      commit('TOGGLE_LIKE_USER', newLikeList);
    } else if (type === 'error') {
    }
  }

}