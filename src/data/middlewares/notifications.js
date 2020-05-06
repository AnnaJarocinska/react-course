 import {toast} from 'react-tostify';
 
 const notificationsMiddleware = () => next => action => {

    if( action.successMessage && /(.*)_(SUCCES)/.test(action.type)) {

        toast.success(action.successMessage) ;

    }
    next(action)
}

export default  notificationsMiddleware