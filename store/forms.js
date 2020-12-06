import API from '~/api'

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
      options: { male: 1, female: 2 },
      errorMsg: '',
      title: 'Gender',
      valid: false,
      rules: [
        "value !== 3 || 'Required'",
      ],
    },
    preference: {
      options: { male: 1, female: 2, both: 3 },
      errorMsg: '',
      title: 'Preferences',
      valid: false,
      rules: [
        "!!value || 'Required'",
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
  realLocation: null,
})
export const getters = {
  INFO_FILLED: (state) => state.isFilled,
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
  MY_LOCATION: (state) => state.realLocation,
}
export const mutations = {
  TOGGLE_LIKE: (state, user) => user.likedFrom = !user.likedFrom,
  SET_LOCATION: (state, location) => state.realLocation = location,
  SET_VALUE: (state, { key, value }) => {
    let field = state.formFields[key]
    if (field && field.rules) {
      let msg = null
      field.rules.every((rule) => {
        msg = eval(rule)
        if (msg !== true) {
          field.errorMsg = msg
          field.valid = false
          return false
        }
        return true
      })
      if (msg === true) {
        field.errorMsg = null
        field.valid = true
      }
    }
  },
}
export const actions = {

  CHANGE_USER_FIELD ({ commit, rootState }, { key, value }) {
    const newUser = { ...rootState.auth.user }
    newUser[key] = value
    commit('auth/SET', { key: 'user', value: newUser }, { root: true })
    commit('SET_VALUE', { key, value })
  },

  async UPDATE_USER ({ commit, state, dispatch }, user) {
    let res = await this.$axios.$post('profile-update', user)
    if (res.type === 'ok') {
      dispatch('CHANGE_USER_FIELD', { key: 'isFilled', value: true })
      res = { type: 'ok', message: 'Данные успешно обновлены' }
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
  },

  async LOGOUT () {
    await this.$auth.logout()
    setTimeout(() => location.reload(), 500)
  },

  async GET_LOCATION ({ commit }) {
    let location =
      await API.getLocationByGPS().catch((e) => {}) ||
      await API.getLocationByIP().catch((e) => {}) ||
      { x: 0, y: 0 }
    commit('SET_LOCATION', location)
  },

  async REGISTRATION ({ dispatch, state }, data) {
    data.location = state.realLocation
    const res = await this.$axios.$post('register', data)
    if (res.type === 'ok') {
      dispatch('SIGN_IN', {
        login: data.login,
        password: data.password,
      })
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
  },
  
  async SIGN_IN ({ dispatch, state }, data) {
    data.location = state.realLocation
    try {
      await this.$auth.loginWith('local', { data })
      dispatch('history/PUSH_POP_WINDOW', res, { root: true })
    } catch (e) {
      if (e.message.slice(-3) === '401') {
        dispatch('history/PUSH_POP_WINDOW', {
          type: 'error',
          message: 'Неправильное имя логина или пароль'
        }, { root: true })
      }
    }
    this.$router.push({ path: 
      this.$auth.user.isFilled ?
      '/main' :
      '/settings'
    })
  },

  LOAD_IMAGE ({ dispatch, rootState }, files) {
    const images = [ ...rootState.auth.user.images ]
    if (files[0].type === 'image/jpeg' && Object.keys(images).length < 5) {
      const img = { src: '' }
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = async () => {
        img.src = reader.result
        img.index = images.length
        img.avatar = !img.index
        const fd = new FormData()
        fd.append('image', reader.result.split(',')[1])
        const res = await API.uploadImage(fd)
        img.src = res.data.data.display_url
        dispatch('CHANGE_USER_FIELD', {
          key: 'images',
          value: [...images, img],
        })
      }
    }
  },

  async LIKE ({ commit, rootState, dispatch }, user) {

    const { login, likedFrom } = user

    const res = await this.$axios.$post(`like-user`, {
      login,
      value: likedFrom ? 0 : 1,
    })
    // this.$set(user, 'likedFrom', !user.likedFrom)
    
    console.log(user, res)
    if (res.type === 'ok') {
      commit('TOGGLE_LIKE', user)
    }
    dispatch('history/PUSH_POP_WINDOW', res, { root: true })
  }
}