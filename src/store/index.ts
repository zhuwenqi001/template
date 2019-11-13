import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { RootState } from './types'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.ts$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath
    .replace(/^\.\/(.*)\.\w+$/, '$1')
    .replace(/[-][a-z]/g, v => v.toUpperCase().substr(1))
  const value = modulesFiles(modulePath)
  Object.assign(modules, { [moduleName]: value.default })
  return modules
}, {})

const store = new Vuex.Store<RootState>({
  modules,
  getters,
  strict: debug
})

export default store
