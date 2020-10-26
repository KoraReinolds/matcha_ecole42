
export default function ({ $axios, redirect, store }) {
  $axios.onRequest(({ data }) => {
    if (process.client) {
      console.log(data);
    }
  })
}