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
    if (['change-password', 'reset-password', 'confirm-registration', 'verification'].includes(route.name)) {

    } else if (!['login', 'registration', 'fill-id'].includes(route.name)) {
      return redirect('/login')
    }
  }
}
