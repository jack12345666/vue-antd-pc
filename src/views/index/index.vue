<template>
  <common-layout>
      <div slot="header">
          <Header />
            <div class="nav-box">
            <div class="nav">
                <img
                style="width: 14.86px;height: 16px;margin-right: 5px;"
                :src="homeImg"
            />
            <div class="title">你所在位置&nbsp;:&nbsp;</div>
            <div class="before-nav"> <a :href="homeUrl">首页</a></div>
            <div class="now">空间厂房</div>
            </div>
            </div>
      </div>
      <div slot="content">
          <category-lease @refreshList="fetchLeaseList(arguments)"/>
          <sort :total="total" @refreshList="fetchLeaseList(arguments)"/>
          <div :style="{ minHeight: box_height }">
            <a-spin tip="加载中..." class="loading" v-if="showLoading"/>
           <house-item :venusList="venusList"/>
          <div class="pagination" v-if="venusList.length > 0">
            <a-pagination v-model="lease.searchConf.currentPage" :total="total" show-less-items  @change="pageChange"/>
          </div>
           <div v-if="venusList.length === 0" class="emptyBox">
            <a-empty description="暂无数据" class="emptyItem"/>
          </div>
        </div>  
      </div>
  </common-layout>
</template>

<script>
import { LOGINURL } from '../../utils/config'
import { getLeaseList } from '../../api/lease'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            homeUrl: LOGINURL,
            homeImg: require('@/assets/home.png'),
            venusList: [],
            searchConf: {
                currentPage: 1,
                pageSize: 10,    
            },
            total: 1,
            box_height: null,
            showLoading: false
        }
    },
    computed: {
        ...mapState(['lease'])
    },
    created() {
        this.getHeight()
        this.getLeaseList()
    },
    methods: {
        //获取内容区域高度
      getHeight(){
        this.box_height=(window.innerHeight-400) + 'px'
      },
      async getLeaseList() {
          this.showLoading = true
          let rsp = await getLeaseList(this.lease.searchConf)
          if(rsp.code === 0) {
              this.venusList = rsp.data.data.items
              this.total = rsp.data.data.total
              this.showLoading = false
          }else {
              this.showLoading = false
          }
      },
       pageChange(page){
            let searchConf = Object.assign(this.lease.searchConf, {currentPage: page})
            this.$store.commit('changeSearchConf', searchConf)
            this.getLeaseList()
        },
        fetchLeaseList() {
           let searchConf = Object.assign(this.lease.searchConf, {currentPage: 1})
           this.$store.commit('changeSearchConf', searchConf)
           this.getLeaseList()
        }
    }
}
</script>

<style lang="less" scoped>
.nav-box {
        width: 100%;
        background-color: #fafafa;
       .nav {
        display: flex;
        height: 54px;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
         .title {
             font-size: 16px;
         }
        .indexHome {
          color: #999;
          &:hover {
            cursor: pointer;
            
          }
        }
        .before-nav {
            margin: 0 5px;
            font-size: 16px;
            a {
                text-decoration: none;
                color: #666;
            }
        }
        .now {
            color:#999999;
            font-size: 16px;
        }
        .now:before {
            content: "\00bb\00a0";
            padding: 0 8px;
            color: #ccc;
        }
     }
    }
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
.pagination {
    text-align: center;
    margin: 35px 0;
}
.emptyBox{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>