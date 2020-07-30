<template>
  <div class="nav">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
  }
}
</script>
<style scoped>
.nav{
  /* height: 50px;
  line-height: 50px; */
  color:#2485fc;
  margin-bottom: 5px;
}

</style>
<style>
.el-card .el-card__body{
  padding: 10px;
}
</style>