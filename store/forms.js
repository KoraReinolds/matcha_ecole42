import API from '~/api'

export const state = () => ({
  validationRules: {
    login: [
      "!!value || 'Required'",
      "(value && value.length <= 20) || 'Max 20 characters'",
    ],
    password: [
      "!!value || 'Required'",
      "(value && value.length >= 6) || 'Min 6 characters'",
      "(value && value.length <= 20) || 'Max 20 characters'",
    ],
    fname: [
      "!!value || 'Required'",
      "(value && value.length >= 3) || 'Min 3 characters'",
      "(value && value.length <= 20) || 'Max 20 characters'",
    ],
    lname: [
      "!!value || 'Required'",
      "(value && value.length >= 3) || 'Min 3 characters'",
      "(value && value.length <= 20) || 'Max 20 characters'",
    ],
    age: [
      "!!value || 'Required'",
      "(value && Number.isInteger(+value)) || 'Age must be integer'",
      "(value && value >= 18) || 'Min 18 years old'",
      "(value && value <= 99) || 'Max 99 years old'",
    ],
    email: [
      "!!value || 'Required'",
      "value.match(/[^@]+@[^.]+\..+/) !== null || 'Must be properly formatted'",
      "(value && value.length <= 30) || 'Max 30 characters'",
    ],
    biography: [
      "!!value || 'Required'",
      "(value && value.length <= 2048) || 'Max 2048 characters'",
    ],
    gender: [
      "!!value || 'Required'",
    ],
    preference: [
      "!!value.length || 'Required'",
    ],
    tags: [
      "!!value.length || 'Required'",
      "value.length < 6 || 'Max 5 tags'",
    ],
    images: [
      "!!value.length || 'Required'",
    ],
    location: [
    ],
  },
  formFields: {
    login: {
      value: '',
      errorMsg: '',
      title: 'Login',
      valid: false,
    },
    password: {
      value: '',
      errorMsg: '',
      title: 'Password',
      valid: false,
    },
    fname: {
      value: '',
      errorMsg: '',
      title: 'First Name',
      valid: false,
    },
    lname: {
      value: '',
      errorMsg: '',
      title: 'Last Name',
      valid: false,
    },
    age: {
      value: '',
      errorMsg: '',
      title: 'Age',
      valid: false,
    },
    email: {
      value: '',
      errorMsg: '',
      title: 'E-mail',
      valid: false,
    },
    biography: {
      value: '',
      errorMsg: '',
      title: 'Biography',
      valid: false,
    },
    gender: {
      value: '',
      options: ['male', 'female', 'bisexual'],
      errorMsg: '',
      title: 'Gender',
      valid: false,
    },
    preference: {
      value: [],
      options: ['male', 'female', 'bisexual'],
      errorMsg: '',
      title: 'Preferences',
      valid: false,
    },
    tags: {
      value: [],
      errorMsg: '',
      title: 'New tag',
      valid: false,
    },
    images: {
      value: [],
      errorMsg: '',
      title: 'Images',
      valid: false,
    },
    location: {
      value: '',
      errorMsg: '',
      title: 'Location',
      valid: false,
    },
  },
  realLocation: null, // реальное местоположение пользователя
  popular_tags: ['lol', 'kek'],
})
export const getters = {
  LOGIN_VALID: (state) => !!(state.formFields.login.value &&
    state.formFields.password.value && state.realLocation),
  REG_VALID: ({ formFields }) => ['login', 'password', 'fname', 'lname', 'email']
    .map(fieldName => formFields[fieldName].valid)
    .every((valid) => valid === true),
  UPDATE_VALID: ({ formFields }) => ['fname', 'lname', 'age', 'email', 'biography', 'gender', 'preference', 'tags', 'images']
    .map(fieldName => formFields[fieldName].valid)
    .every((valid) => valid === true),
}
export const mutations = {
  CLEAR_FIELDS: (state) => Object.values(state.formFields).forEach(field => {
    field.valid = false
    field.errorMsg = ''
    field.value = typeof field.value === 'string' ? '' : []
  }),
  SET_POPULAR_TAGS: (state, tag_list) => state.popular_tags = tag_list,
  TOGGLE_LIKE: (state, user) => user.likedFrom = !user.likedFrom,
  SET_LOCATION: (state, location) => state.realLocation = location,
  SET_VALUE: (state, { key, value }) => state.formFields[key].value = value,
  VALIDATE_VALUE: (state, { key, value }) => {
    let field = state.formFields[key]
    let rules = state.validationRules[key]
    if (field && rules) {
      let msg = null
      rules.every((rule) => {
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
      field.value = value
    }
  },
}
export const actions = {

  async GET_POPULAR_TAGS ({ commit }) {

    let res = await this.$axios.$get('get-tags')

    if (res.type === 'ok') {
      commit('SET_POPULAR_TAGS', res.data)
    }

  },

  CHANGE_USER_FIELD ({ commit, rootState }, { key, value }) {

    // обновляем информацию пользователя
    commit('auth/SET', {
      key: 'user',
      value: { ...rootState.auth.user, [key]: value },
    }, { root: true })

    commit('VALIDATE_VALUE', { key, value }) // производим валидацию

  },

  async UPDATE_USER ({ dispatch, state }) {

    let res = await this.$axios.$post('profile-update', [
      'age',
      'biography',
      'email',
      'fname',
      'gender',
      'lname',
      'images',
      'location',
      'login',
      'preference',
      'tags',
    ].reduce((sum, cur) => ({
      ...sum,
      [cur]: state.formFields[cur].value
    }), {}))

    if (res.type === 'ok') {

      // устанавливаем запоненность профиля для доступа ко всему сайту
      dispatch('CHANGE_USER_FIELD', { key: 'isFilled', value: true })

      res.message = 'Данные успешно обновлены'
      dispatch('popWindows/PUSH_POP_WINDOW', res, { root: true })

    }

  },

  async LOGOUT () {

    await this.$auth.logout()

    // // дожидаемся окончания анимации и сбрасываем хранилище, перезагружая страницу
    // setTimeout(() => location.reload(), 500)

  },

  async GET_LOCATION ({ commit }) {

    let location =
      await API.getLocationByGPS().catch((e) => {}) || // пытаемся получить локацию по gps
      await API.getLocationByIP().catch((e) => {}) || // иначе по ip
      { x: 0, y: 0 }

    commit('SET_LOCATION', location)

  },

  // регистрация пользователя
  async REGISTRATION ({ dispatch, state, commit }) {

    const res = await this.$axios.$post('register', {
      login: state.formFields.login.value,
      password: state.formFields.password.value,
      lname: state.formFields.lname.value,
      fname: state.formFields.fname.value,
      email: state.formFields.email.value,
    })

    if (res.type === 'ok') {
      dispatch('SIGN_IN')
    }

  },
  
  async INIT_SOCKETS ({ dispatch }) {

    let socket = new WebSocket(
      `ws://localhost:4567/chat?token=${this.$auth.getToken('local')}`,
    )

    socket.onopen = function(e) {
    }
    
    socket.onclose = function(event) {
      if (event.code === 1001) {
        dispatch('INIT_SOCKETS')
      } else {
        dispatch('LOGOUT')
      }
    }
    
    socket.onerror = function(error) {
    }
    
    socket.onmessage = function(event) {
      dispatch('history/PUSH_NOTIFICATION', JSON.parse(event.data), { root: true })
    }.bind(this)

  },

  // авторизация пользователя
  async SIGN_IN ({ dispatch, state, rootState }) {

    let { data: { type } } = await this.$auth.loginWith('local', {
      data: {
        login: state.formFields.login.value,
        password: state.formFields.password.value,
        location: state.realLocation // отправляем текущую локацию
      }
    })

    if (type === 'ok') {

      // dispatch('INIT_SOCKETS')
      if (rootState.auth.user.isFilled) {
        // получаем непрочитанные уведомления
        dispatch('history/GET_UNREADED_NOTIFICATIONS', null, { root: true })
      }
    }

    this.$router.push({ path: 
      this.$auth.user.isFilled ? // если информация о пользователе запонена перенаправляем его
      '/main' : // на страницу поиска
      '/settings' // иначе на страницу заполнения профиля
    })

  },

  LOAD_IMAGE ({ dispatch, rootState }, files) {

    const images = rootState.auth.user.images // ссылка на существующие изображения

    // если картинка
    if (files[0].type === 'image/jpeg') {

      const img = { src: '' } // создаем изображение
      const reader = new FileReader()

      reader.readAsDataURL(files[0])
      reader.onload = async () => {
        img.src = reader.result
        img.index = images.length // устанавливаем индекс последовательности
        img.avatar = !img.index // если изображение единственное, то присваевем ему статус основного
        const fd = new FormData() // создаем форму для отправки изображения в хранилище изображений
        fd.append('image', reader.result.split(',')[1])
        const res = await API.uploadImage(fd) // отправляем изображение в хранилище
        img.src = res.data.data.display_url // устнавливаем ссылку на изображение в src
        // изменяем состояние новым массивом изображений
        dispatch('CHANGE_USER_FIELD', {
          key: 'images',
          value: [...images, img],
        })
      }
    } else {
      dispatch('popWindows/PUSH_POP_WINDOW', {
        type: 'error',
        message: 'Необходимо загрузить картинку в формате JPEG',
      }, { root: true })
    }
  },

  async GET_EMAIL ({ dispatch }, data) {

    const res = await this.$axios.$post(`reset-password`, data)
    
    if (res.type === 'ok') {
      res.message = 'На вашу почту отправленна инструкция по смене пароля'
      dispatch('popWindows/PUSH_POP_WINDOW', res, { root: true })
    }
  },

  async LIKE ({ commit }, user) {

    const { login, likedFrom } = user

    const res = await this.$axios.$post(`like-user`, {
      login,
      value: likedFrom ? 0 : 1, // 0 - unlike, 1 - like
    })
    
    if (res.type === 'ok') {
      commit('TOGGLE_LIKE', user) // переключить состояние лайка у пользователя
    }
    
  }
}