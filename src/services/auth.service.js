import axios from 'axios';
import keys from 'config/keys';
import authHeader from './auth-header';

const login = async (username, password) => {
  const res = await axios.post(keys.BASE_URL + '/api/login', {
    username,
    password,
  });
  if (res.data.accessToken) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const register = async (username, email, password) => {
  const res = await axios.post(keys.BASE_URL + '/api/register', {
    username,
    email,
    password,
  });
  return res;
};

const refreshProfile = async () => {
  const res = await axios.get(keys.BASE_URL + '/api/auth/refresh-profile', {
    headers: authHeader(),
  });
  const oldUserInfo = JSON.parse(localStorage.getItem('user'));
  let newUserInfo = res.data;
  newUserInfo.accessToken = oldUserInfo.accessToken;
  //store
  localStorage.setItem('user', JSON.stringify(newUserInfo));

  return newUserInfo;
};

export { login, logout, register, refreshProfile };
