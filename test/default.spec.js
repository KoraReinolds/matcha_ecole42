import { mount } from '@vue/test-utils'
import axios from 'axios'
import register from './api/register'
import login from './api/login'
import logout from './api/logout'
import profileGet from './api/profile-get'
import profileUpdate from './api/profile-update'
import getUsers from './api/get-users'
import likeUser from './api/like-user'
import visit from './api/visit'
import messages from './api/messages'

const baseUrl = "http://localhost:4000";
// const baseUrl = "https://mskiles-matcha-back.herokuapp.com";
const tokens = {};

describe('API', () => {

  // register
  register.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const { data } = await axios.post(baseUrl + req.path, req.request);
      expect(data).toEqual(req.expect);
    })
  })
  
  // login
  login.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const { data } = await axios.post(baseUrl + req.path, req.request);
      if (data.type === 'ok') {
        expect(data.token === undefined).toBe(false);
        tokens[req.request.login] = data.token;
        delete data.token;
      }
      expect(data).toEqual(req.expect);
    })
  })

  // // profile-get
  // profileGet.requests.forEach(req => {
  //   test(`${req.path}, (${req.desc})`, async () => {
  //     const [user,] = req.desc.split(':');
  //     if (req.request.activationCode === 'valid token') {
  //       req.request.activationCode = tokens[user];
  //     }
  //     let data;
  //     let error;
  //     try {
  //       data = (await axios.post(baseUrl + req.path, req.request)).data;
  //     } catch({ response }) {
  //       error = response;
  //     }
  //     if (data) expect(data).toEqual(req.expect);
  //     else if (error) expect(error.status).toEqual(401);
  //   })
  // })
  
  // profile-update
  profileUpdate.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const [user,] = req.desc.split(':');
      if (req.request.activationCode === 'valid token') {
        req.request.activationCode = tokens[user];
      }
      let data;
      let error;
      try {
        data = (await axios.post(baseUrl + req.path, req.request)).data;
      } catch({ response }) {
        error = response;
      }
      if (data) expect(data).toEqual(req.expect);
      else if (error) expect(error.status).toEqual(401);
    })
  })
  
  // get-users
  getUsers.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const [user,] = req.desc.split(':');
      if (req.request.activationCode === 'valid token') {
        req.request.activationCode = tokens[user];
      }
      let data;
      let error;
      try {
        data = (await axios.post(baseUrl + req.path, req.request)).data;
      } catch({ response }) {
        error = response;
      }
      if (data) expect(data).toEqual(req.expect);
      else if (error) expect(error.status).toEqual(401);
    })
  })
  
  // like-user
  likeUser.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const [user,] = req.desc.split(':');
      if (req.request.activationCode === 'valid token') {
        req.request.activationCode = tokens[user];
      }
      let data;
      let error;
      try {
        data = (await axios.post(baseUrl + req.path, req.request)).data;
      } catch({ response }) {
        error = response;
      }
      if (data && (req.path === '/history' || req.path === '/notifications')) {
        data.data.forEach(action => {
          let created = action.created;
          expect(created === undefined).toBe(false);
          delete action.created;
        })
      }
      if (data) expect(data).toEqual(req.expect);
      else if (error) expect(error.status).toEqual(401);
    })
  })

  // visit
  visit.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const [user,] = req.desc.split(':');
      if (req.request.activationCode === 'valid token') {
        req.request.activationCode = tokens[user];
      }
      let data;
      let error;
      try {
        data = (await axios.post(baseUrl + req.path, req.request)).data;
      } catch({ response }) {
        error = response;
      }
      if (data && (req.path === '/history' || req.path === '/notifications')) {
        data.data.forEach(action => {
          let created = action.created;
          expect(created === undefined).toBe(false);
          delete action.created;
        })
      }
      if (data) expect(data).toEqual(req.expect);
      else if (error) expect(error.status).toEqual(401);
    })
  })

  // messages
  messages.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const [user,] = req.desc.split(':');
      if (req.request.activationCode === 'valid token') {
        req.request.activationCode = tokens[user];
      }
      let data;
      let error;
      try {
        data = (await axios.post(baseUrl + req.path, req.request)).data;
      } catch({ response }) {
        error = response;
      }
      if (data && (['/send-message'].includes(req.path))) {
        let created = data.data.created;
        expect(created === undefined).toBe(false);
        delete data.data.created;
      }
      if (data && (['/history', '/notifications', '/get-messages'].includes(req.path))) {
        data.data.forEach(action => {
          let created = action.created;
          expect(created === undefined).toBe(false);
          delete action.created;
        })
      }
      if (data) expect(data).toEqual(req.expect);
      else if (error) expect(error.status).toEqual(401);
    })
  })

  // // logout
  // logout.requests.forEach(req => {
  //   test(`${req.path}, (${req.desc})`, async () => {
  //     const [user,] = req.desc.split(':');
  //     if (req.request.activationCode === 'valid token') {
  //       req.request.activationCode = tokens[user];
  //     }
  //     try {
  //       const { data } = await axios.post(baseUrl + req.path, req.request);
  //       expect(data).toEqual(req.expect);
  //     } catch({ response }) {
  //       expect(response.status).toEqual(401);
  //     }
  //   })
  // })
  
})
