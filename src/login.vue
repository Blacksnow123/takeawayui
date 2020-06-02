<template>
    <div class="login_container">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">登录</h1>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model='user.user_name'>
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model='user.user_password'>
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="login()">登录</button>
				<div class="link-area"><router-link to='/register'>注册账号</router-link> <span class="spliter"></span>
					<!-- |</span> <router-link to="/forgetpassword">忘记密码</router-link> -->
				</div>
			</div>
    </div>
    </div>
      

</template>

<script>
import mui from '../lib/mui/js/mui.js'

import css from '../lib/mui/css/mui.css'
import qs from 'qs' //导入QS
export default {
    data(){
        return{
			user:{
				user_name:'',
				user_password:''
			}
        }
    },
    methods:{
        login(){
			// console.log(this.userInfo);
			this.$ajax.post('userCheck',this.user).then(result=>{
				// console.log(result.data.result)
				if(result.data.result==0){
					mui.toast('登录成功',{ duration:'short', type:'div' }) 
					//把token存储到localstorage
					localStorage.setItem('token',result.data.token)

					this.$store.commit('setUser',this.user.user_name);
					this.$router.push({name:'main'});
				}else{
					mui.alert('用户名或密码错误', '错误', function() {
        				
    				});
				}
			})
        }
    }
}
</script>

<style lang="scss" scoped>
    
            .area {
				margin: 20px auto 0px auto;
			}
    
			.mui-input-group {
				margin-top: 10px;
			}
			
			.mui-input-group:first-child {
				margin-top: 20px;
			}
			
			.mui-input-group label {
				width: 22%;
			}
			
			.mui-input-row label~input,
			.mui-input-row label~select,
			.mui-input-row label~textarea {
				width: 78%;
			}
			
			.mui-checkbox input[type=checkbox],
			.mui-radio input[type=radio] {
				top: 6px;
			}
			
			.mui-content-padded {
				margin-top: 25px;
			}
			
			.mui-btn {
				padding: 10px;
			}
			
			.link-area {
				display: block;
				margin-top: 25px;
				text-align: center;
			}
			
			.spliter {
				color: #bbb;
				padding: 0px 8px;
			}
			
			.oauth-area {
				position: absolute;
				bottom: 20px;
				left: 0px;
				text-align: center;
				width: 100%;
				padding: 0px;
				margin: 0px;
			}
			
			.oauth-area .oauth-btn {
				display: inline-block;
				width: 50px;
				height: 50px;
				background-size: 30px 30px;
				background-position: center center;
				background-repeat: no-repeat;
				margin: 0px 20px;
				/*-webkit-filter: grayscale(100%); */
				border: solid 1px #ddd;
				border-radius: 25px;
			}
			
			.oauth-area .oauth-btn:active {
				border: solid 1px #aaa;
			}
			
			.oauth-area .oauth-btn.disabled {
				background-color: #ddd;
			}

    
    
</style>