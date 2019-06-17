import webpack from "webpack";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "DigiPet",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "blue",
    throttle: 150
  },

  loadingIndicator: {
    name: "circle",
    color: "#3B8070",
    background: "white"
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/vue-cookies.js",
    "~/plugins/errorParser.js",
    "~/plugins/moment.js"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    [
      "nuxt-fontawesome",
      {
        component: "fa",
        imports: [
          //import whole set
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"]
          }
        ]
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    retry: { retries: 3 },
    baseURL: "http://192.168.1.106:4567"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash"
        // ...etc.
      })
    ],
    extend(config) {
      const vueLoader = config.module.rules.find(
        rule => rule.loader === "vue-loader"
      );
      vueLoader.options.transformAssetUrls = {
        video: ["src", "poster"],
        source: "src",
        img: "src",
        image: "xlink:href",
        "b-img": "src",
        "b-img-lazy": ["src", "blank-src"],
        "b-card": "img-src",
        "b-card-img": ["img-src", "src"],
        "b-card-img-lazy": ["src", "blank-src"],
        "b-carousel-slide": "img-src",
        "b-embed": "src"
      };
    }
  }
};
