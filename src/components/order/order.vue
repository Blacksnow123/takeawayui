<template>
  <div class="orderContainer">
    <mt-header title="订单列表">
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>

    <nav class="mui-bar mui-bar-tab">
			<div class="mui-tab-item " @click="main()">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">外卖</span>
			</div>
				<div class="mui-tab-item mui-active" @click="myorder()">
					<span class="mui-icon mui-icon-email"></span>
					<span class="mui-tab-label">订单</span>
				</div >
			
			<div class="mui-tab-item" @click="search()">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">发现</span>
			</div>
			<div class="mui-tab-item" @click="mine()">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">我的</span>
			</div>
		</nav>

    <!-- 订单列表 -->
    <div class="orderList">
        <ul class="mui-table-view" v-for="item,index in order" :key="item.order_id">
				<li class="mui-table-view-cell mui-media">
					<div  @click="orderDetails(index)">
						<img class="mui-media-object mui-pull-left" :src="item.shop_img">
						<div class="mui-media-body">
							{{item.shop_name}}           
              <span class="pay_state">
                {{item.pay_state==='0'?'支付成功':'支付失败'}}    
                {{item.accept_state==='1'?'已接单':'等待接单'}}
                {{item.confirm_state==='0'?'确认收货':'未确认'}}
              </span>
							<p class='mui-ellipsis'>{{item.order_time}}</p>
                            <hr>
                            <p class='mui-ellipsis  details'>{{goodCount(index)}}件商品   
                                <span class="totalPrice"> ￥{{item.total_price}}</span>
                            </p>
                            <hr>
                            <p class='mui-ellipsis'>
                               <mt-button type="primary" class="mt_btn" @click.stop="again(index)">再来一单</mt-button>
                               <mt-button type="primary" class="mt_btn" v-show="item.confirm_state=='1'" @click.stop="confirm(index)">确认收货</mt-button>
                            </p>
						</div>
					</div>
				</li>
			</ul>
    </div>
  </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.js'
export default {
  data() {
    return {
      orderInfo:[],
      order:[],
      foodList:[],
      count:[],
      show:false,
    };
  },
  created(){
    this.getOrders();
  },
  components:{
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    orderDetails(index){
      let foods=eval(this.foodList[index]);
      let total=eval(this.foodList[index]).total_price;
      this.$router.push({name:'orderdetails', params: {foods:foods,total:total}})
      // console.log(total);
    },
    main(){
      this.$router.push({path:'/main'})
    },
    myorder(){
      // this.$router.push({path:'/order'});
      return;
    },
    search(){
        this.$router.push({path:'/search'});
        // return;
    },
    mine(){
      this.$router.push({path:'/mine'});
	  },
    getOrders(){
      let user=this.$store.getters.getUser;
      this.$ajax.post("allOrders", {user_name:user}).then(result => {
        console.log(result.data.data);
        this.order=result.data.data;
        this.foodList=eval(result.data.data);
        // console.log(eval(this.foodList[0].food_info).length);
      })
    },
    again(index){
      let shopNum=eval(this.foodList[index].food_info)[0].shop_num;
      this.$router.push({path:'/main/yamifood/goods/childgood/'+shopNum});
    },
    confirm(index){
      if(this.foodList[index].accept_state==1){
        let order_id=eval(this.foodList[index].order_id)
        this.$ajax.post('updateOrder',{order_id:order_id}).then((res)=>{
        // console.log(res.data.data);
        })
      // console.log(order_id)
        this.$router.go(0);
        mui.toast('确认收货成功',{ duration:'short', type:'div' }) 
      }else{
        mui.toast('商家未接单，确认收货失败',{ duration:'short', type:'div' }) 
      }
    },
  },
  computed:{
    goodCount(){
      return function(index){
        // this.foodList=eval(this.order);
        // console.log(this.foodList);
        // console.log(index);
        let a =(eval(this.foodList[index].food_info).length);
        return a;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
hr{
  background:#e5e5e5;
  height: 1px;
  border: none;
  margin-top: 5px;
  margin-bottom: 5px;
}
.totalPrice{
    font-size: 16px;
    color: lightcoral;
}
.details{
    display: flex;
    justify-content: space-between;
}
.mt_btn{
    font-size: 14px;
    height: 25px;
    width: 80px;
    float:right;
}
.pay_state{
  margin-left: 60px;
}
.orderList{
  margin-bottom: 50px;
}
*{
        touch-action: pan-y;
    }
</style>