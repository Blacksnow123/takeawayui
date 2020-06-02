<template>
  <div class="remarkContainer">
      <!-- 头部 -->
    <mt-header title="备注填写">
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>


    <!-- 备注内容填写 -->
    <div class="extraInfo">
        <span class="title">备注信息</span>
        <div class="mui-input-row">
            <textarea id="textarea" rows="5" placeholder="请输入备注" ref="text"></textarea>
        </div>
    </div>

    <div class="submit">
        <mt-button type="primary" class="payfor" @click="submit()">确定</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  daata() {
    return {};
  },
  methods:{
    goback() {
      this.$router.go(-1);
    },
    submit(){
      let mytext=this.$refs.text.value;
      this.$store.commit('setExtrainfo',mytext);
      this.$router.push({path:'/mian/yamifood/goods/confirmorder'})
    //   console.log(mytext);
    }
  }
};
</script>

<style lang="scss" scoped>

.title{
    font-size: 18px;
    font-weight: bold;
}
.extraInfo{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
}
#textarea{
    margin:10px 10px 10px 0px
    
}
.payfor{
    width: 100%;
}
</style>