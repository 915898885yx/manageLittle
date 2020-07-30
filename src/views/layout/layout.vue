<template>
  <div class="container">
    <div class="nav">
      <span class="name">学生信息管理系统</span>
      <span>
        <!-- <img :src="circleUrl" class="circleImg"> -->
        <span style="color:#fff;float:right;margin-right:20px;cursor:pointer;" @click="out">退出</span>
        <el-avatar style="color:#fff;float:right;margin-right:10px;margin-top:5px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </span>
    </div>
    <div class="layout">
      <SideBar class="menu"></SideBar>
      <AppMain class="routeView"></AppMain>
    </div>
  </div>
</template>
<script>
  import SideBar from '@/components/sideBar.vue'
  import AppMain from './appMain.vue'
  export default {
    components: {
      SideBar,
      AppMain
    },
    data () {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["large", "medium", "small"]
      }
    },
    methods: {
      out () {
        this.$router.push({
          path: "/login"
        })
      }
    }
  }
</script>
<style scoped>
.layout{
  display: flex;
}
.menu{
  width:200px;
}
.routeView{
  flex: 1;
  height: calc(100vh - 50px);
  overflow-y: auto;
  width:100%;
  padding: 10px;
}
.nav{
  height:50px;
  line-height: 50px;
  background: #2485fc;
  color:#fff;
}
.nav .name{
  margin-left:20px;
}
.nav .circleImg{
  width:30px;
  border-radius: 50%;
  float: right;
  margin:10px 30px 0 0;
}
</style>