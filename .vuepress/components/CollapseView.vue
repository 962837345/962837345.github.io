<template>
  <collapse accordion>
    <collapse-item title="点一下试试" index="0">
      <div>我被粗鲁地打开了</div>
      <div>赶紧把我给关掉</div>
    </collapse-item>
    <collapse-item title="试试就试试" index="1">
      <div>不试试上面的吗？</div>
    </collapse-item>
    <collapse-item title="打开有宝藏" index="2">
      <div>这里什么也没有</div>
    </collapse-item>
  </collapse>
</template>

<script>
  import Collapse from "./Collapse";
  import CollapseItem from "./CollapseItem";
  export default {
    name: "CollapseView",
    components: {CollapseItem, Collapse}
  }
</script>

<style scoped>

</style>