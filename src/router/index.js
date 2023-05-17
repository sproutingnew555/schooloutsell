import Vue from "vue"
import VueRouter from 'vue-router'

//PC
//Common
import PCHome from '../views/pc/Home.vue'
import PCLogin from '../views/pc/Login.vue'
import PCRegister from '../views/pc/Register.vue'
//Admin
import AdminMain from '../views/pc/admin/Main.vue'
import AdminHome from '../views/pc/admin/Home.vue'
import AdminUser from '../views/pc/admin/User.vue'
import AdminCanteen from '../views/pc/admin/Canteen.vue'
import AdminShop from '../views/pc/admin/Shop.vue'
import AdminKnight from '../views/pc/admin/Knight.vue'
import AdminOrder from '../views/pc/admin/Order.vue'
//Shop
import ShopMain from '../views/pc/shop/Main.vue'
import ShopHome from '../views/pc/shop/Home.vue'
import ShopMsg from '../views/pc/shop/Msg.vue'
import ShopCategory from '../views/pc/shop/Category.vue'
import ShopDish from '../views/pc/shop/Dish.vue'
import ShopOrder from '../views/pc/shop/Order.vue'
//User
import PCUserMain from '../views/pc/user/Main.vue'
import PCUserHome from '../views/pc/user/Home.vue'
import PCUserMsg from '../views/pc/user/Msg.vue'
import PCUserOrder from '../views/pc/user/Order.vue'
import PCUserShop from '../views/pc/user/Shop.vue'
import PCUserShopDish from '../views/pc/user/Dish.vue'
import PCUserShopCar from '../views/pc/user/ShopCar.vue'
import PCUserAddress from '../views/pc/user/Address.vue'
//----------------
//MOBILE
//Common
import MOBILEHome from '../views/mobile/Home.vue'
import MOBILELogin from '../views/mobile/Login.vue'
import MOBILERegister from '../views/mobile/Register.vue'
//Knight
import KnightMain from '../views/mobile/knight/Main.vue'
import KnightHome from '../views/mobile/knight/Home.vue'
import KnightMsg from '../views/mobile/knight/Msg.vue'
import KnightOrder from '../views/mobile/knight/Order.vue'
//User
import MOBILEUserMain from '../views/mobile/user/Main.vue'
import MOBILEUserHome from '../views/mobile/user/Home.vue'
import MOBILEUserMsg from '../views/mobile/user/Msg.vue'
import MOBILEUserOrder from '../views/mobile/user/Order.vue'
import MOBILEUserShop from '../views/mobile/user/Shop.vue'
import MOBILEUserShopDish from '../views/mobile/user/Dish.vue'
import MOBILEUserShopCar from '../views/mobile/user/ShopCar.vue'
import MOBILEUserAddress from '../views/mobile/user/Address.vue'


// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
//  call || apply区别
//  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//  不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
}

VueRouter.prototype.replace = function (location, resole, reject) {
    if (resole && reject) {
        originReplace.call(this, location, resole, reject);
    } else {
        originReplace.call(this, location, () => {
        }, () => {
        })
    }
}



Vue.use(VueRouter)

const routes = [
    //PC端
    {
        path: '/pc',
        redirect: '/pc/home'
    },
    {
        path: '/pc/home',
        component: PCHome
    },
    {
        path: '/pc/login',
        component: PCLogin
    },
    {
        path: '/pc/register',
        component: PCRegister
    },
    {
        path: '/pc/admin',
        component: AdminMain,
        redirect: '/pc/admin/home',//重定向
        children:[
            {path: 'home', component: AdminHome},//首页
            {path: 'user', component: AdminUser},//个人信息
            {path: 'canteen', component: AdminCanteen},//个人信息
            {path: 'shop', component: AdminShop},//个人信息
            {path: 'knight', component: AdminKnight},//个人信息
            {path: 'order', component: AdminOrder},//订单信息
        ]
    },
    {
        path: '/pc/shop',
        component: ShopMain,
        redirect: '/pc/shop/home',//重定向
        children:[
            {path: 'home', component: ShopHome},//首页
            {path: 'msg', component: ShopMsg},//个人信息
            {path: 'category', component: ShopCategory},//分类信息
            {path: 'dish', component: ShopDish},//菜品信息
            {path: 'order', component: ShopOrder},//订单信息
        ]
    },
    {
        path: '/pc/user',
        component: PCUserMain,
        redirect: '/pc/user/home',//重定向
        children: [
            {path: 'home', component: PCUserHome},//首页
            {path: 'msg', component: PCUserMsg},//个人信息
            {path: 'order', component: PCUserOrder},//订单信息
            {path: 'shop', component: PCUserShop,},//商家信息
            {path: 'shop/dish',component:PCUserShopDish},//菜单信息
            {path: 'shopCar',component:PCUserShopCar},//购物车信息
            {path: 'address',component:PCUserAddress},//地址信息
        ]
    },
    //移动端
    {
        path: '/mobile',
        redirect: '/mobile/home'
    },
    {
        path: '/mobile/home',
        component: MOBILEHome
    },
    {
        path: '/mobile/login',
        component: MOBILELogin
    },
    {
        path: '/mobile/register',
        component: MOBILERegister
    },
    {
        path: '/mobile/knight',
        component: KnightMain,
        redirect: '/mobile/knight/home',//重定向
        children: [
            {path: 'home',component: KnightHome},
            {path: 'msg',component: KnightMsg},
            {path: 'order',component: KnightOrder},
        ]
    },
    {
        path: '/mobile/user',
        component: MOBILEUserMain,
        redirect: '/mobile/user/home',//重定向
        children: [
            {path: 'home', component: MOBILEUserHome},//首页
            {path: 'msg', component: MOBILEUserMsg},//个人信息
            {path: 'order', component: MOBILEUserOrder},//订单信息
            {path: 'shop', component: MOBILEUserShop,},//商家信息
            {path: 'shop/dish',component:MOBILEUserShopDish},//菜单信息
            {path: 'shopCar',component:MOBILEUserShopCar},//购物车信息
            {path: 'address',component:MOBILEUserAddress},//地址信息
        ]
    },
]
const router = new VueRouter({
    routes
})

export default router
