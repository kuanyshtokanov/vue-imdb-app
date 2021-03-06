import colors from 'vuetify/es5/util/colors'

export default {
  // router: {
  //   extendRoutes (routes, resolve) {
  //     routes.push({
  //       path: '/search/:id',
  //       name: 'SearchMovie',
  //       // props: true,
  //       component: 'pages/movies/_id'
  //     })
  //   }
  // },
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: 'Real IMDB',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  /* Environement variables
  */
  env: {
    SHOWS_SEARCH: 'http://api.tvmaze.com/search/shows?q=',
    SHOWS_LOOKUP: 'http://api.tvmaze.com/shows',
    SHOW_CAST: '/cast',
    MAX_ITEMS_ON_PAGE: 9,
    MAX_PAGES_NUM: 12
  }
}
