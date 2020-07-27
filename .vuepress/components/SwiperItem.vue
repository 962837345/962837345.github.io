<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "SwiperItem",
    props:{
      imgs:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .slide img{
    height: 100%;
  }
</style>