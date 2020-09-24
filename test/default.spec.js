import { mount } from '@vue/test-utils'
import axios from 'axios'
import register from './api/register'
import login from './api/login'
import logout from './api/logout'
import profileGet from './api/profile-get'
import profileUpdate from './api/profile-update'
import getUsers from './api/get-users'

// const baseUrl = "http://localhost:4000";
const baseUrl = "https://mskiles-matcha-back.herokuapp.com";
const tokens = {};

describe('API', () => {

  // // register
  // register.requests.forEach(req => {
  //   test(`${req.path}, (${req.desc})`, async () => {
  //     const { data } = await axios.post(baseUrl + req.path, req.request);
  //     expect(data).toEqual(req.expect);
  //   })
  // })
  
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
  
  // // logout
  // logout.requests.forEach(req => {
  //   test(`${req.path}, (${req.desc})`, async () => {
  //     const [user,] = req.desc.split(':');
  //     if (req.request.activationCode === 'valid token') {
  //       req.request.activationCode = tokens[user];
  //     }
  //     const { data } = await axios.post(baseUrl + req.path, req.request);
  //     expect(data).toEqual(req.expect);
  //   })
  // })
  
  // // profile-get
  // profileGet.requests.forEach(req => {
  //   test(`${req.path}, (${req.desc})`, async () => {
  //     const [user,] = req.desc.split(':');
  //     if (req.request.activationCode === 'valid token') {
  //       req.request.activationCode = tokens[user];
  //     }
  //     const { data } = await axios.post(baseUrl + req.path, req.request);
  //     expect(data).toEqual(req.expect);
  //   })
  // })
  
  // profile-update
  profileUpdate.requests.forEach(req => {
    test(`${req.path}, (${req.desc})`, async () => {
      const [user,] = req.desc.split(':');
      if (req.request.activationCode === 'valid token') {
        req.request.activationCode = tokens[user];
      }
      const { data } = await axios.post(baseUrl + req.path, req.request);
      expect(data).toEqual(req.expect);
    })
  })
  // test(`${profileUpdate.correct.path}, (${profileUpdate.correct.desc})`, async () => {
  //   reqData = profileUpdate.correct;
  //   reqData.request.activationCode = token;
  //   const { data } = await axios.post(baseUrl + `${reqData.path}`, reqData.request);
  //   expect(data).toEqual(reqData.expect);
    
  //   reqData = profileGet.correct;
  //   reqData.request.activationCode = token;
  //   const { data: newData } = await axios.post(baseUrl + `${reqData.path}`, reqData.request);
  //   expect(newData).toEqual(reqData.expectAfterUpdate);
  // })
  
  // test(`${profileUpdate.wrong.path}, (${profileUpdate.wrong.desc})`, async () => {
  //   reqData = profileUpdate.wrong;
  //   const { data } = await axios.post(baseUrl + `${reqData.path}`, reqData.request);
  //   expect(data).toEqual(reqData.expect);
  // })
  
  // // get-users
  // test(`${getUsers.correct.path}, (${getUsers.correct.desc})`, async () => {
  //   reqData = getUsers.correct;
  //   reqData.request.activationCode = token;
  //   const { data } = await axios.post(baseUrl + `${reqData.path}`, reqData.request);
  //   expect(data).toEqual(reqData.expect);
    
  //   reqData = profileGet.correct;
  //   reqData.request.activationCode = token;
  //   const { data: newData } = await axios.post(baseUrl + `${reqData.path}`, reqData.request);
  //   expect(newData).toEqual(reqData.expectAfterUpdate);
  // })
  
  // test(`${getUsers.wrong.path}, (${getUsers.wrong.desc})`, async () => {
  //   reqData = getUsers.wrong;
  //   const { data } = await axios.post(baseUrl + `${reqData.path}`, reqData.request);
  //   expect(data).toEqual(reqData.expect);
  // })

})
