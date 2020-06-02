<template>
  <!-- 首页 -->
  <div>
    <mt-header title="外卖系统"></mt-header>
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#tabbar">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">外卖</span>
      </a>
      <div class="mui-tab-item" @click="order()">
        <span class="mui-icon mui-icon-email"></span>
        <span class="mui-tab-label">订单</span>
      </div>

      <div class="mui-tab-item" @click="search()">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">发现</span>
      </div>
      <div class="mui-tab-item" @click="mine()">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">我的</span>
      </div>
    </nav>
    <div class="mui-content">
      <div id="tabbar" class="mui-control-content mui-active">
        <!-- 九宫格 -->
        <div class="square">
          <div class="square-inner grid">
            <div class="box" @click="yamifood()">
              <img src="/static/images/yami.png" alt />
              <br />美食
            </div>
            <div class="box" @click="shop()">
              <img src="/static/images/shop.png" alt />
              <br />美团超市
            </div>
            <div class="box" @click="fruit()">
              <img src="/static/images/vegetable.png" alt />
              <br />生鲜果蔬
            </div>
            <div class="box" @click="water()">
              <img src="/static/images/sweet.png" alt />
              <br />甜点饮品
            </div>
            <div class="box" @click="food()">
              <img src="/static/images/food.png" alt />
              <br />正餐优选
            </div>
            <div class="box" @click="send()">
              <img src="/static/images/send.png" alt />
              <br />美团专送
            </div>
            <div class="box" @click="west()">
              <img src="/static/images/west.png" alt />
              <br />能量西餐
            </div>
            <div class="box" @click="taste()">
              <img src="/static/images/eat.png" alt />
              <br />精品小吃
            </div>
          </div>
        </div>

        <!-- 中部列表 -->
        <div>
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in shopLists" :key="item.id">
              <router-link :to="'/main/yamifood/goods/childgood/'+item.shop_num">
                <img class="mui-media-object mui-pull-left" :src="item.shop_img" />
                <div class="mui-media-body">
                  <h4>{{item.shop_name}}</h4>
                  <p class="mui-ellipsis">
                    <span class="sell_count">
                      <span>月售{{item.sell_count||234}}</span>
                      <span>{{item.send_time}}|{{item.distance}}</span>
                    </span>
                    <span>起送￥{{item.sell_start}}|配送￥{{item.distribution_price}}|人均￥{{item.average}}</span>
                  </p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import mui from "../../../lib/mui/js/mui.js";
import order from "../order/order.vue";
export default {
  data() {
    return {
      shopLists: [],
      totalCount: []
    };
  },
  created() {
    this.shopList();
  },
  components: {
    order
  },
  mounted() {
    mui.init({
      swipeBack: true //启用右滑关闭功能
    });
  },
  methods: {
    order() {
      this.$router.push({ path: "/order" });
    },
    search() {
      this.$router.push({ path: "/search" });
      // return;
    },
    mine() {
      this.$router.push({ path: "/mine" });
    },
    shopList() {
      this.$ajax.post("shopList").then(result => {
        console.log(result.data.data);
        this.shopLists = result.data.data;
        console.log(this.shopLists);
      });
    },

    yamifood() {
      this.$router.push("/main/yamifood/1");
    },
    shop() {
      this.$router.push("/main/yamifood/2");
    },
    fruit() {
      this.$router.push("/main/yamifood/3");
    },
    water() {
      this.$router.push("/main/yamifood/4");
    },
    food() {
      this.$router.push("/main/yamifood/5");
    },
    send() {
      this.$router.push("/main/yamifood/6");
    },
    west() {
      this.$router.push("/main/yamifood/7");
    },
    taste() {
      this.$router.push("/main/yamifood/8");
    }
  },
  components: {}
};
</script>


<style lang="scss" scoped>
.tabber {
  text-align: center;
  font-size: 12px;
}
.mui-content {
  background-color: #fff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 相当于 1fr 1fr 1fr 1fr */
  grid-template-rows: repeat(2, 1fr); /* fr单位可以将容器分为几等份 */
  grid-gap: 1%; /* grid-column-gap 和 grid-row-gap的简写 */
  grid-auto-flow: row;
}
.grid > div {
  color: black;
  font-size: 14px;
  line-height: 2;
  text-align: center;
}
.square {
  background-color: #fff;
}
.box {
  margin-top: 10px;
}
.sell_count {
  font-size: 12px;
  color: black;
  display: flex;
  justify-content: space-between; //两端对齐
}
.mui-page {
  background-color: #f6f6f8;
}
*{
        touch-action: pan-y;
    }
</style>