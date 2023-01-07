import axios from 'axios';

const { FAQ_API_PORT } = process.env;
const FAQ_API_ROOT = `http://${window.location.hostname}:${FAQ_API_PORT}`;

const authenticate = async (username: string, password: string) =>
  axios.post(`${FAQ_API_ROOT}/auth`, {
    username,
    password,
  });

export default authenticate;
