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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#3B8070',
    height: '50px'
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
        // test: /\.pug$/,
        // loader: 'pug-plain-loader'
      })
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
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
          ]
        }
      ]
    }]
  ],
  styleResources: {
    scss: ['./assets/css/*.scss']
  },
}

