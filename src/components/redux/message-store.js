const def = {
  message: '',
  status: 0,
  classEle: ''
}

export const ADDMESSAGE = {
  type: 'ADDMESSAGE',
  payload: {
    message: '',
    status: '',
    classEle: ''
  }
}
export default function messageReducer(state = def, action) {
  switch (action.type) {
    case ADDMESSAGE.type:
      state = {
        message: action.payload || '',
        status: action.status || 0,
        classEle: action.classEle || ''
      }
      break
    default:
  }
  return state
}
