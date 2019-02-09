const pkg = require('./package')

module.exports = {
    mode: 'spa',

    /*
  ** Headers of the page
  */
    head: {
        title: pkg.name,
        script: [
            { src: 'https://checkoutshopper-test.adyen.com/checkoutshopper/assets/js/sdk/checkoutSecuredFields.1.5.1.min.js' }
        ],
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Barlow:400,600|Playfair+Display:700'
            }
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
        '~/assets/main.css'
    ],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '@/plugins/element-ui'
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
  */
    axios: {
    // See https://github.com/nuxt-community/axios-module#options
    },

    /*
  ** Build configuration
  */
    build: {
        transpile: [/^element-ui/],
        babel: {
            plugins: [
                '@babel/transform-async-to-generator',
                '@babel/transform-runtime'
            ]
        },

        /*
    ** You can extend webpack config here
    */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
