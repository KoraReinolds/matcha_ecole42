
export default function ({ $axios, redirect, store }) {
  $axios.onError((err) => {})
  $axios.onRequestError((err) => {})
  $axios.onResponseError((err) => {})
  $axios.onResponse(({ data }) => {
    if (data.type === '404') {
      redirect('/404')
    }
    if (process.client) {
      store.dispatch('history/PUSH_POP_WINDOW', data, { root: true }) // устанавливаем всплывающее окно
    }
  })
}