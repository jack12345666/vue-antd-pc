<template>
  <div class="box">
    <div id="map" :style="{ width: '100%', height: height }"></div>
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图
import { mapState } from 'vuex'
export default {
  props: {
    center: {
      type: Array,
      default: function() {
        return [120.335267, 30.305888]
      }
    },
    height: {
      type: String,
      default: '100vh'
    },
    outletsList: {
      type: Array,
      default: function() {
        return []
      }
    },
    outletsData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
        mMap: null,
    }
  },
  computed: {
      ...mapState(['outlets'])
  },
  mounted() {
    this.init()
  },
  methods: {
     checkOutLets() {
     let data = this.outlets.outletsData

        let infoWindowContent = `
        <div
          class="listItem"
        >
          <div class="name">${data.name}</div>
          <div class="address">地址：${data.address}</div>
          <div class="tel">电话：${data.tel}</div>
          
        </div>
        </div>
        `
        let infoWindowContent1 = `
        <div
          class="listItem"
        >
          <div class="name">${data.name}</div>
          <div class="address">地址：${data.address}</div>
          <div class="tel">运行状态：${data.runStatus === 1 ? '运行' : '在建'}</div>  
        </div>
        </div>
        `

        // // 创建一个自定义内容的 infowindow 实例
        let infoWindow = new AMap.InfoWindow({
          position: [data.lng, data.lat],
          offset: new AMap.Pixel(0, -35),
          content: data.category === '5004' ? infoWindowContent1 : infoWindowContent
        })

        infoWindow.open(this.mMap)
   
     },
    init() {
      this.mMap = new AMap.Map('map', {
        center: this.center,
        resizeEnable: true,
        zoom: 11,
        attributionControl: false,
        zoomEnable: true,
        dragEnable: true,
        mapStyle: 'amap://styles/a82e7b1f1f7c2ae354ed40bf2cb8fe8b'
      })
     if(this.outletsList.length > 0) {
      var that = this
      this.outletsList.forEach(function(marker) {
        let mark = new AMap.Marker({
          map: that.mMap,
          clickable: true,
          icon: 'http://dev.chuangwo.net:17988/qttzzj/2021/01/07/87eafcdf5b994949a58f59134630ee65.png',
          position: [marker.lng, marker.lat],
          offset: new AMap.Pixel(-13, -30)
        })

        mark.setLabel({
          offset: new AMap.Pixel(0, 0), // 设置文本标注偏移量
        //   content: `<div class='info'>${marker.name}</div>`, // 设置文本标注内容
          direction: 'bottom' // 设置文本标注方位
        })

        let infoWindowContent = `
        <div
          class="listItem"
        >
          <div class="name">${marker.name}</div>
          <div class="address">地址：${marker.address}</div>
          <div class="tel">电话：${marker.tel}</div>
          
        </div>
        </div>
        `
        let infoWindowContent1 = `
        <div
          class="listItem"
        >
          <div class="name">${marker.name}</div>
          <div class="address">地址：${marker.address}</div>
          <div class="tel">运行状态：${marker.runStatus === 1 ? '运行' : '在建'}</div>  
        </div>
        </div>
        `

        // 创建一个自定义内容的 infowindow 实例
        let infoWindow = new AMap.InfoWindow({
          position: [marker.lng, marker.lat],
          offset: new AMap.Pixel(0, -35),
          content: marker.category === '5004' ? infoWindowContent1 : infoWindowContent
        })

        AMap.event.addListener(mark, 'click', function() {
          infoWindow.open(that.mMap)
        })

      })
     }
    }
  }
}
</script>

<style lang="less">
.amap-logo {
  opacity: 0; //去掉高德地图logo
}
.amap-copyright {
  opacity: 0; //去掉高德的版本号
}
.amap-icon img {
  width: 35px;
  height: 35px;
}
.amap-marker-label {
  border: 0;
  border-color: #fff;
  background: transparent;
}
.bottom-center .amap-info-sharp {
  border-top: 8px solid #efeff41a;
}
.info {
  border-color: #fff;
  color: #fff;
  width: 80px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.amap-info-content {
  background: #292a3a !important;
  padding: 0;
  width: 230px;
  min-height: 100px;
  border-radius: 10px;
  overflow: auto;
}
.listItem {
   margin-bottom: 10px;
   padding: 10px;
   color: #fff;
   .name {
       margin: 8px 0 5px 0;
   }
    .address {
        font-size: 12px;
        color: #cfcfcf;
        margin-bottom: 3px;
    }
    .tel {
        font-size: 12px;
        color: #cfcfcf;
    }
  
}
</style>
