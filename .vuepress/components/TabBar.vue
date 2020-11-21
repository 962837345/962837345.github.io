<template>
  <div class="content">
    <div class="item1 item"></div>
    <div class="item2"></div>
    <div class="item3 item"></div>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  display: flex;
  width: 375px;
  height: 66px;
  margin-top: 100px;
}
.item{
  width: 40%;
  height: 100%;
  background: skyblue;
}
.item1{
  border-radius: 0 10px 0 0;
}
.item3{
  border-radius: 10px 0 0 0;
}
.item2{
  position: relative;
  width: 20%;
  height: 100%;
  background: radial-gradient(circle at top, transparent 50%, skyblue 50%);
  margin-left: -1px;
}

.item2:after{
  content: '';
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: skyblue;
}
</style>