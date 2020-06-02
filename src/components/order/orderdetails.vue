<template>
  <div class="detailsContainer">
    <mt-header title="订单详情">
        <div @click="goback" slot="left">
            <mt-button icon="back">返回</mt-button>
        </div>
    </mt-header>

    <div class="fooddetails">
      <div class="foodName">{{this.foods.shop_name}}</div>
      <ul v-for="item in foodList" :key="item.food_id" class="food_details">
        <li>
          <span class="foodinfo">{{item.food_name}}</span>
          <p class="foodinfo right">
            <span class="count">*{{item.count}}</span>
            <span>￥{{item.food_price}}</span>
          </p>
        </li>
      </ul>
      <div class="send_price">
            <span>配送费：</span>
            <span>￥{{sendprice}}</span>
        </div>
      <div class="total_price">
        <span>实际支付￥{{this.total}}</span>
      </div>
    </div>

    <div class="blank"></div>

    <div class="extraInfo">
        <span class="title">备注信息</span><br>
        <span>{{this.foods.extra_info}}</span>
    </div>

    <div class="blank"></div>

    <div class="orderinfo">
        <span>订单信息</span>
        <p>订单号码：{{this.foods.order_id}}</p>
        <p>送货地址：{{this.foods.location}}</p>
    </div>

    <div class="blank"></div>

    <div class="again">
        <mt-button type="primary" class="mt_btn" @click="again()">再来一单</mt-button>
        <mt-button type="primary" class="mt_btn" @click="mycomment()" v-if="this.comment_show=='0'">评论</mt-button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
        foods:[],
        foodList:[],
        total:[],
        shop_num:[],
        comment_show:''
    };
  },
  created(){
    this.foods=eval(this.$route.params.foods);
    this.foodList=eval(this.foods.food_info)
    this.total=this.$route.params.total;
    this.comment_show=this.foods.confirm_state;
    console.log(this.comment_show);
    this.getshopnum();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getshopnum(){
      this.shop_num=eval(this.foodList[0]).shop_num;
    },
    again(){
        this.$router.push({path:'/main/yamifood/goods/childgood/'+this.shop_num});
    },
    mycomment(){
      this.$router.push('/rating/'+this.shop_num);
    }
  },
  computed:{
      sendprice(){
        let sendprice=0;
        this.foodList.forEach((food)=>{
            sendprice+=food.count*food.food_price;
        })
        return this.total-sendprice
        // console.log(sendprice);
    }
  }
};
</script>

<style lang="scss" scoped>

.fooddetails{
    margin-top: 10px;
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
    color: brown;
}
.blank{
    width: 100%;
    height: 10px;
    background: #F4F4F4;
}
.extraInfo{
    margin-top: 10px;
}
.title{
    font-size: 16px;
    
}
.again{
    text-align: center;
}
.mt_btn{
  width: 135px;
  height: 35px;
}
</style>