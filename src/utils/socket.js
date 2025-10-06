import io from "socket.io-client";
import { BASE_URL } from "../utils/constants.jsx";

export const createSocketConnection = () => {
  return io(BASE_URL);
};
