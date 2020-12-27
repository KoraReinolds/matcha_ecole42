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
  realLocation: null, // реальное местоположение пользователя
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
  CANGE_PASSWORD_VALID: (state, value) => {
    state.formFields.password.valid = value
    state.formFields.password.errorMsg = value ? '' : 'Пароль слишком простой'
  },
  TOGGLE_LIKE: (state, user) => user.likedFrom = !user.likedFrom,
  SET_LOCATION: (state, location) => state.realLocation = location,
  VALIDATE_VALUE: (state, { key, value }) => {
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

    // обновляем информацию пользователя
    commit('auth/SET', {
      key: 'user',
      value: { ...rootState.auth.user, [key]: value },
    }, { root: true })

    commit('VALIDATE_VALUE', { key, value }) // производим валидацию

  },

  async UPDATE_USER ({ dispatch }, user) {

    let res = await this.$axios.$post('profile-update', user)

    if (res.type === 'ok') {

      // устанавливаем запоненность профиля для доступа ко всему сайту
      dispatch('CHANGE_USER_FIELD', { key: 'isFilled', value: true })

      res.message = 'Данные успешно обновлены'
      dispatch('history/PUSH_POP_WINDOW', res, { root: true })

    }

  },

  async LOGOUT () {

    await this.$auth.logout()

    // дожидаемся окончания анимации и сбрасываем хранилище, перезагружая страницу
    setTimeout(() => location.reload(), 500)

  },

  async GET_LOCATION ({ commit }) {

    let location =
      await API.getLocationByGPS().catch((e) => {}) || // пытаемся получить локацию по gps
      await API.getLocationByIP().catch((e) => {}) || // иначе по ip
      { x: 0, y: 0 }

    commit('SET_LOCATION', location)

  },

  // регистрация пользователя
  async REGISTRATION ({ dispatch, state }, data) {

    data.location = state.realLocation // отправляем текущую локацию

    const res = await this.$axios.$post('register', data)

    if (res.type === 'ok') {
      res.message = 'Для окончания регистрации перейдите по ссылке в почте'
      dispatch('history/PUSH_POP_WINDOW', res, { root: true })
    }

  },
  
  async INIT_SOCKETS ({ dispatch }) {

    let socket = new WebSocket(
      `ws://localhost:4567/chat?token=${this.$auth.getToken('local')}`,
    )

    socket.onopen = function(e) {
    }

    socket.onclose = function(event) {
    }

    socket.onerror = function(error) {
    }

    socket.onmessage = function(event) {
      dispatch('history/PUSH_NOTIFICATION', JSON.parse(event.data), { root: true })
    }.bind(this)

  },

  // авторизация пользователя
  async SIGN_IN ({ dispatch, state }, data) {

    data.location = state.realLocation // отправляем текущую локацию

    let { data: { type } } = await this.$auth.loginWith('local', { data })

    if (type === 'ok') {
      dispatch('INIT_SOCKETS')
      // получаем непрочитанные уведомления
      dispatch('history/GET_UNREADED_NOTIFICATIONS', null, { root: true })
    }

    this.$router.push({ path: 
      this.$auth.user.isFilled ? // если информация о пользователе запонена перенаправляем его
      '/main' : // на страницу поиска
      '/settings' // иначе на страницу заполнения профиля
    })

  },

  LOAD_IMAGE ({ dispatch, rootState }, files) {

    const images = rootState.auth.user.images // ссылка на существующие изображения

    // если картинка и их количество не больше 5
    if (files[0].type === 'image/jpeg' && Object.keys(images).length < 5) {

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
    }
  },

  async CHECK_SIMPLIFY ({ dispatch, commit }, password) {
    
    if (password) {
      const res = await this.$axios.$get(`/password-validate/${password}`)
      // const res = {
      //   type: 'error',
      //   message: 'Пароль слишком простой',
      // }
  
      commit('CANGE_PASSWORD_VALID', res.type === 'ok')
    }
  },

  async CHANGE_PASSWORD ({ dispatch }, { password, token }) {

    const res = await this.$axios.$post(`change-reset-password`, { password }, {
      headers: { Authorization: token },
    })
    
    if (res.type === 'ok') {
      res.message = 'Пароль успешно изменен'
    }
  },

  async GET_EMAIL ({ dispatch }, data) {

    const res = await this.$axios.$post(`reset-password`, data)
    
    if (res.type === 'ok') {
      res.message = 'На вашу почту отправленна инструкция по смене пароля'
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