import { postEvalScore, preEvalScore, userLoggedIn } from '../redux/actions';
import { URL } from '../redux/constants';
import store from '../redux/store'

export const connectServerAsync = () => {
    var source = new EventSource(URL + '/stream-flux');
    source.addEventListener('HEARTBEAT_EVENT', heartbeatEventHandler, false);
    source.addEventListener('USER_LOGGED_IN', userLoggedInEventHandler, false);
    source.addEventListener('PRE_EVAL_COMPLETED', preEvalCompletedEventHandler, false);
    source.addEventListener('POST_EVAL_COMPLETED', postEvalCompletedEventHandler, false);
}

export const heartbeatEventHandler = (event) => {
    // console.log(event.data);
}

export const userLoggedInEventHandler = (event) => {
    console.log(event)
    store.dispatch(userLoggedIn(JSON.parse(event.data)));
}

export const preEvalCompletedEventHandler = (event) => {
    console.log(event)
    store.dispatch(preEvalScore(JSON.parse(event.data)));
}

export const postEvalCompletedEventHandler = (event) => {
    console.log(event)
    store.dispatch(postEvalScore(JSON.parse(event.data)));
}