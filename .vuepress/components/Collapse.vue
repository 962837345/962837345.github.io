<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Collapse",
    props: {
      accordion: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .collapse {
    background-color: white;
    padding: 0 10px;
    border-radius: 5px;
    border: 1px solid #DCDFE6;
  }

</style>