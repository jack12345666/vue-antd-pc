<template>
  <div class="box">
      <div class="header">
          <div class="logo">
              <img src="../assets/logo.jpg" style="width: 400px;" />
          </div>
          <div class="userInfo">
              <div class="userName" v-if="userName">欢迎，a123456</div>
              <div class="register" v-else>
                 <a :href="registerUrl"><a-button class="registerBtn">注册</a-button></a>
              </div>
              <div class="centerInfo">
                  <a :href="centerInfoUrl" v-if="userName"><a-button type="primary" class="centerBtn">个人中心</a-button></a>
                  <a :href="loginUrl" v-else><a-button class="loginBtn">登录</a-button></a> 
                </div>
              <div class="help"><a :href="helpUrl"><a-button type="primary" class="helpBtn">帮助</a-button></a> </div>
          </div>
      </div>
        <div class="navMenu">
          <div class="menuList">
            <div class="menuItem"><a :href="menuObj.index">首页</a></div>
            <div class="menuItem subItem menuItemActived">
              <span>投资钱塘</span>
              <ul class="subUl">
                <li><a :href="menuObj.investment1">推介用地</a></li>
                <li><a :href="menuObj.investment2">区域优势</a></li>
                <li><a :href="menuObj.investment3">主导产业</a></li>
                <li><a :href="menuObj.investment">空间厂房</a></li>
                <li><a :href="menuObj.investment4">平台载体</a></li>
                <li><a :href="menuObj.investment5">生活钱塘</a></li>
              </ul>
            </div>
            <div class="menuItem"><a :href="menuObj.innovate">创新钱塘</a></div>
            <div class="menuItem"><a :href="menuObj.check">办事审批</a></div>
            <div class="menuItem subItem">
              <span>政策服务</span>
              <ul class="subUl">
                <li><a :href="menuObj.policy">政策原文</a></li>
                <li><a :href="menuObj.read">政策解读</a></li>
                <li><a :href="menuObj.pay">政策兑付</a></li>
              </ul>
            </div>
            <div class="menuItem"><a :href="menuObj.project">项目申报</a></div>
            <div class="menuItem subItem">
              <span>资源超市</span>
              <ul class="subUl">
                <li class="liText">
                  <span>涉审中介服务</span>
                  <div class="thirdItem">
                    <a :href="menuObj.out" target="_blank">杭州市投资项目审批中介网</a>
                  </div>
                </li>
                <li><a :href="menuObj.other">其他涉企服务</a></li>
                <li><a :href="menuObj.qiantang">钱塘智造</a></li>
              </ul></div>
            <div class="menuItem"><a :href="menuObj.appeal">诉求办理</a></div>
          </div>
         </div>

        <!-- <div class="nav-box">
         <div class="nav">
            <img
             style="width: 14.86px;height: 16px;margin-right: 5px;"
             :src="homeImg"
           />
           <div class="title">你所在位置&nbsp;:&nbsp;</div>
           <div class="before-nav"> <a :href="homeUrl">首页</a></div>
           <div class="now">投资钱塘</div>
         </div>
        </div> -->
  </div>
</template>

<script>
import { MALLURL, LOGINURL } from '../utils/config'
import { getCookieVal } from '../utils/utils'
export default {
    data() {
        return {
            centerInfoUrl: LOGINURL + '/user/mcenter.html',
            helpUrl:  LOGINURL + '/help/pc.html',
            loginUrl: LOGINURL + '/user/login.html',
            registerUrl: LOGINURL + '/user/reg.html',
            userName: '',
            // homeUrl: BASEURL, 
            // homeImg: require('@/assets/home.png'),
            menuObj: {},
        }
    },
    created() {
        this.userName = getCookieVal("showUserName") || ""
        this.menuObj = {
            index: LOGINURL + '/index.html',
            invest : LOGINURL + '/invest-service.html',
            innovate:  LOGINURL + '/innovate-qiantang.html',
            check : LOGINURL + '/check.html',
            policy: LOGINURL + '/policy-service.html',
            investment1: LOGINURL + '/invest-service-1.html',
            investment2: LOGINURL + '/invest-service-2.html',
            investment3: LOGINURL + '/invest-service-3.html',
            investment: LOGINURL + '/investment/index.html',
            investment4: LOGINURL + '/invest-service-4.html',
            investment5: LOGINURL + '/invest-service-5.html',
            read: LOGINURL + '/news-list.html?type=18&bread=政策解读',
            pay: LOGINURL + '/policypayment-service.html',
            project: LOGINURL + '/project-service.html',
            out: 'http://115.29.14.40/was/ais/portal/hz/index.jsp',
            other: MALLURL + '/index.html#/?id=210',
            qiantang: MALLURL + '/index.html#/?id=211',
            appeal: LOGINURL + '/appeal-transact.html'
     }
    }
}
</script>

<style lang="less" scoped>
.box {
    background-color: #fff;
    width: 100%;
    .header {  
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        a {
            text-decoration: none;
        }
        .userInfo {
            display: flex;
            align-items: center;
            .userName {
                margin-right: 15px;
                font-size: 16px;
            }
            .register {
                font-size: 16px;
                margin-right: 5px;
                .registerBtn {
                    padding:8px 16px;
                    height: 36px;
                    line-height: 20px;
                    font-size: 16px;
                    border-color: #59bcdb;
                    color: #59bcdb;
                    &:hover {
                        background-color: #59bcdb;
                        color: #fff;
                   }
                }
            }
            .centerInfo {
                margin-right: 5px;
                .loginBtn {
                    padding:8px 16px;
                    height: 36px;
                    line-height: 20px;
                    font-size: 16px;
                    border-color: #59bcdb;
                    color: #59bcdb;
                    &:hover {
                        background-color: #59bcdb;
                        color: #fff;
                   } 
                }
                .centerBtn {
                    background-color: #5eb95e;
                    padding:8px 16px;
                    height: 36px;
                    line-height: 20px;
                    font-size: 16px;
                    border: none;
                }
            }
            .help {
                .helpBtn {
                    background-color: #0e90d2;
                    padding: 8px 16px;
                    height: 36px;
                    font-size: 16px;
                    line-height: 20px;    
                }
            }
        }
    }

    //  .nav-box {
    //     width: 100%;
    //     background-color: #fafafa;
    //    .nav {
    //     display: flex;
    //     height: 54px;
    //     align-items: center;
    //     width: 1200px;
    //     margin: 0 auto;
    //      .title {
    //          font-size: 16px;
    //      }
    //     .indexHome {
    //       color: #999;
    //       &:hover {
    //         cursor: pointer;
            
    //       }
    //     }
    //     .before-nav {
    //         margin: 0 5px;
    //         font-size: 16px;
    //         a {
    //             text-decoration: none;
    //             color: #666;
    //         }
    //     }
    //     .now {
    //         color:#999999;
    //         font-size: 16px;
    //     }
    //     .now:before {
    //         content: "\00bb\00a0";
    //         padding: 0 8px;
    //         color: #ccc;
    //     }
    //  }
    // }

     .navMenu {
      ul, li{
        list-style: none;
        padding:0;
        margin:0;
      }
      width:100%;
      margin: 0 auto;
      background-color: #1e9fff;
      color: #fff;
      height: 56px;
      line-height: 56px;
      .menuList {
        display: flex;
        justify-content: center;
        align-items: center;
        .menuItem {
          width: 160px;
          text-align: center;
          font-size: 16px;
          &:hover {
            background-color: #117ecf;
          }
          a {
              color: #fff;
          }
        }
        .menuItemActived {
             background-color: #117ecf;
        }
        .subItem {
          position: relative;
          .subUl {
            z-index: 10000;
            box-shadow: 0 3px 3px 3px #f5f5f5;
            width: 160px;
            position: absolute;
            text-align: center;
            top: 56px;
            left: 0;
            display: none;
            background-color: #fff;
            a {
              color: #000;
              &:hover {
                color: #1e9fff;
              }
            }
            li {
              border-bottom: 1px solid #eeebeb;
              &:last-child {
                border-bottom: none;
              }
            }
           
            .liText {
              color: #000;
              position: relative;
              &:hover {
                color: #1e9fff;
              }
              &:hover  .thirdItem{
                display: block;
              }
              .thirdItem {
                z-index: 10000;
                background-color: #fff;
                display: none;
                position: absolute;
                left: 160px;
                top: 0;
                width: 210px;
                padding: 0 5px;
                box-shadow: 0 3px 3px 3px #f5f5f5;
              }
            }
          }
          &:hover .subUl{
            display: block;
          }
        }
      }
    }

}
</style>