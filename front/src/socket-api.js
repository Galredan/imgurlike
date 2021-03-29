import socketIOClient from "socket.io-client";
import { update } from './features/posts/postsSlice';



// here is all the receivers for socketio
// used to update the store
// TODO: add rooms / namespace for more clarity
const connect = (url, store) =>  {
  
  const io = socketIOClient(url);
  console.log('socket connected');

  io.on('UPDATE', data => {
    store.dispatch(update(data));
  });

}

export default connect;