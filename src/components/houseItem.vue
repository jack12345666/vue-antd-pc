<template>
  <div class="box">
      <div class="content">
          <div class="houseItem" v-for="item in venusList" :key="item.id" @click="toLeaseDetail(item)">
              <div class="img">
                  <img v-if="item.mainPic" :onerror="errorDefault" :src="item.mainPic | imgFormat" alt="image"/>
                  <img v-else :src="requiure('../img/img_preparing.jpg')" alt="image"/>
              </div>
              <div class="info">
                  <div class="title">{{item.title}}</div>
                  <div class="moreInfo">
                      <div class="address">
                          <div class="addr">{{item.address}} </div>
                          <div class="floorHeight">{{item.totalFloor}}</div>
                      </div>
                      <div class="squareInfo">
                          <div class="square">{{item.buildingArea ? `${item.buildingArea}㎡` : '-'}}</div>
                          <div class="lable">建筑面积</div>
                      </div>
                      <div class="price" v-if="item.price > 0">
                          <div class="dayPrice">租金<span style="font-size: 20px;padding: 5px;">{{item.price}}</span>元/㎡/天</div>
                          <!-- <div class="monthPrice">月租金 <span style="padding: 0 2px;">{{(item.price*item.buildingArea*30/10000).toFixed(2)}}</span>万/月</div> -->
                      </div>
                      <div class="price" v-if="item.price === -1">
                          <div class="dayPrice"><span style="font-size: 16px;padding-right: 5px;">价格面议</span></div>
                      </div>
                      <div class="price" v-if="!item.price && item.priceLow && item.priceHigh">
                       <div class="dayPrice">租金 {{item.priceLow}} - {{item.priceHigh}} 元/㎡/天</div>
                       <!-- <div class="monthPrice">月租金 <span style="padding: 0 2px;">{{(item.priceLow*item.buildingArea*30/10000).toFixed(2)}} - {{(item.priceHigh*item.buildingArea*30/10000).toFixed(2)}}</span>万/月</div> -->
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        venusList: {
            type: Array,
            default: function() {
                return []
            }
        },
    },
    data() {
        return {
            errorDefault: 'this.src="' + require('../img/img_preparing.jpg') + '"'
        }
    },
    methods: {
        toLeaseDetail(item) {
            this.$router.push('/leaseDetail/'+item.id) 
        }
    }
}
</script>

<style lang='less' scoped>
.box {
    width: 100%;
    .content {
        width: 1200px;
        margin: 0 auto;
        .houseItem {
            width: 100%;
            display: flex;
            padding: 20px 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
             background-color: #fff;
            &:hover {
                background-color: #fff;
                cursor: pointer;
                box-shadow: 0 10px 20px 0 #e5e5e5;
            }
            &:last-child {
                border-bottom: none;
            }
            .img {
                img {
                   width: 300px;
                   height: 170px; 
                   border-radius: 5px;
                }
            }
            .info {
                flex: 1;
                margin-left: 15px;
                .title {
                  font-size: 18px;
                  font-weight: 700;  
                  margin-bottom: 20px;
                  color: #000;
                }
                .moreInfo {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: nowrap;
                    width: 100%;
                    .address {
                        width: 360px;
                        overflow: hidden;
                        color: #666;
                        font-size: 16px;
                        .addr {
                             overflow: hidden;
                             white-space: nowrap;
                             text-overflow: ellipsis;
                             margin-bottom: 15px;
                        }
                    }
                    .squareInfo {
                       flex: 1;
                       color: #666;
                       font-size: 16px;
                       margin-left: 50px;
                       .square {
                            font-weight: 700;
                            margin-bottom: 15px;
                        }
                    }
                    .price {
                        font-size: 16px;
                        margin-right: 20px;
                        .dayPrice {
                          color: #fe8e75;
                          margin-bottom: 15px;
                        }
                        .monthPrice {
                            color: #666;
                        }
                    }
                }
            }
        }
    }
}
</style>