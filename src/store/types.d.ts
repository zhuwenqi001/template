interface NavArrItem {
  prop: string
  label: string
}

export interface UserState {
  userInfo: {
    permissions: string[]
    menus: {
      [propName: string]: string[]
    }
    [propName: string]: any
  }
  routeDeep: number
}

export interface CommonState {
  skin: string
  sidebar: {
    opened: boolean
  }
  navOpen: boolean
  navArr: NavArrItem[]
  navDefault: string
  navCur: string
}

export interface RootState {
  user: UserState
  common: CommonState
}
