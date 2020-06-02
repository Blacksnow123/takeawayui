<template>
  <div class="ConfirmOrder">
    <mt-header title="订单确认">
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>

    <!-- 选择地址 -->
    <div class="selectaddress">
        <div class="address-left" @click="location()">请选择一个收货地址</div>
    </div>

    
    <div class="blank"></div>

    <!-- 购物车内容 -->
    <div class="fooddetails">
        <div class="foodName">{{this.shopInfo.shop_name}}</div>
        <ul v-for="item in selectedFoods" :key="item.food_id"  class="food_details">
            <li>
                <span class="foodinfo">{{item.food_name}}</span>
                <p class="foodinfo right" >
                    <span class="count">*{{item.count}}</span>
                    <span>￥{{item.food_price}}</span>
                    
                </p>
                
            </li>
        </ul>
        <div class="send_price">
            <span>配送费：</span>
            <span>￥{{this.shopInfo.distribution_price}}</span>
        </div>
        <div class="total_price">
            <span class="order">订单￥{{totalPrice}}</span>
            <span>待支付￥{{totalPrice}}</span>
        </div>
    </div>

    <div class="blank"></div>

    <!-- 备注信息 -->
    <div class="extraInfo">
      <router-link  to="/mian/yamifood/goods/confirmorder/remark">
        <span class="title">订单备注：</span>
        <div class="more_type">
          <span>{{this.extraInfo||"口味、偏好等"}}</span>
          <span class="mui-icon mui-icon-arrowright"></span>
        </div>
      </router-link>
    </div>
    <hr>

    <div class="bottom-blank"></div>

    <!-- 底部栏 -->
    <div class="tabber">
        <button type="button" data-loading-text="支付中" class="mui-btn payfor" @click="payfor()">确认支付</button>
    </div>

    <password ref="password" :show="show" @close="close"></password>


  </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.js'
import password from './paypassword.vue'
import BMap from 'BMap'
export default {
  data() {
    return {
        selectedFoods:[],
        shopInfo:[],
        extraInfo:[],
        show:false,
        mylocation:''
    };
  },
  created(){
      this.getFoods();
      this.extraInfo=this.$store.getters.getExtrainfo;
      this.mylocation=this.$store.getters.getlocationInfo;
  },
  mounted(){

  },
  components:{
    password
  },
  methods: {
    location(){
      this.$router.push('/location')
    },
    close(){
      this.show=false;
    },
    payfor(){
      this.show=true;
    },
    goback() {
      this.$router.go(-1);
    },
    getFoods(){
      // this.selectedFoods = this.$route.params.selectFoods;
      this.selectedFoods = this.$store.getters.getSelectFoods;
      let shop_num=this.$store.getters.getVal;
      console.log(this.selectedFoods);
      this.$ajax.post("shopInfo", { shop_num: shop_num }).then(result => {
        // console.log(result.data.data);
        this.shopInfo=result.data.data[0];
        //  console.log(this.shopInfo);
      })
    }
  },
  computed: {
      totalPrice(){
        //   console.log(this.shopInfo.distribution_price)
          let price =parseInt(this.shopInfo.distribution_price);
          this.selectedFoods.forEach((food)=>{
              price+=food.count*food.food_price;
          })

          this.$store.commit('setTotalPrice',price)
        return price;
      }
  },
};
</script>

<style lang="scss" scoped>

.address-left{
    flex: 1;
    background: url(/static/images/address.png) no-repeat left center;
    padding-left: 26px;
    padding-right: 31px;
    background-size: 14px 16px;
    font-size: 18px;
    line-height: 19px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.fooddetails{
    font-size: 16px;
    border:1px dashed;
    border-color: blue rgb(25%,35%,45%) #909090 red;
}
.foodinfo{
    display: inline;
}
.foodName{
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 10px;
    font-weight: bold;
}
.count{
    color: red;
    margin-right: 10px;
}
.right{
    margin-left: 200px;
}
.food_details{
    padding: 0;
    margin-left: 20px;
    list-style:none;
}
.total_price{
    margin-top: 10px;
}
.order{

    margin-right: 180px;
}
.tabber{
  font-size: 20px;
  display: flex;
	position: fixed;
  justify-content: center;
	left: 0;
	bottom: 0;
  align-items: center;
	box-sizing: border-box;
	width: 100%;
}
.blank{
    width: 100%;
    height: 10px;
    background: #F4F4F4;
}
// .bottom-blank{
//     width: 100%;
//     height: 60px;
//     background: #F4F4F4;
// }
  
.extraInfo{
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  .title{
    color: black;
  }
  .more_type{
    width: 10rem;
    display: inline-block;
    text-align: right;
    vertical-align: middle;
    color: gray;
    margin-left: 100px;
  }
}
hr{
  background:#e5e5e5;
  height: 1px;
  border: none;
}
.payfor{
  width: 100%;
  height: 40px;
  background-color: rgb(1, 159, 215);
}
</style>
