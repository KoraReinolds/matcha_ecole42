import axios from 'axios';

const HTTP = axios.create({
  // baseURL: 'https://matcha-server.herokuapp.com/',
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: 'Bearer {token}',
  },
});

export default {

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

  updateUser(data) {
    console.log(data);
    return HTTP.post('profile-update/', data)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
  },

  login(data) {
    return HTTP.post('login/', data)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
  },

  registration(data) {
    return HTTP.post('register/', data)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
  },

  getUser(data) {
    console.log(data, HTTP.post('profile-get/', data));
    return HTTP.post('profile-get/', data)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
  },

};