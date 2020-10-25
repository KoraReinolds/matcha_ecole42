import API from '~/api';

export const state = () => ({
  formFields: {
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
  },
  // likeList: [],
})
export const getters = {
  INFO_FILLED: (state) => state.filledInformation,
  LOGIN_VALID: ({formFields}) => ['login', 'password']
    .map(fieldName => formFields[fieldName].valid)
    .every((valid) => valid === true),
  REG_VALID: ({formFields}) => ['login', 'password', 'fname', 'lname', 'email']
    .map(fieldName => formFields[fieldName].valid)
    .every((valid) => valid === true),
  UPDATE_VALID: ({formFields}) => ['fname', 'lname', 'age', 'email', 'biography', 'gender', 'preference', 'tags', 'images']
    .map(fieldName => formFields[fieldName].valid)
    .every((valid) => valid === true),
  FIELDS_DATA: (state) => state.formFields,
  // MY_LOCATION: (state, getters, rootState) => rootState.auth.user.curLocation || rootState.auth.user.location,
  // MY_LIKES: (state) => state.likeList,
}
export const mutations = {
  // TOGGLE_LIKE_USER: (state, likeList) => state.likeList = likeList,
  SET_VALUE: (state, { key, value }) => {
    let field = state.formFields[key];
    if (field && field.rules) {
      let msg = null;
      field.rules.every((rule) => {
        msg = eval(rule);
        if (msg !== true) {
          field.errorMsg = msg;
          field.valid = false;
          return false;
        }
        return true;
      });
      if (msg === true) {
        field.errorMsg = null;
        field.valid = true;
      }
    }
  },
}
export const actions = {

  CHANGE_USER_FIELD ({ commit, rootState }, { key, value }) {
    const newUser = { ...rootState.auth.user };
    newUser[key] = value;
    console.log(newUser)
    commit('auth/SET', { key: 'user', value: newUser }, { root: true });
    commit('SET_VALUE', { key, value })
  },

  async UPDATE_USER ({ commit, state, dispatch }, user) {
    const res = await this.$axios.$post('profile-update', user)
    if (res.type === 'ok') {
      dispatch('CHANGE_USER_FIELD', { key: 'filledInformation', value: true });
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true });
  },

  async LOGOUT () {
    await this.$auth.logout();
    location.reload();
  },

  async GET_LOCATION ({ dispatch }) {
    let location =
    await API.getLocationByGPS().catch((e) => {}) ||
    await API.getLocationByIP().catch((e) => {}) ||
    { x: 0, y: 0 };
    dispatch('CHANGE_USER_FIELD', { key: 'curLocation', value: location });
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
  
  async SIGN_IN ({ dispatch, state }, data) {
    data.location = state.curLocation;
    let res;
    try {
      res = await this.$auth.loginWith('local', { data });
    } catch (e) {
      if (e.message.slice(-3) === '401') {
        res = {
          type: 'error',
          message: 'Неправильное имя логина или пароль'
        }
        dispatch('history/PUSH_POP_WINDOW', res, { root: true });
      }
    }
    this.$router.push({ path: 
      this.$auth.user.filledInformation ?
      '/main' :
      '/settings'
    });
  },

  LOAD_IMAGE ({ dispatch, commit, rootState }, files) {
    const images = [ ...rootState.auth.user.images ];
    const len = Object.keys(images).length;
    if (files[0].type === 'image/jpeg' && len < 5) {
      const img = {
        src: '',
        index: [0,1,2,3,4].filter(val => 
          !images.map(img => img.index).includes(val))[0],
      };
      console.log(img)
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = async () => {
        // img.src = reader.result.split(',')[1];
        const fd = new FormData();
        fd.append('image', reader.result.split(',')[1]);
        img.src = fd;
        const res = await this.$axios.$post(`https://api.imgbb.com/1/upload?
          expiration=3600&
          key=52cdc2758163512d48d7ac9715a14c64`, fd)
        img.src = res.data.display_url;
        dispatch('CHANGE_USER_FIELD', {
          key: 'images',
          value: [...images, img],
        });
        if (!len) {
          dispatch('CHANGE_USER_FIELD', {
            key: 'avatar',
            value: 0,
          });
        }
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