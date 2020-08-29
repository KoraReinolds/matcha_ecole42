export default function ({ store, redirect, route }) {
  if (!store.state.auth.token) {
    if (route.name !== 'login' && route.name !== 'registration') {
      return redirect('/login')
    }
  } else {
    if (route.name === 'login' || route.name === 'registration') {
      return redirect(
        store.state.auth.filledInformation ?
        '/main' :
        '/settings'
      )
    }
  }
}