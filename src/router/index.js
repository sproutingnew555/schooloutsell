import Vue from "vue"
import VueRouter from 'vue-router'
import KnightMain from '../views/knight/Main.vue'
import KnightHome from '../views/knight/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/knight',
        component: KnightMain,
        children:[
            {path: 'home', component: KnightHome}
        ]
    },
]
const router = new VueRouter({
    routes
})

export default router
