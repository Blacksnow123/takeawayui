import Vue from 'vue'
//组件
import home from '../app.vue'
//登录组件
import login from './login.vue'
//路由
//导入路由模块
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

import 'vue-search-bar/dist/vue-search-bar.min.css';

import { SearchBar } from 'vue-search-bar';

Vue.use(SearchBar);


//导入iview模块
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI)

// //导入jsonp
// import vueJsonp from 'vue-jsonp'
// Vue.use(vueJsonp)

// //引入百度地图
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   /* 申请的百度密钥，可以在百度地图官网申请 */
//   ak: 'XldEBoZBKgfVVcKGzmWSrQql0vVZnTOG'
// })

import bootstrap from 'bootstrap'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'

import router from './router.js';

import axios from 'axios'; //导入axios
axios.defaults.baseURL = 'http://localhost:8080/';  //配置根域名
// axios.create({
    
//     baseURL: 'http://localhost:8080/'
// });
// axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$ajax = axios;  //把axios挂载到Vue的原型上


// // http request拦截器 添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     //window.localStorage.getItem("accessToken") 获取token的value
//     let token = window.localStorage.getItem("accessToken")
//     if (token) {
//         //将token放到请求头发送给服务器,将tokenkey放在请求头中
//         config.headers.accessToken = token;
//         //也可以这种写法
//         // config.headers['accessToken'] = Token;
//         return config;
//     }
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

//导入jquery
import $ from 'jquery'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate"
// import VuexAlong from 'vuex-along'
// var car =JSON.parse(localStorage.getItem('car')||'[]')

var store= new Vuex.Store({
    state:{//this.$store.state.***
        user:[],
        shop_num:"",
        goods:[],
        shopInfo:[],
        comments:[],
        selectFoods:[],
        extraInfo:[],
        totalPrice:[],
        locationInfo:[]
    },
    mutations:{//this.$store.commit('方法名',参数)
        setVal(state,newVal){
            state.shop_num=newVal;
        },
        setGoods(state,newVal){
            state.goods=newVal;
        },
        setShopInfo(state,newVal){
            state.goods=newVal;
        },
        setComments(state,newVal){
            state.goods=newVal;
        },
        setSelectFoods(state,newVal){
            state.selectFoods=newVal;
        },
        setExtrainfo(state,newVal){
            state.extraInfo=newVal;
        },
        setTotalPrice(state,newVal){
            state.totalPrice=newVal;
        },
        setlocationInfo(state,newval){
            state.locationInfo=newval;
        },
        setUser(state,newval){
            state.user=newval;
        }
    },
    getters:{//this.$store.getters.***
        getVal(state){
            return state.shop_num;
        },
        getGoods(state){
            return state.goods;
        },
        getshopInfo(state){
            return state.shopInfo;
        },
        getComments(state){
            return state.comments;
        },
        getSelectFoods(state){
            return state.selectFoods;
        },
        getExtrainfo(state){
            return state.extraInfo;
        },
        getTotalPrice(state){
            return state.totalPrice;
        },
        getlocationInfo(state){
            return state.locationInfo;
        },
        getUser(state){
            return state.user;
        }

    },
    // plugins: [VuexAlong]
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})


var vm = new Vue({
    el: '#aaa',
    data: {},
    methods: {},
    render: function (CreateElements) {
        return CreateElements(home)
    },
    router,
    store
})