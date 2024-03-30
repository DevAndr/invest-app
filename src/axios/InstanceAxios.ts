import axios from 'axios';

const HOST_GRAPHQL = process.env.HOST_GRAPQL;
const url = HOST_GRAPHQL ? HOST_GRAPHQL : 'http://localhost:3030/';

const instanceAxios = axios.create({
    url,
    withCredentials: true
})

export default instanceAxios;