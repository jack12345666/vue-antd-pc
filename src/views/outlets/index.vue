<template>
  <common-layout :showFooter="false">
    <div slot="header" v-if="showHeader">
      <Header />
      <div class="nav-box">
        <div class="nav">
          <img
            style="width: 14.86px; height: 16px; margin-right: 5px"
            :src="homeImg"
          />
          <div class="title">你所在位置&nbsp;:&nbsp;</div>
          <div class="before-nav"><a :href="homeUrl">首页</a></div>
          <div class="now">生活钱塘</div>
        </div>
      </div>
    </div>
    <div slot="content">
        <div class="content" :style="{ minHeight: contentHeight }">
            <amap v-if="outletsTypes.length > 0" :height="contentHeight" :outletsList="outletsTypes" :outletsData="outletsData" ref="map"/>
            <!-- <div class="category">
                <div :class="item.isChecked ? 'categoryItem acitived' : 'categoryItem'" v-for="(item, index) in categoryList" :key="item.id" @click="checkCategory(item, index)">
                    {{item.name}}
                </div>
            </div> -->
            <div class="btn" @click="toScreen">
                <a-icon v-if="showHeader" type="fullscreen" title="全屏" style="font-size:20px"/>
                <a-icon v-else type="fullscreen-exit" title="关闭全屏" style="font-size:20px"/>
            </div>
            <div class="outletsList" v-if="outletsTypes.length > 0">
                <outlets-item :itemHeight="itemHeight" :outletsTypes="outletsTypes" @checkItem="checkItem" @checkPage="checkPage(arguments)" :total="total" :currentPage="searchConf.currentPage"/>
            </div>
             <div class="category">
                <div :class="item.isChecked ? 'categoryItem acitived' : 'categoryItem'" v-for="(item, index) in categoryList" :key="item.id" @click="checkCategory(item, index)">
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
  </common-layout>
</template>

<script>
import { LOGINURL } from "../../utils/config";
import { getOutLetsType, getOutLetsList } from '../../api/outlets'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      homeImg: require("@/assets/home.png"),
      homeUrl: LOGINURL,
      contentHeight: null,
      itemHeight: null,
      categoryList: [],
      showHeader: true,
      typeId: null,
      outletsData: null,
      outletsTypes: [],
      searchConf: {
          currentPage: 1,
          pageSize: 10,
          category: null,
      },
      total: 0,
    }
  },
  computed: {
    ...mapState(['outlets'])
  },
  created() {
      this.getHeight()
      this.fetchCategory()
  },
  methods: {
    getHeight(){
       this.contentHeight = (window.innerHeight - 210) + 'px'
       this.itemHeight = (window.innerHeight - 300) + 'px'
    },
    checkItem() {
        this.$refs.map.checkOutLets()
    },
    async fetchCategory() {
        let rsp = await getOutLetsType('OutletsType')
        if(rsp.code === 0) {
            const datas = rsp.data.data.items
            if(datas.length > 0) {
               datas.forEach(item => {
                   this.categoryList.push({
                       id: item.id,
                       name: item.name,
                       isChecked: false
                   })
               })
               this.categoryList[0].isChecked = true
               this.typeId = this.categoryList[0].id
               this.fetchOutletTypes()
            }
        }
    },
    checkCategory(item, index) {
        this.categoryList.map(item => item.isChecked = false)
        this.categoryList[index].isChecked = true
        this.typeId = item.id
        this.fetchOutletTypes()
    },
    checkPage(item) {
      this.searchConf.currentPage = item[0]
      this.fetchOutletTypes()
    },
    async fetchOutletTypes() {
        this.outletsTypes = []
        this.searchConf.category = this.typeId
        let rsp = await getOutLetsList(this.searchConf)
        if(rsp.code === 0) {
           const datas = rsp.data.data.items
           this.total = rsp.data.data.total
           if(datas.length > 0) {
               datas.forEach(item => {
                   this.outletsTypes.push({
                       id:item.id,
                       name: item.name,
                       address: item.address,
                       tel: item.tel,
                       lng: item.lng,
                       lat: item.lat,
                       runStatus: item.runStatus,
                       category: item.category,
                       isChecked: false
                   })
               })
           }
        }
    },
    toScreen() {
        this.contentHeight = this.contentHeight === '100vh' ? (window.innerHeight - 210) + 'px' : '100vh'
        this.itemHeight = this.itemHeight === '80vh' ? (window.innerHeight - 300) + 'px' : '80vh'
        this.showHeader = !this.showHeader
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
      color: #999999;
      font-size: 16px;
    }
    .now:before {
      content: "\00bb\00a0";
      padding: 0 8px;
      color: #ccc;
    }
  }
}
.content {
    position: relative;
    .btn {
        position: absolute;
        top: 20px;
        right: 50px;
        color: #fff;
        cursor: pointer;
    }
    .category {
        position: absolute;
        bottom: 20px;
        left: 50px;
        display: flex;
        align-items: center;
        .categoryItem {
            cursor: pointer;
            color: #fff;
            margin-right: 15px;
            padding: 5px 7px;
            border-radius: 8px;
            background: rgba(3, 239, 255, 0.1);
        }
        .acitived {
            color: #08c0cb;
        }
    }
    .outletsList {
        position: absolute;
        left: 35px;
        top: 30px;
    }
}
</style>