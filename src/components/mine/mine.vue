<template>
    <div class="mineContainer">
        <nav class="mui-bar mui-bar-tab">
			<div class="mui-tab-item " @click="main()">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">外卖</span>
			</div>
				<div class="mui-tab-item" @click="order()">
					<span class="mui-icon mui-icon-email"></span>
					<span class="mui-tab-label">订单</span>
				</div >
			
			<div class="mui-tab-item" @click="search()">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">发现</span>
			</div>
			<div class="mui-tab-item mui-active" @click="mine()">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">我的</span>
			</div>
		</nav>

        <mt-header title="订单列表">
            <div @click="goback" slot="left">
                <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>

        <div id="setting" class="mui-page">
				<ul class="mui-table-view">
				<li class="mui-table-view-cell  loginregister">
					<a class="mui-navigate-right">
            			<div class="mui-icon mui-icon-contact userimg"></div><br>
						用户名：{{this.user}}
					</a>
				</li>
				<li class="mui-table-view-cell" @click="myorder()">
					<a class="mui-navigate-right">
						我的订单
					</a>
				</li>
				<li class="mui-table-view-cell" @click="reset()">
					<a class="mui-navigate-right">
						修改密码
					</a>
				</li>
			</ul>
			<ul class="mui-table-view" style="margin-top: 25px;" @click="about()">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						关于
					</a>
				</li>
			</ul>
			<ul class="mui-table-view" style="margin-top: 25px;" @click="exit()">
				<li class="mui-table-view-cell">
					<a style="text-align: center;color: #FF3B30;">
						退出登录
					</a>
				</li>
			</ul>
    </div>

    </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.js'
export default {
    data(){
        return {
			user:''
        }
	},
	created(){
		this.user=this.$store.getters.getUser;
	},
    methods:{
    goback() {
      this.$router.go(-1);
    },
    main(){
        this.$router.push({path:'/main'})
    },
    order(){
        this.$router.push({path:'/order'});
        // return;
    },
    search(){
        this.$router.push({path:'/search'});
        // return;
    },
    mine(){
        return;
	},
	exit(){
		sessionStorage.clear();
		this.$router.push("/login")
	},
	myorder(){
		this.$router.push("/order")
	},
	reset(){
		this.$router.push("/reset")
	},
	about(){
		mui.alert("基于前后端分离的外卖点餐系统移动端", "关于", function() {});
	}
    }
}
</script>

<style lang="scss" scoped>
    .userimg{
		margin-left: 10px;
	}
	*{
        touch-action: pan-y;
    }
</style>