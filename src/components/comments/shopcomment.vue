<template>
  <div class="commentContainer">
    <mt-header title="评论">
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>

    <div class="shopscore">
      店铺评分：
      <rating :shop_score="this.shop_score" v-on:listenChild="shopscore"></rating>
    </div>
    <div class="packscore">
      打包评分：
      <rating :shop_score="this.pack_score" v-on:listenChild="packscore"></rating>
    </div>
    <div class="tastescore">
      口味评分：
      <rating :shop_score="this.taste_score" v-on:listenChild="tastescore"></rating>
    </div>
    <div class="sendscore">
      配送评分：
      <rating :shop_score="this.send_score" v-on:listenChild="sendscore"></rating>
    </div>

    <div class="title">
      发表你的评论：
      <div class="mui-input-row">
        <textarea id="textarea" rows="5" placeholder="请输入评论" ref="text" v-model="comments"></textarea>
      </div>
    </div>

    <div class="submit">
      <mt-button type="primary" class="mt_btn" @click="mysubmit()">提交评论</mt-button>
    </div>  

  </div>
</template>

<script>
var starOffImg = "/static/images/star24_off@2x.png";
var starOnImg = "/static/images/star24_on@2x.png";
import rating from '../../components/global/rating.vue'
import mui from '../../../lib/mui/js/mui.js'
export default {
  data() {
    return {
      shop_score:'',
      pack_score:'',
      taste_score:'',
      send_score:'',
      comments:'',
      shop_num:this.$route.params.shop_num,
    };
  },
  methods: {
    goback() {
      this.$router.push('/order');
    },
    shopscore(val){
      this.shop_score=val;
      // console.log(val);
    },
    packscore(val){
      this.pack_score=val;
      // console.log(val);
    },
    tastescore(val){
      this.taste_score=val;
      // console.log(val);
    },
    sendscore(val){
      this.send_score=val;
      // console.log(val);
    },
    mysubmit(){

      let user_name=this.$store.getters.getUser;
      this.$ajax.post('insertComment',{user_name:user_name,shop_num:this.shop_num,pack_score:this.pack_score,taste_score:this.taste_score,send_score:this.send_score,shop_score:this.shop_score,content:this.comments}).then((res)=>{
        // console.log(res.data.data)
        if(res.data.data==1){
          mui.toast('提交成功',{ duration:'short', type:'div' }) 
          this.$router.push('/order');
        }
        else{
          mui.toast('提交失败，请重新提交',{ duration:'short', type:'div' }) 
        }
      })
    }
  },
  components:{
    rating
  }
};
</script>

<style lang="scss" scoped>
.submit{
  text-align: center;
}
</style>