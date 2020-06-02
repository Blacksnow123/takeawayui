<template>
    <div class="container">
        <mt-header title="重置密码">
            <div @click="back()" slot="left">
                <mt-button icon="back">返回</mt-button>
            </div>
        </mt-header>
        
        <div class="mui-content">
            <form class="mui-input-group">
                <div class="mui-input-row">
                <label>账号</label>
                <input
                    id="account"
                    type="text"
                    class="mui-input-clear mui-input"
                    placeholder="请输入账号"
                    readonly="readonly"
                    v-model="user.user_name"
                />
                </div>
                <div class="mui-input-row">
                <label>邮箱</label>
                <input
                    id="email"
                    type="email"
                    class="mui-input-clear mui-input"
                    placeholder="请输入邮箱"
                    @keyup="ruler()"
                    v-model="user.email"
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
            </form>
            
            <div class="mui-content-padded">
                <span class="text">{{this.text}}</span>
                <button id="reg" class="mui-btn mui-btn-block mui-btn-primary" @click="reset()">确认修改</button>
            </div>
        </div>

    </div>
</template>

<script>
import mui from '../lib/mui/js/mui.js'
export default {
    data(){
        return{
            user: {
                user_name: "",
                user_password: "",
                email: ""
            },
            user_password_conform: "",
            text:''
        }
    },
    created(){
        this.user.user_name=this.$store.getters.getUser;
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        reset(){
            this.$ajax.post('reset',{user_name:this.user.user_name,
            user_password:this.user.user_password,
            email:this.user.email}).then((res)=>{
                console.log(res.data.data)
                if(res.data.data==1){
                    mui.toast('修改成功',{ duration:'short', type:'div' });
                    this.$router.push("/login");
                }else{
                    mui.alert("修改失败，请检查邮箱", "错误", function() {});
                }
            })
        },
        ruler(){
            var a=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
            if(a.test(this.user.email)){
                this.text="邮箱格式正确"
                // alert("1")
            }else{
                this.text="邮箱格式错误"
                // alert("3")
            }
        }
    }    
}
</script>

<style lang="scss" scoped>
.mui-content-padded{
    text-align: center;
}
</style>