<template>
  <div class="collapse-item" @click="openAndClose(index)">
    <span>{{title}}</span>
    <span class="direction">></span>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CollapseItem",
    props: {
      title: {
        type: String,
        default: ""
      },
      index: {
        type: String,
        default: 0
      },
    },
    data() {
      return {
        el: {},
        arrow: {},
        accordion:false
      }
    },
    mounted() {
      this.accordion = this.$parent.accordion;
      this.el = document.getElementsByClassName("content");
      this.arrow = document.getElementsByClassName("direction")
    },
    methods: {
      openAndClose(index) {
        let el = this.el[index];
        let arrow = this.arrow[index];
        if (window.getComputedStyle(el).height === "0px") {
          el.style.display = 'block';
          // mac Safari下，貌似auto也会触发transition, 故要none下~
          el.style.transition = "none";
          // 设置高度为auto
          el.style.height = "auto";
          //  设置外边距为0
          el.style.margin = "0";
          //  获取当前的height
          let targetHeight = window.getComputedStyle(el).height;
          //  设置渐变
          el.style.transition = "all 600ms";
          //  重新将height设置为0
          el.style.height = "0px";
          //  设置箭头的渐变
          arrow.style.transition = "all 600ms";

          //触发浏览器重排（关键）
          el.offsetWidth;

          arrow.style.transform = "rotate(90deg)";
          el.style.height = targetHeight;
          el.style.margin = "20px 0";
          this.closeOther();
        } else {
          el.style.height = "0px";
          el.style.margin = "0";
          arrow.style.transform = "rotate(0deg)";
        }
      },
      closeOther() {
        if(!this.accordion)return;
        for (let i = 0; i < this.el.length; i++) {
          if (i.toString() !== this.index) {
            if (window.getComputedStyle(this.el[i]).height !== "0px") {
              this.el[i].style.height = "0px";
              this.el[i].style.margin = "0";
              this.arrow[i].style.transform = "rotate(0deg)";
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .collapse-item {
    border-bottom: 1px solid #DCDFE6;
    padding: 20px 0;
    cursor: pointer;
  }

  .collapse-item .direction {
    float: right;
  }

  .collapse-item .content {
    display: none;
    height: 0;
    overflow: hidden;
  }
</style>