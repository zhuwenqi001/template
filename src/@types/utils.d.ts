// pick custom property of T
type Diff<T, U> = T extends U ? never : T

// pick common property between T,U
type Filter<T, U> = T extends U ? T : never

// propertyName
type PropertyNames<T> = keyof T

// common properties
type CommonProperties<T, U, C extends keyof T & keyof U> = {
  [K in C]: U[K]
}

// 合并type 类似Object.assign
export type Assign<T, U> = Pick<T, Diff<keyof T, keyof U>> &
  CommonProperties<T, U, PropertyNames<T> & PropertyNames<U>> &
  Pick<U, Diff<keyof U, keyof T>>

  export