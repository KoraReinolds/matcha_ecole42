module.exports = {
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
            'faSortAmountDownAlt',
            'faPaperPlane',
            'faCaretDown',
            'faCaretLeft',
          ]
        }
      ]
    }]
  ],
  io: {
    // module options
    sockets: [{
      url: 'http://localhost:4000'
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
    baseURL: 'http://localhost:4000', // Used as fallback if no runtime config is provided
  }
}

