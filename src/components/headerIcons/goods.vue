<template>
  <div>
    <mt-header title="店铺详情">
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>
    <div class="nav">
      <router-link class="nav-item" :to="'/main/yamifood/goods/childgood/'+this.$store.getters.getVal" active-class="active">
        点菜
        <i class="line"></i>
      </router-link>
      <router-link class="nav-item" to="/main/yamifood/goods/contact" active-class="active">
        评价({{commentNum}})
        <i class="line"></i>
      </router-link>
      <router-link class="nav-item" to="/main/yamifood/goods/seller" active-class="active">
        商家
        <i class="line"></i>
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import mui from "../../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      selected: "first",
      active: "tab-container1"
    };
  },
  mounted() {
    this.totalCount();
  },
  components: {},
  props: {
    commentNum: {
      type: Number,
      default: 0
    },

  },
  watch:{
    // goods(val, oldVal){
    //   console.log("newval"+val)
    // }
  },
  methods:{
    goback(){
      // this.$router.push('/mian');
      this.$router.go(-1);
    },
    totalCount(){
      this.commentNum=this.$store.getters.getComments.length;
      console.log("111"+this.commentNum)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}

.nav-item {
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: #666666;
  position: relative;
}

.nav .active {
  color: #ffbb22;
}

.nav .active .line {
  width: 20px;
  height: 2px;
  background: #ffbb22;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -10px;
}
</style>
