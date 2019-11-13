// 取出T 特有属性名称
type Diff<T, U> = T extends U ? never : T

// 取出两个类型的共同属性，取值后者
type CommonProperties<T, U, C extends keyof T & keyof U> = {
  [K in C]: U[K]
}

// 合并type 类似Object.assign
export type Assign<T, U> = Pick<T, Diff<keyof T, keyof U>> &
  CommonProperties<T, U, keyof T & keyof U> &
  Pick<U, Diff<keyof U, keyof T>>
