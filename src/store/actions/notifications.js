import { getNotifications } from '../../api';

export const notificationsById = id => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'notificationsById',
        payload: { id }
      })
    }, 200);
  }
}

export const notificationsAll = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'notificationsAll',
        payload: {}
      })
    }, 200);
  }
}

//  请求后台通知中心数据，传递给reducer，更改list
export const getNotificationsData = () => {
  return dispatch => {
    getNotifications().then(res => {
      dispatch({
        type: 'getNotificationsData',
        payload: { list: res.list }
      })
    })

  }
}