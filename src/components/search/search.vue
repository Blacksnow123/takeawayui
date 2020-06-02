<template>
  <div class="searchContainer">
    <nav class="mui-bar mui-bar-tab">
      <div class="mui-tab-item" @click="main()">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">外卖</span>
      </div>
      <div class="mui-tab-item" @click="order()">
        <span class="mui-icon mui-icon-email"></span>
        <span class="mui-tab-label">订单</span>
      </div>

      <div class="mui-tab-item mui-active" @click="search()">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">发现</span>
      </div>
      <div class="mui-tab-item" @click="mine()">
        <span class="mui-icon mui-icon-gear"></span>
        <span class="mui-tab-label">我的</span>
      </div>
    </nav>

    <mt-header title="订单列表"></mt-header>

    <mt-search 
        cancel-text="取消"
        placeholder="搜索"
        v-model="value"
    >
      <mt-cell
        v-model="myresult"
      >
      1111
      </mt-cell>
    </mt-search>

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
</template>

<script>
export default {
  data() {
    return {
      value:'',
      shopLists: [],
      myresult:{}
    };
  },
  inject:["reload"],
  created() {
    this.$ajax.post("shopList").then(result => {
      console.log(result.data.data);
      this.shopLists = result.data.data;
      console.log(this.shopLists);
    });
  },
  methods: {
    main() {
      this.$router.push({ path: "/main" });
    },
    order() {
      this.$router.push({ path: "/order" });
      // return;
    },
    search() {
      // this.$router.push({path:'/search'});
      return;
    },
    mine() {
      this.$router.push({ path: "/mine" });
    },
    toshop() {
      alert("111");
    }
  },
  watch:{
      value:function(newval,oldval){
        console.log(newval)
        this.$ajax.post('shopFilter',{shop_name:newval}).then((res)=>{
          console.log(res.data.data)
          this.shopLists=res.data.data;
          this.reload();
        })
      },
      myresult:function(newval,oldval){
          console.log(newval.shop_name)
      }
  }
};
</script>

<style lang="scss" scoped>
.searchWrap {
  margin: 5px 8px;
  background: #fff;
}
.mint-searchbar {
  padding: 5px 5px 0 5px;
  box-sizing: border-box;
}
.mint-search {
  height: 100%;
  height: 100%;
  overflow: hidden;
}
input[type="search"] {
  font-size: 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 34px;
  text-align: center;
  border: 0;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 0px !important;
}
.sell_count {
  font-size: 12px;
  color: black;
  display: flex;
  justify-content: space-between; //两端对齐
}
*{
        touch-action: pan-y;
    }
</style>