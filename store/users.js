import fb from '../firebase'
import Cookie from 'js-cookie'

export const state = () => ({
  user: null
})
export const mutations = {
  SET_USER: (state, account) => {
    state.user = account
  }
}
export const actions = {
  async login({ commit }, account) {
    try {
      await fb.auth.signInWithEmailAndPassword(account.email, account.password)
      const token = await fb.auth.currentUser.getIdToken()
      Cookie.set('access_token', token)
      const { email, uid } = fb.auth.currentUser
      commit('SET_USER', { email, uid })
    } catch (error) {
      throw error;
    }
  }
}