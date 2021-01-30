<template>
  <div class="box">
    <div class="content">
      <div class="top">
        <div
          v-for="(item, index) in titleList"
          :class="item.isChecked ? ' title checked' : 'title'"
          :key="index"
          @click="checkTitle(item, index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="line">
        <div class="quyuArrow" v-if="showQuyu"></div>
        <div class="areaArrow" v-if="showArea"></div>
        <div class="priceArrow" v-if="showPrce"></div>
      </div>
      <div class="bottom">
         <div class="bottomItem" v-if="showQuyu">
          <div
            v-for="(item, index) in quyuList"
            :class="item.isChecked ? ' title checked' : 'title'"
            :key="index"
            @click="checkQuyu(item, index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="bottomItem" v-if="showArea">
          <div
            v-for="(item, index) in areaList"
            :class="item.isChecked ? ' title checked' : 'title'"
            :key="index"
            @click="checkArea(item, index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="bottomItem" v-if="showPrce">
          <div
            v-for="(item, index) in priceList"
            :class="item.isChecked ? ' title checked' : 'title'"
            :key="index"
            @click="checkPrice(item, index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaList } from '../api/lease'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      titleList: [  
        { id: 0, name: "区域", isChecked: true },
        { id: 1, name: "空间", isChecked: false },
        { id: 2, name: "单价", isChecked: false },
      ],
      quyuList: [],
      areaList: [
        { id: 0, name: "全部空间", value: null, isChecked: true },
        { id: 1, name: "1000m²以下", value: "-1000", isChecked: false },
        { id: 2, name: "1000m²-5000m²", value: "1000-5000", isChecked: false },
        { id: 3, name: "5000m²-10000m²", value: "5000-10000", isChecked: false },
        { id: 4, name: "10000m²-20000m²", value: "10000-20000", isChecked: false },
        { id: 5, name: "20000m²-30000m²", value: "20000-30000", isChecked: false },
        { id: 6, name: "30000m²以上", value: "30000-", isChecked: false },
      ],
      priceList: [
        { id: 0, name: "全部单价", value: null, isChecked: true },
        { id: 1, name: "1元以下", value: "-1", isChecked: false },
        { id: 2, name: "1-3元", value: "1-3", isChecked: false },
        { id: 3, name: "3-15元", value: "3-15", isChecked: false },
        { id: 4, name: "15-25元", value: "15-25", isChecked: false },
        { id: 5, name: "25-35元", value: "25-35", isChecked: false },
        { id: 6, name: "35元以上", value: "35-", isChecked: false },
        { id: 7, name: "面议", value: "negotiable", isChecked: false },
      ],
      showArea: false,
      showQuyu: true,
      showPrce: false,
      searchConf: {
          priceBetween: null,
          buildingAreaBetween: null,
          areaId: null,
      },
    };
  },
  computed: {
    ...mapState(['lease'])
  },
  created() {
    this.fetchStreetList()
  },
  methods: {
    async fetchStreetList() {
      let data = {
       category: 'MYSubdistrict'
      }
      let rsp = await getAreaList(data)
      if(rsp.code === 0) {
        let arr = rsp.data.data.items
        if(arr.length > 0) {
          arr.forEach(item => {
            if(item.id != '4100') {
              this.quyuList.push({
              id: item.id,
              name: item.name,
              isChecked: false
             })
            }
          })
          this.quyuList.unshift({id: -1, name: '全部区域', isChecked: true})
        }
      }
    },
    checkTitle(item, index) {
      this.titleList.map((item) => (item.isChecked = false));
      this.titleList[index].isChecked = true;
      this.showQuyu = index === 0 ? true : false;
      this.showArea = index === 1 ? true : false;
      this.showPrce = index === 2 ? true : false;
      this.quyuList.map((item) => (item.isChecked = false));
      this.areaList.map((item) => (item.isChecked = false));
      this.priceList.map((item) => (item.isChecked = false));
      this.quyuList[0].isChecked = true;
      this.areaList[0].isChecked = true;
      this.priceList[0].isChecked = true;
      this.searchConf.priceBetween = null;
      this.searchConf.buildingAreaBetween = null;
      this.searchConf.areaId = null;
       let searchConf = Object.assign(this.lease.searchConf, this.searchConf)
      this.$store.commit('changeSearchConf', searchConf)
      this.$emit('refreshList', this.searchConf)
    },
    checkArea(item, index) {
      this.areaList.map((item) => (item.isChecked = false));
      this.areaList[index].isChecked = true;
      this.searchConf.buildingAreaBetween = item.value
      this.searchConf.priceBetween = null
      let searchConf = Object.assign(this.lease.searchConf, this.searchConf)
      this.$store.commit('changeSearchConf', searchConf)
      this.$emit('refreshList', this.searchConf)
    },
    checkPrice(item, index) {
      this.priceList.map((item) => (item.isChecked = false));
      this.priceList[index].isChecked = true;
      this.searchConf.buildingAreaBetween = null
      this.searchConf.priceBetween = item.value
      let searchConf = Object.assign(this.lease.searchConf, this.searchConf)
      this.$store.commit('changeSearchConf', searchConf)
      this.$emit('refreshList', this.searchConf)
    },
    checkQuyu(item, index) {
      let arr = []
      this.quyuList.forEach(item => {
        arr.push({
            id: item.id,
            name: item.name,
            isChecked: false
        })
      })
      // this.quyuList.map((item) => (item.isChecked = false));
      this.quyuList = arr
      this.quyuList[index].isChecked = true;
      this.searchConf.buildingAreaBetween = null
      this.searchConf.priceBetween = null
      if(item.id !== -1) {
         this.searchConf.areaId = item.id
      }else {
        this.searchConf.areaId = null
      }
      let searchConf = Object.assign(this.lease.searchConf, this.searchConf)
      this.$store.commit('changeSearchConf', searchConf)
      this.$emit('refreshList', this.searchConf)
    }
  },
};
</script>

<style lang="less" scoped>
.box {
   padding: 20px 0;
   background-color: #fff;
  .content {
    padding: 0 0 20px 20px;
    width: 1200px;
    margin:0 auto;
    .one {
      width: 100%;
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      .title {
        font-size: 16px;
        margin-right: 50px;
        color: #8e8e8e;
        cursor: pointer;
        &:hover {
          color: #169bd5;
        }
      }
      .checked {
        color: #169bd5;
      }
    }
    .top {
      width: 100%;
      display: flex;
      align-items: center;
      .title {
        font-size: 16px;
        margin-right: 80px;
        color: #8e8e8e;
        cursor: pointer;
        &:hover {
          color: #169bd5;
        }
      }
      .checked {
        color: #169bd5;
      }
    }
    .line {
      width: 100%;
      border-bottom: 1px solid #e9e7e7;
      padding-bottom: 10px;
      position: relative;
      .quyuArrow {
        position: absolute;
        left: 10px;
        top: 0;
        width: 0;
        height: 0;
        border: 5px solid;
        border-color: transparent transparent #dddddd;
      }
      .areaArrow {
        position: absolute;
        left: 120px;
        top: 0;
        width: 0;
        height: 0;
        border: 5px solid;
        border-color: transparent transparent #dddddd;
      }
      .priceArrow {
        position: absolute;
        left: 230px;
        top: 0;
        width: 0;
        height: 0;
        border: 5px solid;
        border-color: transparent transparent #dddddd;
      }
    }
    .bottom {
      .bottomItem {
        display: flex;
        align-items: center;
        padding-top: 10px;
        flex-wrap: wrap;
        .title {
          font-size: 16px;
          margin-right: 50px;
          color: #8e8e8e;
          margin-bottom: 5px;
          cursor: pointer;
          &:hover {
            color: #169bd5;
          }
        }
        .checked {
          color: #169bd5;
        }
      }
    }
  }
}
</style>