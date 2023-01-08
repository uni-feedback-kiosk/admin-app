import axios from 'axios';

const { FILES_API_PORT } = process.env;
const FILES_API_ROOT = `http://${window.location.hostname}:${FILES_API_PORT}`;

const authenticate = async (username: string, password: string) =>
  axios.post(`${FILES_API_ROOT}/auth`, {
    username,
    password,
  });

export default authenticate;
