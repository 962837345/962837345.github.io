<template>
  <div class="box">
    <div class="item item1">item1</div>
    <div class="item item2">item2</div>
    <div class="item item3">item3</div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
      }
    }
  }
</script>

<style scoped>
  .box{
    display: flex;
    width: 200px;
    height: 100px;
    background-color: #DCDFE6;
  }

  .item{
    width: 50px;
    height: 50px;
    color: white;
    text-align: center;
  }

  .box .item1{
    background-color: #F56C6C;
  }

  .box .item2{
    background-color: #409EFF;
  }

  .box .item3{
    background-color: #67C23A;
  }

</style>