export default function ({ store, redirect, route, $auth }) {
  if ($auth.loggedIn) {
    if (['login', 'registration'].includes(route.name)) {
      return redirect(
        $auth.user.isFilled ?
        '/main' :
        '/settings'
      )
    }
  } else {
    if (!['login', 'registration', 'fill-id'].includes(route.name)) {
      return redirect('/login')
    }
  }
}