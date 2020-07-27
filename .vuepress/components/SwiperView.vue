<template>
  <div class="content">
    <swiper :interval="3000" :speed="50">
      <swiper-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.image" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import Swiper from "./Swiper";
  import SwiperItem from "./SwiperItem";

  export default {
    name: "SwiperView",
    components: {SwiperItem, Swiper},
    data() {
      return {
        imgs: [
          {
            image: require('../public/components/swiper/swiper1.jpg')
          },
          {
            image: require('../public/components/swiper/swiper2.jpg')
          },
          {
            image: require('../public/components/swiper/swiper3.jpg')
          },
          {
            image: require('../public/components/swiper/swiper4.jpg')
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .content{
    width: 500px;
    height: 300px;
  }
</style>