import axios from 'axios';

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
          position => {
            const long = position.coords.longitude;
            const lat = position.coords.latitude;
            resolve({ y: long, x: lat });
          },
          (err) => reject(err.message),
          { timeout: 1000 }
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
