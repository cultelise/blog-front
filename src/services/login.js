import axios from 'axios';

const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log('axios stuff: ', response.data, credentials);
  return response.data;
};

console.log();

export default login;
