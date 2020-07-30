<template>
  <div class="menu">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#fff">
      <div v-for="(menu, index) in menus" :key="index">
        <el-submenu v-if="menu.children && menu.children.length > 0" :index="index + ''" :key="index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span  @click="gotoMenu(menu)">{{menu.mate.menuName}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item :class="{active:menuChild.mate.url == $route.path }" v-for="(menuChild, indexChild) in menu.children" :index="indexChild + ''" :key='indexChild' @click="gotoLevelTwo(menuChild)">{{menuChild.mate.menuName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :key="index" :class="{active:menu.mate.url == $route.path }">
          <i class="el-icon-menu"></i>
          <span style="display:inline-block;height:100%;width:100%;" @click="gotoMenu(menu)">{{menu.mate.menuName}}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
  import menus from '@/router/menu'
  export default {
    data () {
      return {
        menus
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      gotoMenu (menu) {
        if (menu.children && menu.children.length > 0) {
          if (this.$route.path == menu.children[0].mate.url) {
            return
          }
          this.$router.push({path: menu.children[0].mate.url})
        } else {
          if (this.$route.path == menu.mate.url) {
            return
          }
          this.$router.push({path: menu.mate.url})
        }
      },
      gotoLevelTwo (menu) {
        if (this.$route.path == menu.mate.url) {
          return
        }
        this.$router.push({
          path: menu.mate.url
        })
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
.menu{
  background: #545c64;
  height: calc(100vh - 50px);
  overflow-y: auto;
  overflow-x: hidden;
}
.active {
  background: #434a50 !important;
  color:#fff;
}
</style>