import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import fb from "../firebase"
import { Promise } from "core-js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    restaurants: [],
    menus: []
  },
  getters: {
    getRestaurant(state) {
      return id => state.restaurants.find(rest => rest.id === id)
    },
    getMenu(state) {
      return id => state.menus.find(bit => bit.id === id)
    }
  },
  mutations: {
    clearData(state) {
      state.currentUser = null
      state.userProfile = {}
      state.restaurants = []
      state.menu = []
    },
    toggleLoading(state, token) {
      state.loading = token
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setRestaurants(state, token) {
      state.restaurants = token
    },
    setMenu(state, token) {
      state.menu = token
    },
  },
  actions: {
    fetchUserProfile({ state, commit, dispatch }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then((res) => {
          commit("setUserProfile", res.data())
          dispatch("getRestaurants", res.data().restaurant)
        })
        .catch(() => {
          // console.log(err)
        })
    },
    async getRestaurants({ state, commit }, compId) {
      const userRestaurants = compId || state.userProfile.restaurants;
      if (userRestaurants) {
        const get = new Promise((resolve) => {
          const restaurantList = []
          userRestaurants.forEach(async (restaurantId) => {
            const rest = await fb.restaurantsCollection.doc(restaurantId).get()
            const thisRestaurant = {
              id: rest.id,
              ...rest.data(),
            }
            restaurantList.push(thisRestaurant)
          })
          resolve(restaurantList)
        })
        const restaurantList = await get
        commit("setRestaurants", restaurantList);
      }
    },
    async getMenu({ state }, restaurantId) {
      const get = new Promise((resolve) => {
        const restaurant = state.restaurants.find(rest => rest.id === restaurantId);
        const menuId = restaurant.menu;
        fb.menusCollection.doc(menuId).get().then(menu => {
          const thisMenu = {
            id: menu.id,
            ...menu.data(),
          }
          resolve(thisMenu)
        })
      })
      const menu = await get;
      console.log(menu)
      return menu
    },
    sendAdm(store, token) {
      const emailEndpoint = "https://cors-anywhere.herokuapp.com/https://api.sendgrid.com/v3/mail/send"
      const data = {
        personalizations: [
          {
            to: [{ email: token.email }],
          },
        ],
        from: {
          email: "contacto@ourpeople.live",
          name: "Our People",
          alias: "Our People",
        },
        subject: "Conheça o Our People",
        content: [
          {
            type: "text/html",
            value: `<h3>Foi convidado por ${token.userName} para ser administrador da equipa ${token.restaurantName} no OurPeople</h3>
            <p>Clicando <a href="https://our-people.herokuapp.com/login?c=${token.restaurant}">aqui</a> poderá consultar os resultados da vossa equipa.</p>
            <h3>Porquê OurPeople?</h3>
            <p>O objectivo do OurPeople.live é monitorizar a saúde e o bem-estar de cada UM, para segurança de TODOS, da sua EQUIPA.</p>
            <p>#StayHome #StayDigitallyClose #StayHealthy #StayInformed #CARE #TOGETHER</p>`,
          },
        ],
      }
      const headers = {
        Authorization: `Bearer ${process.env.VUE_APP_SENDGRID_KEY}`,
        "Content-Type": "application/json",
      }
      return new Promise((resolve, reject) => {
        axios
          .post(emailEndpoint, data, { headers })
          .then(resolve)
          .catch(reject)
      })
    },
  },
  modules: {},
})
