import API from '~/api';

export const state = () => ({
  login: {
    errorMsg: '',
    title: 'Login',
    valid: true,
    rules: [
      "!!value || 'Required'",
    ],
  },
  password: {
    errorMsg: '',
    title: 'Password',
    valid: true,
    rules: [
      "!!value || 'Required'",
    ],
  },
  fname: {
    errorMsg: '',
    title: 'First Name',
    valid: false,
    rules: [
      "!!value || 'Required'",
      "(value && value.length >= 3) || 'Min 3 characters'",
      "(value && value.length <= 10) || 'Max 10 characters'",
    ],
  },
  lname: {
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
  email: {
    errorMsg: '',
    title: 'E-mail',
    valid: false,
    rules: [
      "!!value || 'Required'",
      "value.match(/[^@]+@[^.]+\..+/) !== null || 'Must be properly formatted'",
    ],
  },
  biography: {
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
    errorMsg: '',
    title: 'Gender',
    valid: false,
    rules: [
      "!!value || 'Required'",
    ],
  },
  preference: {
    options: ['male', 'female', 'bisexual'],
    errorMsg: '',
    title: 'Preferences',
    valid: false,
    rules: [
      "!!value.length || 'Required'",
    ],
  },
  tags: {
    errorMsg: '',
    title: 'New tag',
    valid: false,
    rules: [
      "!!value.length || 'Required'",
    ],
  },
  images: {
    main: 0,
    errorMsg: '',
    title: 'Images',
    valid: false,
    rules: [
      "!!value.length || 'Required'",
    ],
  },
  location: {
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
  LOGIN_VALID: (state) => [
      state.login.valid,
      state.password.valid,
    ].every((valid) => valid === true),
  REG_VALID: (state) => [
      state.login.valid,
      state.password.valid,
      state.fname.valid,
      state.lname.valid,
      state.email.valid,
    ].every((valid) => valid === true),
  UPDATE_VALID: (state) => [
      state.fname.valid,
      state.lname.valid,
      state.age.valid,
      state.email.valid,
      state.biography.valid,
      state.gender.valid,
      state.preference.valid,
      state.tags.valid,
      state.images.valid,
    ].every((valid) => valid === true),
  LOGIN: (state) => state.login,
  PASSWORD: (state) => state.password,
  FIRST_NAME: (state) => state.fname,
  LAST_NAME: (state) => state.lname,
  AGE: (state) => state.age,
  MAIL: (state) => state.email,
  BIOGRAPHY: (state) => state.biography,
  GENDER: (state) => state.gender,
  PREFERENCES: (state) => state.preference,
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
  SET_VALUE: (state, { key, value }) => {
    if (state[key] && state[key].rules) {
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
  SET_CUR_LOCATION: (state, location) => state.curLocation = location,
}
export const actions = {

  async UPDATE_USER ({ commit, state, dispatch }) {
    const userNew = {
      avatar:         state.images.main,
      login:          state.login.value,
      password:       state.password.value,
      fname:          state.fname.value,
      lname:          state.lname.value,
      mail:           state.mail.value,
      age:            state.age.value,
      biography:      state.biography.value,
      gender:         state.gender.value,
      preference:     state.preferences.value,
      tags:           state.tags.value,
      images:         state.images.value,
      location:       state.location.value,
    };
    const res = await this.$axios.$post('profile-update', userNew)
    if (res.type === 'ok') {
      commit('SET_INFO_AS_FILLED');
      commit('users/SET_INIT_TOOLS', userNew, { root: true });
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
  },

  async LOGOUT () {
    await this.$auth.logout();
    location.reload();
  },

  async GET_LOCATION ({ commit }) {
    let location =
      await API.getLocationByGPS().catch((e) => {}) ||
      await API.getLocationByIP().catch((e) => {}) ||
      { x: 0, y: 0 };
    commit('SET_CUR_LOCATION', location);
  },

  async REGISTRATION ({ dispatch, state }, data) {
    const res = await this.$axios.$post('register', data);
    if (res.type === 'ok') {
      dispatch('SIGN_IN', {
        login: data.login,
        password: data.password,
      });
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
  },
  
  async SIGN_IN ({ state }, data) {
    data.location = state.curLocation;
    await this.$auth.loginWith('local', { data });
    this.$router.push({ path: 
      this.$auth.user.filledInformation ?
      '/main' :
      '/settings'
    });
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
        const res = await this.$axios.$post(`https://api.imgbb.com/1/upload?
          expiration=3600&
          key=52cdc2758163512d48d7ac9715a14c64`, fd)
        img.src = res.data.display_url;
        commit('SET_VALUE', {
          key: 'images',
          value: [...state.images.value, img],
        });
        if (!len) commit('SET_MAIN_IMAGE', 0);
      };
    }
  },

  async LIKE ({ commit, state, dispatch }, login) {
    let index = state.likeList.indexOf(login);
    let newLikeList = [...state.likeList];
    if (index === -1) {
      newLikeList.push(login);
    } else {
      newLikeList.splice(index, 1);
    }
    const res = await this.$axios.$post('like-user', {
      login,
      likeList: newLikeList,
      target: login,
      action: index === -1 ? 'like' : 'dislike',
    })
    if (res.type === 'ok') {
      commit('TOGGLE_LIKE_USER', newLikeList);
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
  }
}