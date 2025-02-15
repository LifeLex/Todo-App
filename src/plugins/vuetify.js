import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader


import Vue from 'vue';
import Vuetify from 'vuetify/lib';



Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont: 'md',
    },
    theme:{
        themes:{
            light:{
                primary: '#9652ff',
                success: '#3cd1c2',
                info: 'ffaa2c',
                error: '#f83e70'   
            } 
        }
    }
});
