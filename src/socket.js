import io from "socket.io-client";
import { BASE_URL } from "./config";

let socket;

const connectSocket = (user_id) => {
    socket = io(BASE_URL, {
        query: `user_id=${user_id}`,
        // "transports": ['websocket']
        transports: ['polling', 'websocket'],
        allowEIO3: true
    })
}




export { socket, connectSocket };