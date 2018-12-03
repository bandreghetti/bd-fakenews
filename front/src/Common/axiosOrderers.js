import axios from 'axios';

const db_api = axios.create({baseURL: 'http://localhost'});

export default db_api;