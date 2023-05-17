export default {
    state:{
        shop: {
            info: {}, //shop的信息
            status: false}
    },
    mutations:{
        //初始化shop的方法
        initShop(state){
            if (Object.keys(state.shop).length > 0){
                state.shop = JSON.parse(window.localStorage.getItem("shop"))
            }
        },
        setShop(state,info){
            state.shop.info = info
            state.shop.status = true
            window.localStorage.setItem("shop",JSON.stringify(state.shop))
        }
    }
}