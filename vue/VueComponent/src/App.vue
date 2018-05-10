<template>
  <div id="app">
    <Badge :value="32"
           :hidden="false">
      <div class="el-button el-button-small">分享</div>
    </Badge>
    <Badge :value="120"
           :hidden="false"
           :max="99">
      <div class="el-button el-button-small">评论</div>
    </Badge>
    <Badge :hidden="false"
           :is-dot="false"
           :value="42">
      <div class="el-button el-button-small">回复</div>
    </Badge>
    <p>
      数据分析
      <Badge :value="37"></Badge>
    </p>
  </div>
</template>

<script>
import './assets/style/base.css'
import Badge from './components/badge/badge'
export default {
  name: 'App',
  components: {
    Badge
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
