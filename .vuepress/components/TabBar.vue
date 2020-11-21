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
  border-radius: 0 30% 0 0;
}
.item3{
  border-radius: 30% 0 0 0;
}
.item2{
  position: relative;
  width: 20%;
  height: 100%;
  background: radial-gradient(circle at 50% top, transparent 43%, skyblue 50%);
}

.item2:after{
  content: '';
  position: absolute;
  left: 50%;
  transform: translate(-49%, -50%);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: skyblue;
}
</style>