export default {
    state:{
        knight: {
            info: {}, //knight的信息
            status: false}
    },
    mutations:{
        //初始化knight的方法
        initKnight(state){
            if (Object.keys(state.knight).length > 0){
                state.knight = JSON.parse(window.localStorage.getItem("knight"))
            }
        },
        setKnight(state,info){
            state.knight.info = info
            state.knight.status = true
            window.localStorage.setItem("knight",JSON.stringify(state.knight))
        }
    }
}