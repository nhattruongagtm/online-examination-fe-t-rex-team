import { ReactNode } from 'react'

export interface RouterModel {
  path: string
  title: string
  icon?: string
}

export interface ISideBar {
  icon: ReactNode
  title: string
  routes: RouterModel[]
  key: number
}
