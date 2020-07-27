<template>
  <div class="swiper-view">
    <div id="imgList">
      <slot></slot>
    </div>

    <div id="navDiv">
      <a href="#" v-for="(item,index) in slideCount" :key="index" :class="{active: index === currentIndex}"
         @click="navClick(index)"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      interval: {     // 图片切换的间隔时间
        type: Number,
        default: 3000
      },
      speed: {        // 图片移动的速度
        type: Number,
        default: 50
      }
    },
    data() {
      return {
        width: 0,
        currentIndex: 0,   //默认图片索引
        imgList: {},
        timer: {},
        slideCount: 0,
      }
    },
    methods: {
      /**
       *  nav点击事件
       */
      navClick(index) {
        this.currentIndex = index;
        clearInterval(this.timer);
        // 点击nav切换对应图片
        this.move(this.imgList, "left", -index * this.width, this.speed, function () {
          this.autoChange()
        })
      },
      /**
       * element移动方法
       * @param obj 要执行动画的对象
       * @param direction 移动的方向
       * @param target  执行动画的目标位置
       * @param speed 移动的速度
       * @param callback  执行完毕的回调函数
       */
      move(obj, direction, target, speed, callback) {
        //  关闭上一个定时器
        clearInterval(obj.timer);

        // 获取obj原来的属性值
        let oldValue = parseInt(this.getStyle(obj, direction));

        //  通过移动来判断速度的正负值
        if (oldValue > target) {
          speed = -speed
        }

        obj.timer = setInterval(() => {
          // 在旧的值的基础上加上speed
          let newValue = oldValue + speed;

          // 更新oldValue
          oldValue = newValue;

          // 移动到边界时的处理
          if ((newValue < target && speed < 0) || (newValue > target && speed > 0)) {
            newValue = target
          }

          // 改变element的位置
          obj.style[direction] = newValue + 'px';

          //  移动完成清除定时器
          if (newValue === target) {
            clearInterval(obj.timer);
            //  移动完成后执行回调函数
            callback && callback.call(this);
          }
        }, 20)
      },
      //  封装获取对应的style样式属性
      getStyle(obj, name) {
        return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name]
      },

      //  自动切换图片
      autoChange() {
        //  开启一个定时器，自动切换图片
        this.timer = setInterval(() => {
          this.currentIndex++;

          this.move(this.imgList, "left", -this.width * this.currentIndex, this.speed, function () {
            if (this.currentIndex >= this.slideCount) {
              this.imgList.style.left = 0;
              this.currentIndex = 0;
            }
          })

        }, this.interval)
      },
    },
    mounted() {
      //  获取容器的宽度
      let swiperWidth = document.getElementsByClassName('swiper-view')[0];
      this.width = swiperWidth.offsetWidth;

      // 获取imgList
      this.imgList = document.getElementById('imgList');

      // 获取图片的长度
      let slide = document.getElementsByClassName('slide');
      this.slideCount = slide.length;

      // 在末尾添加第一张图片
      if(this.slideCount > 0){
        let cloneFirst = slide[0].cloneNode(true);
        this.imgList.appendChild(cloneFirst);
      }

      // 自适应imgList宽度
      this.imgList.style.width = (this.slideCount + 1) * this.width + 'px';

      //  设置每张图片的宽度，防止过大挤出
      let img = document.querySelectorAll('.slide img');
      for (let i = 0; i < img.length; i++) {
        img[i].style.width = this.width + 'px';
      }

      this.autoChange();
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .swiper-view {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  #navDiv {
    position: absolute;
    width: 100%;
    height: 10px;
    bottom: 10px;
    display: flex;
    justify-content: center;
  }

  #navDiv a {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: cadetblue;
    float: left;
    margin: 0 5px;
    opacity: 0.5;
  }

  #navDiv .active {
    background-color: yellow;
  }

  #imgList {
    list-style: none;
    position: absolute;
    display: flex;
    height: 100%;
  }
</style>