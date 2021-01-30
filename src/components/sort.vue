<template>
  <div class="box">
      <div class="content">
          <div class="sortList">
              <div :class="item.isChecked ? 'sortItem checked' : 'sortItem'" v-for="(item, index) in sortList" :key="item.id" @click="checkSort(item, index)">{{item.name}}</div>
          </div>
          <div class="num">共{{total}}套房源</div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props:{
        total:{
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            sortList: [
                {id: '', name: '综合排序', isChecked: true},
                {id: 1, name: '最新', isChecked: false},
                {id: 2, name: '单价', isChecked: false},
            ],
            searchConf: {
                price: '',
                createTime: ''
            }
        }
    },
    computed: {
        ...mapState(['lease'])
    },
    methods: {
        checkSort(item, index) {
            this.sortList.map(item => item.isChecked = false)
            this.sortList[index].isChecked = true
            if(index === 0) {
                this.searchConf.createTime = ''
                this.searchConf.price = ''
            }
            if(index === 1) {
                this.searchConf.createTime = 'asc'
                this.searchConf.price = ''
            }
            if(index === 2) {
                this.searchConf.price = 'asc'
                this.searchConf.createTime = ''
            }
            let searchConf = Object.assign(this.lease.searchConf, this.searchConf)
            this.$store.commit('changeSearchConf', searchConf)
            this.$emit('refreshList', this.searchConf)
        }
    }
}
</script>

<style lang='less' scoped>
.box {
    width: 100%;
    .content {
        width: 1200px;
        margin: 30px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #17a1e6;
        .sortList {
            display: flex;
            align-items: center;
            .sortItem {
                color: #666;
                font-size: 16px;
                padding: 10px 20px;
                margin-right: 20px;
                &:hover {
                    cursor: pointer;
                }
            }
            .checked {
                color: #fff;
                background-color: #169bd5;
            }
        }
        .num {
            color: #666;
            font-size: 16px;
        }
    }
}
</style>