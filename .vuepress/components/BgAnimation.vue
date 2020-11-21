<template>
  <div class="sm"/>
</template>

<script>
  export default {
    name: "BgAnimation"
  }
</script>

<style scoped>
  .sm {
    width: 100%;
    height: 500px;
    margin: 0;
    padding: 0;
    background-image: linear-gradient(125deg, #2c3e50, #27ae60, #2980b9, #e74c3c, #8e44ad);
    background-size: 400%;
    animation: bganimation 15s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes bganimation {
    0%{
      background-position: 0 50%;
    }
    50%{
      background-position: 100% 50%;
    }
    100%{
      background-position: 0 50%;
    }
  }
</style>