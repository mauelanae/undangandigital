import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.51.127:8081', // Ubah sesuai IP server kamu
});

export default instance;