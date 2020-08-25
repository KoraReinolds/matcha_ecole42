import axios from 'axios';

const HTTP = axios.create({
  // baseURL: 'https://matcha-mskiles-back.herokuapp.com/',
  // baseURL: 'http://localhost:4000',
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer {token}',
  },
});

export default {

  login(data) {
    return HTTP.post('api/user/login/', data)
      .then((response) => {
        console.log('login', data, response.data);
        return response.data;
      })
  },

  getUser(data) {
    return HTTP.post('api/user/getUserByName/', data)
      .then((response) => {
        console.log('getUser', data, response.data);
        return response.data;
      })
  },

  getUsers(data) {
    return HTTP.post('api/user/getUsers/', data)
      .then((response) => {
        console.log('getUsers', data, response.data);
        return response.data;
      })
  },

  logout(data) {
    return HTTP.post('api/user/logout/', data)
      .then((response) => {
        console.log('logout', data, response.data);
        return response.data;
      })
  },

  updateUser(data) {
    return HTTP.post('api/user/updateUser', data)
      .then((response) => {
        console.log('updateUser', data, response.data);
        return response.data;
      })
  },

  registration(data) {
    return HTTP.post('api/user/registration', data)
      .then((response) => {
        console.log('registration', data, response.data);
        return response.data;
      })
  },

  likeUser(data) {
    return HTTP.post('api/user/likeUser', data)
    .then((response) => {
        console.log('likeUser', data, response.data);
        return response.data;
      })
  },

  getChatList(data) {
    return HTTP.post('api/user/getUsersForChat', data)
    .then((response) => {
        console.log('chat-list', data, response.data);
        return response.data;
      })
  },

  getMessages(data) {
    return HTTP.post('api/actions/getMessages/', data)
    .then((response) => {
        console.log('get-messages', data, response.data);
        return response.data;
      })
  },

  sendMessage(data) {
    return HTTP.post('api/actions/sendMessage', data)
    .then((response) => {
        console.log('send-message', data, response.data);
        return response.data;
      })
  },

  getHistory(data) {
    return HTTP.post('api/actions/getHistory', data)
    .then((response) => {
        console.log('getHistory', data, response.data);
        return response.data;
      })
  },

  getNotifications(data) {
    return HTTP.post('api/actions/getNotifications', data)
    .then((response) => {
        console.log('getNotifications', data, response.data);
        return response.data;
      })
  },

  uploadImage(fd) {
    return axios.post(`https://api.imgbb.com/1/upload?
      expiration=3600&
      key=52cdc2758163512d48d7ac9715a14c64`, fd);
  },

  getLocationByGPS() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(
          (position) => {
            const long = position.coords.longitude;
            const lat = position.coords.latitude;
            resolve({ y: long, x: lat });
          },
          (err) => reject(err.message),
        );
      }
      return reject(new Error('No support for geolocation'));
    });
  },

  getLocationByIP() {
    return new Promise((resolve, reject) => {
      axios.get('http://ip-api.com/json')
        .then(({ data }) => {
          resolve({ y: data.lon, x: data.lat });
        })
        .catch(() => reject(new Error('No support for geolocation')));
    });
  },

};
