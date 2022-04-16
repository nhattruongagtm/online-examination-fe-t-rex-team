import { clientAxios } from './clientAxios'

export const testApi = {
  getDummyData: (id: number): Promise<any> => {
    const url = `/todos/${id}`
    return clientAxios.get(url)
  },
}
