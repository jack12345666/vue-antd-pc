<template>
  <div class="box" :style="{ height: itemHeight }">
    <div class="outletsItem">
      <div
        class="item"
        v-for="(item, index) in outletsTypes"
        :key="item.id"
        @click="checkOutlet(item, index)"
      >
        <div :class="item.isChecked ? 'name activited' : 'name'">
          {{ item.name }}
        </div>
        <div :class="item.isChecked ? 'address activited' : 'address'">
          地址: {{ item.address }}
        </div>
        <div
          :class="item.isChecked ? 'tel activited' : 'tel'"
          v-if="item.category === '5004'"
        >
          运行状态: {{ item.runStatus === 1 ? "运行" : "在建" }}
        </div>
        <div :class="item.isChecked ? 'tel activited' : 'tel'" v-else>
          电话: {{ item.tel }}
        </div>
      </div>
    </div>
    <div class="page">
        <a-pagination size="small" :current="currentPage" :total="total" @change="onChange" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemHeight: {
      type: String,
      default: window.innerHeight - 300 + "px",
    },
    outletsTypes: {
      type: Array,
      default: function () {
        return [];
      },
    },
      total: {
          type: Number,
          default: 0
      },
      currentPage: {
          type: Number,
          default: 1
      }
  },
  methods: {
    checkOutlet(item, index) {
      this.outletsTypes.map((item) => (item.isChecked = false));
      this.outletsTypes[index].isChecked = true;
      this.$store.commit("outlets/changeOutletsData", item);
      this.$emit("checkItem");
    },
    onChange(current) {
        console.log(current)
        this.$emit('checkPage', current)
    }
  },
};
</script>
<style>
.ant-pagination-disabled a, .ant-pagination-disabled .ant-pagination-item-link {
    color: #fff;
}
.ant-pagination-item-active {
    color: #fff;
    border: none;
    background: rgba(3, 239, 255, 0.3);
}
.ant-pagination-item-active a {
    color:#08c0cb;
}
.ant-pagination-item a {
    color: #fff;
}
.ant-pagination-prev a, .ant-pagination-next a {
    color: #fff;
}
</style>
<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  width: 28vw;
  background: rgba(3, 239, 255, 0.1);
  padding: 10px 8px;
  border-radius: 8px;
  .outletsItem {
    flex: 1;
    overflow: auto;
    .item {
      cursor: pointer;
      color: #fff;
      margin-bottom: 5px;
      .address {
        color: #cfcfcf;
        margin-left: 5px;
      }
      .tel {
        color: #cfcfcf;
        margin-left: 5px;
      }
      .activited {
        color: #08c0cb;
      }
    }
  }
  .page {
     text-align: center;
     padding-top: 10px;
     color: #fff;
  }
}
</style>