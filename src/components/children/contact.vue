<template>
  <div class="ratings" ref="rateView">
    <goods :commentNum="this.comments.length"></goods>
    <div class="ratings-wrapper">
      <div class="overview">
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{this.ratings.shop_score}}</p>
            <p class="text">商家评分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <Star :score="parseInt(this.ratings.taste_score)" class='star'></Star>
              <span class="score"></span>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <Star :score.number="parseInt(this.ratings.pack_score)" class='star'></Star>
              <span class="score"></span>
            </div>
          </div>
        </div>
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{this.ratings.send_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>

      <div class="content">
        <ul class="rating-list">
          <li
            v-for="(comment,index) in comments"
            :key="index"
            class="comment-item"
          >
            <div class="comment-header">
              <img :src="comment.user_pic_url" v-if="comment.user_pic_url" />
              <img src="/static/images/anonymity.png" v-if="!comment.user_pic_url"  />
            </div>
            <div class="comment-main">
              <div class="user">
                {{comment.user_name}}
              </div>
              <div class="time">
                {{comment.comment_time}}
              </div>
              <!-- <div class="star-wrapper">
                <span class="text">评分</span>
                <Star :score="comment.order_comment_score" class="star"></Star>
              </div> -->
              <div class="content">
                {{comment.content}}
              </div>
            </div>
          </li>
        </ul>
      </div>
      

    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
//   import Split from '../split/Split'
  import Star from '../global/star.vue'
  import goods from '../headerIcons/goods.vue'

  const ALL = 2
  const PICTURE = 1
  const COMMENT = 0
  export default {
    data() {
      return {
        ratings: {},
        selectType: ALL,
        shop_num:[],
        comments:[],
      }
    },
    components: {
    //   Split,
     goods,
     Star
    },
    created() {
      this.getShopnum();
      // this.getShopinfo();
      this.getComment();
      
    },
    methods: {
      getShopnum(){
         this.shop_num=this.$store.getters.getVal;
        //  console.log(this.$store.getters.getVal);
      },
      getComment(){
        // console.log(this.shop_num);
      var a1=this.$ajax.post("shopComment", { shop_num: this.shop_num });

      var a2=this.$ajax.post("shopInfo", { shop_num: this.shop_num });

      this.$ajax.all([a1,a2]).then(this.$ajax.spread((resut1,result2)=>{
        this.comments=resut1.data.data;
        this.ratings=result2.data.data[0];
        console.log(this.comments);
        console.log(this.ratings);

      })).catch(err=>{
        console(err);
      })
      },
    //   getShopinfo(){
    //     // console.log(this.shop_num);
      
    // },
    },
  }
</script>

<style scoped>
  .ratings {
    position: absolute;
    left: 0;
    /* top: 191px; */
    /* bottom: 0; */
    width: 100%;
    overflow: hidden;
  }

  .ratings .ratings-wrapper .overview {
    padding: 20px 0 18px 0;
    display: flex;
  }

  .ratings .ratings-wrapper .overview .overview-left {
    flex: 1;
    padding-left: 26px;
  }

  .ratings .ratings-wrapper .overview .overview-left .comment-score {
    float: left;
    width: 48px;
    text-align: center;
    margin-right: 26px;
  }

  .ratings .ratings-wrapper .overview .overview-left .comment-score .score {
    font-size: 23px;
    font-weight: 800;
    color: #ffb000;
    margin-bottom: 9px;
  }

  .ratings .ratings-wrapper .overview .overview-left .comment-score .text {
    font-size: 11px;
    color: #666666;
  }

  .ratings .ratings-wrapper .overview .overview-left .other-score {
    float: left;
    margin-top: 3px;
  }

  .ratings .ratings-wrapper .overview .overview-left .other-score .item {
    height: 11px;
  }

  .ratings .ratings-wrapper .overview .overview-left .other-score .item .text {
    font-size: 11px;
    color: #666666;
    margin-right: 11px;
    float: left;
  }

  .ratings .ratings-wrapper .overview .overview-left .other-score .item .star {
    float: left;
    margin-right: 11px;
  }

  .ratings .ratings-wrapper .overview .overview-left .other-score .item .score {
    font-size: 11px;
    color: #FFB000;
    float: left;
  }

  .ratings .ratings-wrapper .overview .overview-left .other-score .quality-score {
    margin-bottom: 14px;
  }

  .ratings .ratings-wrapper .overview .overview-right {
    flex: 0 0 100px;
    text-align: center;
    border-left: 1px solid #9D9D9D;
  }

  .ratings .ratings-wrapper .overview .overview-right .delivery-score .score {
    font-size: 19px;
    font-weight: 500;
    color: #999999;
    margin-bottom: 10px;
    margin-top: 3px;
  }

  .ratings .ratings-wrapper .overview .overview-right .delivery-score .text {
    font-size: 11px;
    color: #999999;
  }

  .ratings .ratings-wrapper .content {
    padding: 16px;
  }

  .ratings .ratings-wrapper .content .rating-select {
    width: 100%;
    box-sizing: border-box;
    font-size: 0;
    border: 1px solid #FFB000;
    border-right: 0;
    margin-bottom: 11px;
    border-radius: 3px;
  }

  .ratings .ratings-wrapper .content .rating-select .item {
    width: 33.3%;
    display: inline-block;
    height: 33px;
    line-height: 33px;
    font-size: 14px;
    text-align: center;
    border-right: 1px solid #FFB000;
    box-sizing: border-box;
    color: #FFB000;
  }

  .ratings .ratings-wrapper .content .rating-select .item:last-child img {
    height: 14px;
    vertical-align: middle;
  }

  .ratings .ratings-wrapper .content .rating-select .item.active {
    background: #FFB000;
    color: black;
  }


  .ratings .ratings-wrapper .content .labels-view .item {
    display: inline-block;
    height: 27px;
    line-height: 27px;
    padding: 0 10px;
    font-size: 12px;
    background: #F4F4F4;
    margin-right: 6px;
    margin-bottom: 6px;
    border-radius: 3px;
    color: #999999;
  }

  .ratings .ratings-wrapper .content .labels-view .item.highligh {
    color: #656565;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item {
    padding: 16px 16px 16px 0;
    border-bottom: 1px solid #F4F4F4;
    width: 100%;
    box-sizing: border-box;
    display: flex;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-header {
    flex: 0 0 35px;
    margin-right: 11px;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-header img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main {
    flex: 1;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .user {
    width: 50%;
    float: left;
    font-size: 11px;
    color: #333333;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .time {
    width: 50%;
    float: right;
    text-align: right;
    font-size: 9px;
    color: #666666;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .star-wrapper {
    float: left;
    margin-top: 12px;
    margin-bottom: 15px;
    width: 100%;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .star-wrapper .text {
    color: #999999;
    font-size: 11px;
    float: left;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .star-wrapper .star {
    float: left;
    margin-left: 7px;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .c_content {
    font-size: 13px;
    line-height: 19px;
    float: left;
    width: 100%;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .c_content i {
    color: #576b95;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .img-wrapper {
    margin-top: 9px;
    float: left;
  }

  .ratings .ratings-wrapper .content .rating-list .comment-item .comment-main .img-wrapper img {
    width: 175px;
  }
</style>
