<template>
  <div class="seller" ref="sellerView">
    <goods></goods>
    <div class="seller-wrapper">
      <div class="seller-view">
        <div class="address-wrapper">
          <div class="address-left">
            {{this.shopInfo.shop_place}}
          </div>
          <div class="address-right">
            <div class="content"></div>
          </div>
        </div>
        <button @storage=""></button>
        <!-- <div class="pics-wrapper" v-if="seller.poi_env" ref="picsView">
          <ul class="pics-list" ref="picsList">
            <li
              ref="picsItem"
              class="pics-item"
              v-for="(imgurl,index) in seller.poi_env.thumbnails_url_list"
              :key="index"
            >
              <img :src="imgurl">
            </li>
          </ul>
        </div> -->
      </div>
      <div class="tip-wrapper">
        <div class="delivery-wrapper">
          配送服务: {{this.shopInfo.send_service}}
        </div>

        <!-- <div class="shipping-wrapper">
          配送时间: {{seller.shipping_time}}
        </div> -->
      </div>

      <!-- <Split></Split> -->
      <!-- <div class="other-wrapper">
        <div class="server-wrapper">
          商家服务
          <div
            class="poi-server"
            v-for="(item,index) in seller.poi_service"
            :key="index"
          >
            <img :src="item.icon"> {{item.content}}
          </div>
        </div>
        <div class="discounts-wrapper">
          <div
            class="discounts-item"
            v-for="(item,index) in seller.discounts2"
            :key="index"
          >
            <div class="icon">
              <img :src="item.icon_url">
            </div>
            <div class="text">
              {{item.info}}
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import goods from '../headerIcons/goods.vue'
  export default {
    data() {
      return {
        seller: {},
        shop_num:[],
        shopInfo:[]
      }
    },
    mounted() {
      this.getShopnum();
      // this.getShopinfo();
    },
    components: {
      goods,
    },
    methods:{
      getShopnum(){
         this.shop_num=this.$store.getters.getVal;
        //  console.log(this.$store.getters.getVal);
         // console.log(this.shop_num);
        this.$ajax.post("shopInfo", { shop_num: this.shop_num }).then(result => {
        console.log(result.data.data);
        this.shopInfo=result.data.data[0];
      })
      },
      getShopinfo(){
       
    }
  }
}
</script>

<style scoped>
  .seller {
    position: absolute;
    left: 0;
    /* top: 191px; */
    /* bottom: 0px;  */
    width: 100%;
    background: #F4F4F4;
    overflow: hidden;
  }

  .seller .seller-wrapper {
    background: white;
  }

  .seller .seller-wrapper .seller-view {
    padding-left: 15px;
  }

  .seller .seller-wrapper .seller-view .address-wrapper {
    display: flex;
    padding: 16px 0;
    border-bottom: 1px solid #F4F4F4;
  }

  .seller .seller-wrapper .seller-view .address-wrapper .address-left {
    flex: 1;
    background: url(/static/images/address.png) no-repeat left center;
    padding-left: 26px;
    padding-right: 31px;
    background-size: 14px 16px;
    font-size: 14px;
    line-height: 19px;
  }

  .seller .seller-wrapper .seller-view .address-wrapper .address-right {
    flex: 0 0 60px;
    background: url(/static/images/line.png) no-repeat left center;
    background-size: 1px 15px;
  }

  .seller .seller-wrapper .seller-view .address-wrapper .address-right .content {
    width: 100%;
    height: 100%;
    background: url(/static/images/phone.png) no-repeat center center;
    background-size: 18px 18px;
  }

  .seller .seller-wrapper .seller-view .pics-wrapper {
    padding: 10px 0;
    overflow: hidden;
    border-bottom: 1px solid #F4F4F4;
    white-space: nowrap;
  }

  .seller .seller-wrapper .seller-view .pics-wrapper .pics-list {
  }

  .seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item {
    display: inline-block;
    margin-right: 11px;
    width: 93px;
    height: 75px;
  }

  .seller .seller-wrapper .seller-view .pics-wrapper .pics-list .pics-item img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  .seller .seller-wrapper .seller-view .safety-wrapper {
    padding: 15px 14px 15px 25px;
    background: url(/static/images/safety.png) no-repeat left center;
    background-size: 14px 16px;
    font-size: 14px;
  }

  .seller .seller-wrapper .seller-view .safety-wrapper span {
    float: right;
    font-size: 14px;
  }

  .seller .seller-wrapper .tip-wrapper {
    padding-left: 15px;
  }

  .seller .seller-wrapper .tip-wrapper .delivery-wrapper {
    background: url(/static/images/delivery.png) no-repeat left center;
    background-size: 14px 16px;
    padding: 15px 0 15px 25px;
    font-size: 14px;
    border-bottom: 1px solid #F4F4F4;
  }

  .seller .seller-wrapper .tip-wrapper .shipping-wrapper {
    background: url(/static/images/time.png) no-repeat left center;
    padding: 15px 17px 15px 25px;
    background-size: 15px 15px;
    font-size: 14px;
    line-height: 18px;
  }

  .seller .seller-wrapper .other-wrapper {
    padding-left: 15px;
  }

  .seller .seller-wrapper .other-wrapper .server-wrapper {
    background: url(/static/images/server.png) no-repeat left center;
    background-size: 15px 15px;
    padding: 15px 0 17px 25px;
    font-size: 14px;
    border-bottom: 1px solid #F4F4F4;
  }

  .seller .seller-wrapper .other-wrapper .server-wrapper .poi-server {
    display: inline-block;
    margin-left: 17px;
  }

  .seller .seller-wrapper .other-wrapper .server-wrapper .poi-server img {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    vertical-align: middle;
  }

  .seller .seller-wrapper .other-wrapper .discounts-wrapper {
    padding: 17px 24px 19px 0;
  }

  .seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item {
    display: flex;
  }

  .seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item .icon {
    flex: 0 0 25px;
  }

  .seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item .icon img {
    width: 15px;
    height: 15px;
  }

  .seller .seller-wrapper .other-wrapper .discounts-wrapper .discounts-item .text {
    flex: 1;
    font-size: 14px;
  }
</style>


