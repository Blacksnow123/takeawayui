<template>
  <div id="app">
    <router-view to="/login"></router-view>
    
  </div>
  
</template>

<script>
export default {
provide :function() {
    return {
      reload:this.reload
    }
},
data:function(){
    return {
        isRouterAlive:true
    }
},
methods:{
    reload:function(){
        this.isRouterAlive=false;
        this.$nextTick(function(){
            this.isRouterAlive=true
        })
    }
}
}
</script>

<style lang="scss" scoped>
    
</style>