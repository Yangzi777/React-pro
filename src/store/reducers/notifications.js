//  分支reducer 必须是一个纯函数，固定的输入必须要有固定的输出


const initState = {
  list: []
}
const reducer = (prevState = initState, action) => {
  switch (action.type) {
    case 'getNotificationsData':
      return {
        ...prevState,
        list: action.payload.list
      }
    case 'notificationsById':
      return {
        ...prevState,
        list: prevState.list.map(item => {
          if (item.id === action.payload.id) {
            item.hasRead = true
          }
          return item
        })
      }
    case 'notificationsAll':
      return {
        ...prevState,
        list: prevState.list.map(item => {
          item.hasRead = true
          return item
        })
      }
    default:
      return prevState
  }

}
export default reducer