<template>
  <view class="index">
    <view class="page_top">
      <a class="page_top_back" @click="returnIndexHtml()" >
        <img :src=back width="100%" height="70%" />
      </a>  
      <view class="page_title" >
        <text>{{ title }}</text>
      </view>
    </view>  
    <view class="page_top_next" >
      <view class="ptn_left" >
        <text class="second_title" >{{secondTitle}}</text>
        <text class="data_date" >{{dataDate}}</text>
      </view>
      <view class="ptn_right" >
        <a class="ptn_right_1" @click="showOrHideExplain()" >
          <view class="ptn_right_left" >
            <text class="circle" >?</text>
          </view>
          <text class="data_explain" >{{dataExplain}}</text>
        </a>
        <a class="ptn_right_2" @click="showOrHideComMsg()" v-if="false" >
            <view class="ptn_right_left" >
              <text class="circle" ></text>
            </view>
            <text class="data_explain" >{{comMsg}}</text>
        </a>
      </view>
    </view>
    <view class="today_total_msg" >
      <TodayTotal></TodayTotal>
    </view>
    <view class="sr_com" >
      <compare v-if="showedTabId != 3" ></compare>
      <gykphb v-if="showedTabId == 3" ></gykphb>
    </view>
    <view class="sr_zb" v-if="showedTabId != 0" >
      <zbpie v-if="showedTabId != 3" ></zbpie>
      <srpie v-if="showedTabId == 3" ></srpie>
    </view>
    <view class="sr_gx" v-if="showedTabId != 0" >
      <gxbar v-if="showedTabId != 3" ></gxbar>
      <srbar v-if="showedTabId == 3" ></srbar>
    </view>
    <view class="cpx_gx" v-if="showedTabId == 3" >
      <gxbar ></gxbar>
    </view>
    <view class="area_tab" :style="{top: areaTabTop[showedTabId] + 'Px'}" >
      <selectTab :tabData="tabData" :setChoosedIndex="setChoosedIndex" ></selectTab>
    </view>
    <view class="area_tab_body" :style="{top: (areaTabTop[showedTabId] + 50)+ 'Px'}" >
      <zjTabBody v-if="showedTabId == 0" :showedTabIndex="showedTabIndex" ></zjTabBody>
      <jtgsTabBody v-if="showedTabId == 1 || showedTabId == 2" :showedTabIndex="showedTabIndex" ></jtgsTabBody>
      <cpxTabBody v-if="showedTabId == 3" :showedTabIndex="showedTabIndex" ></cpxTabBody>
    </view>
    
    <a v-if="showedTabId == 1 || showedTabId == 2" class="change_company" @click="showChoosedCompany()" >公司  切换</a>
    <showCompany v-if="showCompany" :showChoosedCompany="showChoosedCompany" ></showCompany>
    <explain v-if="isShowExplain" :showOrHideExplain="showOrHideExplain" ></explain>
    <a v-if="showToTop0" class="zhiding" @click="toTop0()" >置顶</a>
  </view>
</template>

<script>
import './index.scss'
import Taro from '@tarojs/taro'
import { $ } from '@tarojs/extend';
import TodayTotal from '../todayTotal/totadyTotal.vue'
import explain from '../explain/explain.vue'
import compare from '../compare/compare.vue'
import selectTab from '../selectTab/selectTab.vue'
import zjTabBody from '../zjTabBody/zjTabBody.vue'
import jtgsTabBody from '../jtgsTabBody/jtgsTabBody.vue'
import zbpie from '../zbpie/zbpie.vue'
import srpie from '../srpie/srpie.vue'
import gxbar from '../gxbar/gxbar.vue'
import srbar from '../srbar/srbar.vue'
import showCompany from '../showCompany/showCompany.vue'
import gykphb from '../gykphb/gykphb.vue'
import cpxTabBody from '../cpxTabBody/cpxTabBody.vue'
import backPng from '@/static/images/back.png'

export default {
  data () {
    return {
      back:backPng,
      title: '中检一天',
      secondTitle:String,
      dataDate: "数据更新截止 " + new Date().toISOString().slice(0,10) + ' ' + new Date().toTimeString().slice(0,8),
      dataExplain: "数据说明",
      comMsg: "公司信息",
      isShowExplain:false,
      pmHeight:Number,
      tabData:Array,
      showedTabId:'zj',
      showedTabIndex:0,
      showCompany:false,
      scrollTop:Number,
      areaTabTop:[586,1126,1126,1396],
      showToTop0:false
    }
  },
  components: {
    TodayTotal: TodayTotal,
    explain: explain,
    compare: compare,
    selectTab: selectTab,
    zjTabBody: zjTabBody,
    jtgsTabBody: jtgsTabBody,
    zbpie: zbpie,
    gxbar: gxbar,
    showCompany: showCompany,
    gykphb: gykphb,
    srpie: srpie,
    srbar: srbar,
    cpxTabBody: cpxTabBody
  },
  created(){
    // 如果params 获得的值是undefined 则是首次进入页面 重置所有缓存信息
    const params = decodeURIComponent(this.tid.substring(this.tid.indexOf('=')+1))
    console.log(params);

    // 初始化时 判断 是否已经缓存了展示类型 和 展示类型名称
    const showType = Taro.getStorageSync("showType");

    if(params == 'undefined' || showType == ''){
      // 类型 zj 表示 中检一天 其他 表示具体公司
      Taro.setStorageSync("showType", 'zj');
      // 范围 0 集团 1 公司 2 区域公司 3 产品线
      Taro.setStorageSync("showArea",0);
      // 类型名称
      Taro.setStorageSync("showTypeName", '中检一天');
      // 该属性用来区分显示中检一天tab标签还是具体公司tab标签
      // 同时用来进行查询相关数据传参
      this.showedTabId = Taro.getStorageSync("showArea");
      this.secondTitle = '中检一天';

      this.tabData = [];

      this.tabData.push({name:'公司', isChecked: true});
      this.tabData.push({name:'区域公司', isChecked: false});
      this.tabData.push({name:'产品线', isChecked: false});
      this.tabData.push({name:'客户', isChecked: false});
    }else{
      this.showedTabId = Taro.getStorageSync("showArea");
      this.secondTitle = Taro.getStorageSync("showTypeName")+'一天';

      this.tabData = [];

      if(this.showedTabId == 1 || this.showedTabId == 2){
        this.tabData.push({name:'公司', isChecked: true});
        this.tabData.push({name:'产品线', isChecked: false});
        this.tabData.push({name:'客户', isChecked: false});
      }else{
        this.tabData.push({name:'公司', isChecked: true});
        this.tabData.push({name:'服务技术', isChecked: false});
        this.tabData.push({name:'服务对象', isChecked: false});
        this.tabData.push({name:'客户', isChecked: false});
      }
    }

    // 置顶
    document.scrollingElement.scrollTop = 0;
    // 时间
    this.setNowTime();
    // 设置tab fixed
    this.setTabFixed();
  },
  mounted(){
    
  },
  methods:{
    showOrHideExplain(){
      this.isShowExplain = !this.isShowExplain;
    },
    setChoosedIndex(idx){
      this.showedTabIndex = idx;
    },
    showChoosedCompany(){
      if(!this.showCompany){
        this.scrollTop = document.scrollingElement.scrollTop;
        $('body').addClass('modal-open');
        document.body.style.top = -this.scrollTop + 'px';
      }else{
        $('body').removeClass('modal-open');
        document.scrollingElement.scrollTop = this.scrollTop;
      }

      this.showCompany = !this.showCompany;
    },
    returnIndexHtml(){
      // 设置 点击的公司信息
      Taro.setStorageSync("showType",'zj');
      Taro.setStorageSync("showArea",0);
      Taro.setStorageSync("showTypeName",'中检一天');

      Taro.reLaunch({
          url:'/pages/index/index'
      });
    },
    setNowTime(){
      const _this = this;
      setInterval(()=>{
        _this.dataDate = "数据更新截止 " + new Date().toISOString().slice(0,10) + ' ' + new Date().toTimeString().slice(0,8);
      },1000);
    },
    setTabFixed(){
      const _this = this;
      window.onscroll = function(){
        const sctop = document.scrollingElement.scrollTop;
        if(_this.showedTabId == 0){
          const classs = ".zjTabBody .gstj_table_head, .zjTabBody .qygstj_table_head,"
                       + ".zjTabBody .cpxtj_table_head, .zjTabBody .khtj_table_head";
          _this.setCssByClass(classs,sctop,670);
        }else if(_this.showedTabId == 1 || _this.showedTabId == 2){
          const classs = ".jtgsTabBody .jtgskhtj_table_head, .jtgsTabBody .jtgscpxtj_table_head, "
                       + ".jtgsTabBody .jtgsgstj_table_head";
          _this.setCssByClass(classs,sctop,1200);
        }else if(_this.showedTabId == 3){
          const classs = ".cpxTabBody .cpxgstj_table_head, .cpxTabBody .fwjstj_table_head, "
                       + ".cpxTabBody .khtj_table_head";
          _this.setCssByClass(classs,sctop,1470);
        }
      }      
    },
    setCssByClass(classs,sctop,val){
      if(sctop >= val){
        this.showToTop0 = true;
        $(classs).css({
          position: "fixed",
          top: "0Px",
          width: "90%"
        });
      }else{
        this.showToTop0 = false;
        $(classs).css({
          position: "relative",
          top: "0",
          width: "100%"
        });
      }
    },
    toTop0(){
      document.scrollingElement.scrollTop = 0;
      this.showToTop0 = false;
    }
  }
}
</script>
