export default async function ({ store, redirect, route, $auth, $axios }) {

  if ($auth.loggedIn) {
    if (['login', 'registration'].includes(route.name)) {
      return redirect(
        $auth.user.isFilled ?
        '/main' :
        '/settings'
      )
    }
  } else {
    if (route.name === 'change-password') {
    }
    else if (route.name === 'reset-password') {
      
    } else if (route.name === 'confirm-registration') {
      // await $axios.post('/confirm-registration', { token: route.query.token })
      // return redirect('/registration')
    } else if (!['login', 'registration', 'fill-id'].includes(route.name)) {
      return redirect('/login')
    }
  }
}
