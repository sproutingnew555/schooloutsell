export default {
    state:{
        user: {
            info: {}, //user的信息
            status: false}
    },
    mutations:{
        //初始化user的方法
        initUser(state){
            if (Object.keys(state.user).length > 0){
                state.user = JSON.parse(window.localStorage.getItem("user"))
            }
        },
        setUser(state,info){
            state.user.info = info
            state.user.status = true
            window.localStorage.setItem("user",JSON.stringify(state.user))
        }
    }
}