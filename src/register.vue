<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">注册</h1>
    </header>
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input
            id="account"
            type="text"
            class="mui-input-clear mui-input"
            placeholder="请输入账号"
            v-model="user.user_name"
          />
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input
            id="password"
            type="password"
            class="mui-input-clear mui-input"
            placeholder="请输入密码"
            v-model="user.user_password"
          />
        </div>
        <div class="mui-input-row">
          <label>确认</label>
          <input
            id="password_confirm"
            type="password"
            class="mui-input-clear mui-input"
            placeholder="请确认密码"
            v-model="user_password_conform"
          />
        </div>
        <div class="mui-input-row">
          <label>邮箱</label>
          <input
            id="email"
            type="email"
            class="mui-input-clear mui-input"
            placeholder="请输入邮箱"
            v-model="user.email"
          />
        </div>
      </form>
      <div class="mui-content-padded">
        <button id="reg" class="mui-btn mui-btn-block mui-btn-primary" @click="register()">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import mui from '../lib/mui/js/mui.js'
export default {
  data() {
    return {
      user: {
        user_name: "",
        user_password: "",
        email: ""
      },
      user_password_conform: ""
    };
  },
  methods: {
    register() {
		console.log(this.user.email);
		var a=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
      if (this.user.user_password == this.user_password_conform &&this.user_password_conform != ""){
		  if(a.test(this.user.email)){
			  this.$ajax.post("userRegister", this.user).then(result => {
          		console.log(result.data);
          		if (result.data.result == 0) {
					mui.toast('注册成功',{ duration:'short', type:'div' }) 
            		this.$router.push({ name: "login" });
          		} else {
            		mui.alert("注册失败", "错误", function() {});
          		}
        	});
		  }else{
			  mui.alert("邮箱格式错误", "错误", function() {});
		  }
        	
      }else{
		  mui.alert("密码确认失败", "错误", function() {});
	  }
    }
  }
};
</script>

<style lang="scss" scoped>
area {
  margin: 20px auto 0px auto;
}
.mui-input-group:first-child {
  margin-top: 20px;
}
.mui-input-group label {
  width: 22%;
}
.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  width: 78%;
}
.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
  top: 6px;
}
.mui-content-padded {
  margin-top: 25px;
}
.mui-btn {
  padding: 10px;
}
</style>