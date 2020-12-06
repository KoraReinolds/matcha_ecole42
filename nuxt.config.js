module.exports = {

  // server: {
  //   port: 3000,
  //   host: '192.168.29.15'
  // },
  /*
  ** Headers of the page
  */
  head: {
    title: 'matcha-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lobster&display=swap'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    height: '5px',
    color: '#3B8070',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      })
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  css: [
    // global for project
    '~assets/css/main.scss'
  ],
  modules: [
    'nuxt-socket-io',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-fontawesome', {
      component: 'font-awesome-icon',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: [
            'faMars',
            'faVenus',
            'faTransgender',
            'faTimesCircle',
            'faCheck',
            'faPlus',
            'faBell',
            'faCogs',
            'faSignOutAlt',
            'faUser',
            'faHistory',
            'faSearch',
            'faEye',
            'faCommentAlt',
            'faLocationArrow',
            'faStar',
            'faBan',
            'faHeartBroken',
            'faHeart',
            'faUserSlash',
            'faCircle',
            'faCog',
            'faTimes',
            'faSortAmountDown',
            'faSortAmountUp',
            'faPaperPlane',
            'faCaretDown',
            'faCaretLeft',
            'faHashtag',
            'faChild',
            'faYinYang',
          ]
        }
      ]
    }]
  ],
  io: {
    // module options
    sockets: [{
      url: 'ws://192.168.29.71:4567/chat'
    }]
  },
  styleResources: {
    scss: ['./assets/css/*.scss']
  },
  plugins: [
    { src: '~/plugins/ymapPlugin.js',  mode: 'client' },
    '~/plugins/axios'
  ],
  axios: {
    // credentials: true,
    // baseURL: 'http://localhost:4567', // Used as fallback if no runtime config is provided
    // baseURL: 'http://192.168.29.13:4567', // Used as fallback if no runtime config is provided
    // baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
    baseURL: 'https://matcha-server.herokuapp.com', // Used as fallback if no runtime config is provided
  },
  auth: {
    token: {
      prefix: ''
    },
    redirect: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'token' },
          user: { url: 'profile-get', method: 'get', propertyName: 'data' },
          // user: false
          // logout: false
        },
        tokenType: "",
      }
    }
  }
}
