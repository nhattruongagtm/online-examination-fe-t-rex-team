import { clientAxios } from './clientAxios'

export const testApi = {
  getDummyData: (id: number): Promise<any> => {
    const url = `/todos/${id}`
    return clientAxios.get(url)
  },
}

export const fetchSubject = {
  fetchData: (id: number): Promise<any> => {
    const url = `/subject/${id}`
    return clientAxios.get(url)
  },
}
