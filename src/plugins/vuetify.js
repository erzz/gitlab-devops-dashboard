import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#f2f2f2',
        secondary: '#272822',
        accent: '#8c9ba5',
        success: '#1aaa55',
        error: '#db3b21',
        warning: '#fc9403',
        info: '#1f78d1',
      },
    },
  },
});
