import Vue from 'vue'
import { AxiosResponse } from 'axios'
import { Global } from '@/@types/global'

declare module 'axios' {
  interface AxiosResponse {
    [propName: string]: any
  }
}

// 扩展vue属性
declare module 'vue/types/vue' {
  interface Vue {
    GLOBAL: Global
  }
}
