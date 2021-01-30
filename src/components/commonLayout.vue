<template>
  <div id="container">
      <div class="header">
          <slot name="header"></slot>
      </div>
      <div class="content">
          <slot name="content"></slot>
          <slot name="footer">
              <Footer-item  v-if="showFooter"/>
          </slot>
      </div>

  </div>
</template>

<script>
export default {
    props: {
        showFooter: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
          
        }
    }
}
</script>

<style lang="less" scoped>
#container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100vh;
    background-color: #f5f5f5;
    .content {
        flex: 1;
        overflow: auto;
    }
}


</style>