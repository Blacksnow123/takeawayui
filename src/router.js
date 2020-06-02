import VueRouter from 'vue-router'

import home from '../app.vue'
import login from './login.vue'
import register from './register.vue'

import main from './components/main/main.vue'
import yamifood from './components/headerIcons/yamifood.vue'
import goods from './components/headerIcons/goods.vue'
import gooddetails from './components/headerIcons/gooddetails.vue'
import childgood from './components/children/childgood.vue'
import contact from './components/children/contact.vue'
import seller from './components/children/seller.vue'
import confirmorder from './components/headerIcons/ConfirmOrder.vue'
import remark from './components/headerIcons/remark.vue'
import order from './components/order/order.vue'
import search from './components/search/search.vue'
import mine from './components/mine/mine.vue'
import paypassword from './components/headerIcons/paypassword.vue'
import orderdetails from './components/order/orderdetails.vue'
import location from './components/location/location.vue'
import reset from './reset.vue'

import rating from './components/comments/shopcomment.vue'

var router=new VueRouter({

    routes:[
        {path:'/',redirect:'/login'},      //路由重定向
        {path:'/home',component:home},
        {path:'/login',component:login,name:'login'},
        {path:'/register',component:register},
        {path:'/main',component:main,name:"main"},
        {path:'/main/yamifood/:id',component:yamifood,name:'yamifood'},
        {path:'/main/yamifood/goods',component:goods,name:'goods'},
        {path:'/main/yamifood/goods/gooddetails',component:gooddetails,name:'gooddetails'},
        //店铺路由
        {path:'/main/yamifood/goods/childgood/:shop_num',component:childgood,name:'childgood'},
        {path:'/main/yamifood/goods/contact',component:contact,name:'contact'},
        {path:'/main/yamifood/goods/seller',component:seller,name:'seller'},
        //确认订单
        {path:'/mian/yamifood/goods/confirmorder',component:confirmorder,name:'confirmorder'},
        {path:'/mian/yamifood/goods/confirmorder/remark',component:remark,name:'remark'},
        //订单列表
        {path:'/order',component:order,name:'order'},
        {path:'/mian/yamifood/goods/confirmorder/paypassword',component:paypassword,name:'paypassword'},
        {path:'/order/orderdetails',component:orderdetails,name:'orderdetails'},
        //发现location
        {path:'/search',component:search,name:'search'},
        //我的
        {path:'/mine',component:mine,name:'mine'},
        {path:'/reset',component:reset,name:'reset'},

        //定位
        {path:'/location',component:location,name:'location'},

        {path:'/rating/:shop_num',component:rating,name:'rating'},
    ],
})
//暴露路由对象
export default router