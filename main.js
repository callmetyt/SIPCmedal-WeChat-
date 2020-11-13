import Vue from 'vue'
import App from './App'
import api from 'api/index.js'
import message from 'components/quick-message/quick-message.vue'

Vue.component('message',message)
Vue.prototype.api=api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
