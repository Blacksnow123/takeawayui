<template>
    <div class="food_container">
        
            <!-- header头部 -->
        <mt-header title="美食">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <!-- 浮动 -->
        <!-- <div > -->
            <mt-navbar v-model="selected" class="header_float">
                <mt-tab-item  id="first" @click.native.prevent="active = 'tab-container1'" >附近商家</mt-tab-item>
                <mt-tab-item  id="second" @click.native.prevent="active = 'tab-container2'" >发现好菜</mt-tab-item>
            </mt-navbar>

            <div class="page-tab-container">
                <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
                    <mt-tab-container-item id="tab-container1">
        	        <!-- cell组件 -->
                        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted scroll_float">
                                <div class="mui-scroll">
                                    <a class="mui-control-item mui-active" @click="getShoplist()">
                                    综合排序
                                    </a>
                                    <a class="mui-control-item" @click="byscore()">
                                    评分最高
                                    </a>
                                    <a class="mui-control-item" @click="byaverage()">
                                    人均最低
                                    </a>
                                    <a class="mui-control-item" @click="bydistance()">
                                    距离最近
                                    </a>
                                </div>
                            </div> 

                            <div class="shop_list">
                            <ul class="mui-table-view">

                                <li class="mui-table-view-cell mui-media" v-for="item in shopList" :key="item.id">
                                <router-link :to="'/main/yamifood/goods/childgood/'+item.shop_num">
                                <img class="mui-media-object mui-pull-left"  :src="item.shop_img">
                                    <div class="mui-media-body">
                                        <h4>{{item.shop_name}}</h4>
                                        <p class="mui-ellipsis">
                                            <span class="sell_count">
                                                <span>
                                                    月售{{item.sell_count}}
                                                    <span>
                                                        <Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                                                        {{item.shop_score}}
                                                    </span>        
                                                </span>
                                                <span>{{item.send_time}}|{{item.distance}}</span></span>
                                            <span>起送{{item.sell_start}}|配送￥{{item.distribution_price}}|人均{{item.average}}</span>
                                        </p>
                                    </div>
                                </router-link>
                                </li>
                            </ul>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="tab-container2">
        	        <!-- 菜品列表 -->
                    <div class="foodListcontainer">
                        <div class="foodlist" v-for="item in foodList" >
                         <div class="mui-card" @click="toshop(item)">
				            <img class="mui-card-header mui-card-media" style='height:40vw;' :src="item.food_img">
				            <div class="mui-card-content">
					            <div class="mui-card-content-inner">
						            <p style="color: #333;" class="title">{{item.food_name}}</p>
                                    <p class="sell_info">
                                        <!-- <span>月售42</span> -->
                                        <!-- <span>35分钟</span>                                        
                                        <span>配送 ￥0</span>                                         -->
                                    </p>
                                    <p class="sell_price">
                                        <span>￥{{item.food_price}}</span>
                                    </p>
					            </div>
				            </div>
			            </div>   
                    </div>
                    </div>
                    
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div> 
    </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.js'

    window.addEventListener('scroll', function(){
        let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
        if(t>0){
            $('.header_float').addClass('header_float-active')
            $('.scroll_float').addClass('scroll_float-active')
        }else{
            $('.header_float').removeClass('header_float-active')
            $('.scroll_float').removeClass('scroll_float-active')
        }
    });

export default {
    data(){
        return {
            selected:'first',
            rate:6.5,
            active:'tab-container1',
            shopList:[],
            foodList:[]
        }
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        this.$ajax.post('allFoods').then((res)=>{
            console.log(res.data.data);
            this.foodList=res.data.data;
        })

    },
    created(){
        this.getShoplist();
    },
    methods:{
        getShoplist(){
            let shop_type=this.$route.params.id;
            console.log(shop_type);
            this.$ajax.post("shopListbyType", { shop_type: shop_type }).then(result => {
            // console.log(result.data.data);
            this.shopList=result.data.data;
             console.log(this.shopList);
            })
            // this.$router.go(0);
        },
        byscore(){
            let shop_type=this.$route.params.id;
            console.log(shop_type);
            this.$ajax.post("shopTypelist", { shop_type: shop_type }).then(result => {
            // console.log(result.data.data);
            this.shopList=result.data.data;
             console.log(this.shopList);
            })
            // this.$router.go(0);
        },
        byaverage(){
            let shop_type=this.$route.params.id;
            console.log(shop_type);
            this.$ajax.post("byAverage", { shop_type: shop_type }).then(result => {
            // console.log(result.data.data);
            this.shopList=result.data.data;
             console.log(this.shopList);
            })
            // this.$router.go(0);
        },
        bydistance(){
            let shop_type=this.$route.params.id;
            console.log(shop_type);
            this.$ajax.post("byDistance", { shop_type: shop_type }).then(result => {
            // console.log(result.data.data);
            this.shopList=result.data.data;
             console.log(this.shopList);
            })
            // this.$router.go(0);
        },
        toshop(item){
            // console.log(item)
            this.$router.push('/main/yamifood/goods/childgood/'+item.shop_num)
        }
    }
}
</script>

<style lang="scss" scoped>
    .sell_count{
            font-size: 12px;
            color: black;
            display: flex;
            justify-content: space-between;   //两端对齐
    }
    .shop_list{
        margin-top:5px;
    }
    //导航菜单浮动前
    .header_float,.scroll_float{
        position: relative;
        width: 100%;
        z-index: 999;
    }
    //浮动后
    .header_float-active{
        position: fixed;
        top: 0;
    }
    .scroll_float-active{
        position: fixed;
        top: 46px;
    }
    .mui-scroll{
        margin-top:3px;
        background-color:#fff;
    }
    .mui-card{
        width: 47%;
        padding: 0;
        margin: 5px;
    }

    .title{
        font-size: 16px;
    }
    .sell_info{
        font-size: 12px;
    }
    .sell_price{
        font-size: 16px;
        color: red;
        .full_pluse{
            color: #FF3366;
            font-size: 12px;
            border: solid;
            border-width: 1px;
        }
    }
    .foodlist{
        display: flex;
        padding: 0;
        flex-wrap: wrap;
        width: 50%;
    }
    *{
        touch-action: pan-y;
    }
    .foodListcontainer{
        display: flex;
        padding: 0;
        flex-wrap: wrap;
        flex-direction: row;
        touch-action: none;
    }
    .mui-card{
        width: 100%;
    }
    .mint-tab-container-item{
        overflow: hidden;
    }
</style>