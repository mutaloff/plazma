import io from "socket.io-client";
import { url } from "./config";

const socket = io(url, {
    cors: {
        credentials: true
    }, transports: ['websocket']
});

export default socket