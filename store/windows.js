export const state = () => ({
  popWindows: [],
})

export const getters = {
}

export const mutations = {

  PUSH_POP_WINDOW: (state, newWindow) => state.popWindows.unshift(newWindow),

  HIDE_MSG: (state, id) => {
    state.popWindows.find( mess => id === mess.id ).visible = false
  }

}

export const actions = {

  PUSH_POP_WINDOW ({ commit, state, rootState }, { message, who, action, type }) {

    const id = Math.random().toString()

    const msg = message || who && (action === 'messages' ?
      `${who.fname} ${who.lname} send you message` :
      `${who.fname} ${who.lname} ${action} you`)

    const newWindow = {
      msg,
      id,
      action: action || type,
      visible: true,
    }

    if (msg) {

      commit('PUSH_POP_WINDOW', newWindow)
  
      // hide added notification after 3 sec
      setTimeout(function() {
        commit('HIDE_MSG', id)
      }.bind(this), 3000)

    }

  },

}
