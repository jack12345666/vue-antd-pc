<template>
  <common-layout>
    <div slot="header">
      <Header />
      <div class="nav-box">
        <div class="nav">
          <img
            style="width: 14.86px; height: 16px; margin-right: 5px"
            :src="homeImg"
          />
          <div class="title">你所在位置&nbsp;:&nbsp;</div>
          <div class="before-nav"><a :href="homeUrl">首页</a></div>
          <div class="now"><a @click="toList">空间厂房</a></div>
          <div class="now">{{leaseDetail.title || '厂房详情'}}</div>
        </div>
      </div>
      <div class="topTitle">
        <div class="top">
          <div class="title">{{leaseDetail.title}}</div>
          <div class="time">发布于: {{leaseDetail.createTime}}</div>
        </div>
      </div>
    </div>
    <div slot="content" :style="{ minHeight: box_height }">
      <div class="content">
        <div class="bannerInfo">
          <a-row>
            <a-col :span="16">
              <a-carousel arrows v-if="leaseDetail.attachmentList.length > 0">
                <div
                  slot="prevArrow"
                  class="custom-slick-arrow"
                  style="left: 10px; zIndex: 1;"
                >
                  <a-icon type="left-circle" />
                </div>
                <div
                  slot="nextArrow"
                  class="custom-slick-arrow"
                  style="right: 10px;"
                >
                  <a-icon type="right-circle" />
                </div>
                <div v-for="item in leaseDetail.attachmentList" :key="item.id">
                  <img :onerror="errorDefault" :src="item.filePath | imgFormat" alt="图片" />
                </div>
              </a-carousel>
              <div v-else>
                <img :src="require('@/img/img_preparing.jpg')" />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="rightInfo">
                <div class="item">
                  <!-- <div class="monthPrice" v-if="leaseDetail.price > 0">{{leaseDetail.price}}万元/月</div> -->
                  <div class="dayPrice" v-if="leaseDetail.price > 0">价格 {{leaseDetail.price}}元/㎡/天</div>
                  <div class="dayPrice" v-if="!leaseDetail.price && leaseDetail.priceLow && leaseDetail.priceHigh">价格 {{leaseDetail.priceLow}} - {{leaseDetail.priceHigh}} 元/㎡/天</div>
                  <div class="dayPrice" v-if="leaseDetail.price === -1">价格面议</div>  
                </div>
                <div class="item">
                  <div class="square">
                    <div class="value">{{leaseDetail.buildingArea}}㎡</div>
                    <div class="label">建筑面积</div>
                  </div>
                    <div class="square">
                    <div class="value">{{leaseDetail.floorArea}}㎡</div>
                    <div class="label">占地面积</div>
                  </div>
                </div>
                <div class="address">
                  <div class="direction">
                    <div class="label">地理位置</div>
                    <div class="value">{{leaseDetail.address}}</div>
                  </div>
                </div>
                <div class="item" style="border: none">
                  <div class="avatar">
                    <a-avatar :size="64" icon="user" />
                  </div>
                  <div class="personInfo">
                    <div class="name">联系人: {{leaseDetail.contactName}}</div>
                    <div class="title">联系手机: {{leaseDetail.contactMobile}}</div>
                    <div class="phone" v-if="leaseDetail.contactTel">联系电话: {{leaseDetail.contactTel}}</div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>

        <div class="baseInfo">
          <div class="title">基本信息</div>
          <div class="item">
            <div class="label">编号</div>
            <div class="value">{{leaseDetail.no}}</div>
          </div>
          <div class="item">
            <div class="label">所在区域</div>
            <div class="value">{{areaNames}}</div>
          </div>
          <div class="item">
            <div class="label">名称</div>
            <div class="value">{{leaseDetail.title}}</div>
          </div>
          <div class="item">
            <div class="label">地址</div>
            <div class="value">{{leaseDetail.address}}</div>
          </div>
        </div>

        <div class="detailInfo">
          <div class="title">详细信息</div>
          <a-row>
            <a-col :span="12">
              <div class="item">
                <div class="label">设计用途</div>
                <div class="value">{{leaseDetail.buildingUsage}}</div>
              </div>
            </a-col>
             <a-col :span="12">
              <div class="item">
                <div class="label">行车吨位</div>
                <div class="value">{{leaseDetail.bridgeCraneTon || '-'}}</div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <div class="item">
                <div class="label">用地性质</div>
                <div class="value">{{leaseDetail.landUsage}}</div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="item">
                <div class="label">是否标准厂房</div>
                <div class="value">{{leaseDetail.isStandard === 1 ? '是' : '否'}}</div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <div class="item">
                <div class="label">占地面积</div>
                <div class="value">{{leaseDetail.floorArea}}㎡</div>
              </div>
            </a-col>
           <a-col :span="12">
              <div class="item">
                <div class="label">建筑面积</div>
                <div class="value">{{leaseDetail.buildingArea}}㎡</div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <div class="item">
                <div class="label">用电</div>
                <div class="value">{{leaseDetail.electricity}}</div>
              </div>
            </a-col>
             <a-col :span="12">
              <div class="item">
                <div class="label">目前空余面积</div>
                <div class="value">{{leaseDetail.spareArea ? `${leaseDetail.spareArea}㎡` : '-'}}</div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <div class="item">
                <div class="label">总楼层</div>
                <div class="value">{{leaseDetail.totalFloor || '-'}}</div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="item">
                <div class="label">价格区间低价</div>
                <div class="value">{{leaseDetail.priceLow ? `${leaseDetail.priceLow} 元/㎡/天` : '-'}}</div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <div class="item">
                <div class="label">层高</div>
                <div class="value">{{leaseDetail.floorHeight || '-'}}</div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="item">
                <div class="label">价格区间高价</div>
                <div class="value">{{leaseDetail.priceHigh ? `${leaseDetail.priceHigh} 元/㎡/天` : '-'}}</div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <div class="item">
                <div class="label">承重</div>
                <div class="value">{{leaseDetail.loadBearing || '-'}}</div>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="item">
                <div class="label">厂房结构</div>
                <div class="value">{{leaseDetail.millConstruction || '-'}}</div>
              </div>
            </a-col>
          </a-row>
           <a-row>
             <a-col :span="12">
              <div class="item">
                <div class="label">是否有电梯</div>
                <div class="value">{{leaseDetail.existElevator === 1 ? '是' : '否'}}</div>
              </div>
            </a-col>
           <a-col :span="12">
              <div class="item">
                <div class="label">是否有行车</div>
                <div class="value">{{leaseDetail.bridgeCrane === 1 ? '是' : '否'}}</div>
              </div>
            </a-col>
          </a-row>
        </div>

        <div class="leaseDescription">
          <div class="title">租赁说明</div>
          <div class="description" v-html="leaseDetail.description"></div>
        </div>
      </div>
    </div>
  </common-layout>
</template>

<script>
import { LOGINURL } from "../../utils/config";
import { getLeaseDetail } from "../../api/lease";
import { getArrayProps } from '../../utils/utils'
export default {
  data() {
    return {
      homeUrl: LOGINURL,
      homeImg: require("@/assets/home.png"),
      leaseId: null,
      box_height: null,
      leaseDetail: null, 
      areaNames: '',
      errorDefault: 'this.src="' + require('../../img/img_preparing.jpg') + '"'
    }
  },
  created() {
    this.leaseId = this.$route.params.id;
    this.getHeight();
    if (this.leaseId) {
      this.fetchLeaseDetail();
    }
  },
  methods: {
    async fetchLeaseDetail() {
      let rsp = await getLeaseDetail(this.leaseId);
      if (rsp.code === 0) {
        this.leaseDetail = rsp.data.data
        this.areaNames = getArrayProps(this.leaseDetail.streetList, "areaName").join(",")
      }
    },
    getHeight() {
      this.box_height = window.innerHeight - 340 + "px";
    },
    toList() {
      this.$router.push("/");
    },
  }
}
</script>
<style lang="less" scoped>
.topTitle {
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
  .top {
    width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
    .time {
      color: #999;
      margin-top: 5px;
    }
  }
}
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
      a {
        color: #666;
      }
    }
    .now:before {
      content: "\00bb\00a0";
      padding: 0 8px;
      color: #ccc;
    }
  }
}
.content {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 0;
  .bannerInfo {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    img {
      width: 100%;
      height: 400px;
    }

    .rightInfo {
      margin-left: 40px;
      .item {
        display: flex;
        align-items: center;
        padding: 15px 0;
        border-bottom: 1px solid #f8f8f8;
        .monthPrice {
          color: #ff6744;
          font-size: 18px;
          margin-right: 50px;
        }
        .dayPrice {
          color: #ff6744;
          font-size: 18px;
        }
        .square {
          margin-right: 50px;
          .value {
            color: #5f5f5f;
            font-size: 20px;
            margin-bottom: 15px;
          }
          .label {
            color: #7b7b7b;
            font-size: 16px;
          }
        }
        .avatar {
          margin-top: -10px;
        }
        .personInfo {
          font-size: 16px;
          margin-left: 20px;
          padding-top: 5px;
          .name {
            color: #555555;
            margin-bottom: 10px;
          }
          .title {
            color: #b7b7b7;
            margin-bottom: 10px;
          }
          .phone {
            color: #b7b7b7;
          }
        }
      }
      .contact {
        margin-top: 30px;
      }
      .address {
        padding: 15px 0;
        border-bottom: 1px solid #f8f8f8;
        .direction {
          display: flex;
          font-size: 16px;
          margin-bottom: 15px;
          &:last-child {
            margin-bottom: 5px;
          }
          .label {
            color: #b7b7b7;
            width: 100px;
          }
          .value {
            color: #c0c0c0;
            flex: 1;
          }
        }
      }
    }
  }

  .baseInfo {
    background-color: #fff;
    padding: 20px;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      margin-top: 5px;
      .label {
        width: 100px;
        color: #999;
      }
      .value {
        flex: 1;
        color: #666;
      }
    }
  }

  .detailInfo {
    background-color: #fff;
    padding: 20px;
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .item {
      display: flex;
      flex-wrap: wrap;
      margin-top: 5px;
      .label {
        width: 120px;
        color: #999;
      }
      .value {
        flex: 1;
        color: #666;
      }
    }
  }

  .leaseDescription {
    background-color: #fff;
    padding: 20px;
    width: 1200px;
    margin: 0 auto;
    margin: 20px 0 50px 0;
    .title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }
  }
}
</style>