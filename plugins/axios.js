// const Cookie = process.client ? require('js-cookie') : undefined

export default function ({ $axios, redirect, store }) {
  $axios.onError(error => {
    if(error.response.status === 401) {
      console.log(123);
      // store.dispatch('forms/LOGOUT');
      // redirect('/login')
      
      // const res = await this.$axios.$post('logout', {
      //   activationCode: state.token,
      // })
      // Cookie.remove('token');
      // redirect('/login')
      // this.$router.push({ name: 'login' });
      // commit('CLEAR_FIELDS');
      // commit('chat/CLEAR_DATA', null, { root: true });
      // dispatch('history/PUSH_POP_WINDOW', res, { root: true });
    }
  })
}