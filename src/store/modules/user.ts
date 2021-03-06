import { getToken, setToken, removeToken } from '@/util/auth';

const state = {
    token: getToken(),
    username: "",
}

const mutations = {
    SET_TOKEN: (state: any, token: any) => {
        state.token = token
    },
    // SET_NAME: (state, name) => {
    //     state.name = name
    // },
    // SET_AVATAR: (state, avatar) => {
    //     state.avatar = avatar
    // }
}

const actions = {
    login({ commit }: any, userInfo: any) {
        const { username, password } = userInfo

        commit('SET_TOKEN', 'ssss')
    },
    // user login
    // login({ commit }, userInfo) {
    //     const { username, password } = userInfo
    //     return new Promise((resolve, reject) => {
    //         login({ username: username.trim(), password: password }).then(response => {
    //             const { data } = response
    //             commit('SET_TOKEN', data.token)
    //             setToken(data.token)
    //             resolve()
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    // // get user info
    // getInfo({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         getInfo(state.token).then(response => {
    //             const { data } = response
    //             if (!data) {
    //                 reject('Verification failed, please Login again.')
    //             }

    //             const { name, avatar } = data

    //             commit('SET_NAME', name)
    //             commit('SET_AVATAR', avatar)
    //             resolve(data)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    // // user logout
    // logout({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         logout(state.token).then(() => {
    //             commit('SET_TOKEN', '')
    //             removeToken()
    //             resetRouter()
    //             resolve()
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    // // remove token
    // resetToken({ commit }) {
    //     return new Promise(resolve => {
    //         commit('SET_TOKEN', '')
    //         removeToken()
    //         resolve()
    //     })
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
