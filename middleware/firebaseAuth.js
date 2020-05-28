import Cookie from 'js-cookie'

export default function ({ store, route, redirect }) {
  const user = store.state.users.user || Cookie.get('access_token');
  const blockedRoute = /\/admin\/*/g
  if (!user && route.path.match(blockedRoute)) {
    redirect('/')
  }
}
