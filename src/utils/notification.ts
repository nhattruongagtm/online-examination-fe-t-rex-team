import { notification } from 'antd'
export const openNotification = (
  type: 'success' | 'info' | 'warning' | 'error',
  content: string
) => {
  notification[type]({
    message: '',
    placement: 'top',
    duration: 2,
    description: content,
  })
}
