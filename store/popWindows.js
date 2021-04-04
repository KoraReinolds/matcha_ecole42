export const state = () => ({
  popWindows: [],
})

export const getters = {
}

export const mutations = {

  PUSH_POP_WINDOW: (state, { message, who, action, type }) => state.popWindows.push({
    msg: message || (action ==='messages' ?
      `${who.fname} ${who.lname} send you message` :
      `${who.fname} ${who.lname} ${action} you`),
    id: Math.random().toString(),
    action: action || type,
    visible: true,
  }),

  HIDE_MSG: (state, id) => {
    state.popWindows.find( mess => id === mess.id ).visible = false
  }

}

export const actions = {

  PUSH_POP_WINDOW ({ commit, state, rootState }, data) {

    commit('PUSH_POP_WINDOW', data)

    // get id last added notification and hide it after 3 sec
    const id = state.popWindows[state.popWindows.length - 1].id
    setTimeout(function() {
      commit('HIDE_MSG', id)
    }.bind(this), 3000)
  },

}
