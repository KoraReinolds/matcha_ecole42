export default function ({ store, redirect, route, $auth }) {
  if ($auth.loggedIn) {
    if (['login', 'registration'].includes(route.name)) {
      return redirect(
        $auth.user.filledInformation ?
        '/main' :
        '/settings'
      )
    }
  } else {
    if (!['login', 'registration'].includes(route.name)) {
      return redirect('/login')
    }
  }
}