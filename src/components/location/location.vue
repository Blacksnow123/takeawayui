<template>
  <div class="container">
    <mt-header title="选择地理位置">
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>
    <div class="rightnow">
        您当前所在城市：{{this.city}} 
    </div>
    <div class="details">
        详细地址:
        <div class="mui-input-row">
            <textarea id="textarea" rows="5" placeholder="请输入详细信息" ref="text"></textarea>
        </div>
    </div>
  </div>
</template>

<script>
import BMap from "BMap";
export default {
  data() {
    return {
      city: []
    };
  },
  created() {
    this.ready();
  },
  beforeDestroy(){
      this.setlocation();
  },
  methods: {

    setlocation(){
        let locationdetails=this.city+this.$refs.text.value ;

        this.$store.commit('setlocationInfo',locationdetails)

    },
    goback() {
      this.$router.go(-1);
    },
    ready() {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        r => {
          console.log(r.address.city);
          this.city = r.address.city;
        },
        { enableHighAccuracy: true }
      );
    },
    comfirm(){
      this.$router.push("/mian/yamifood/goods/confirmorder")
    }
  }
};
</script>

<style lang="scss" scoped>
</style>