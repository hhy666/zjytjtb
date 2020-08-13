<template>
  <view class="index">
    <view class="page_top">
      <a class="page_top_back" @click="returnIndexHtml()" >{{back}}</a>  
      <view class="page_title" >
        <text>{{ title }}</text>
      </view>
    </view>  
    <view class="page_top_next" >
      <view class="ptn_left" >
        <text class="second_title" >{{secondTitle}}</text>
        <text class="data_date" >{{dataDate}}</text>
      </view>
      <a class="ptn_right" @click="showOrHideExplain()" >
          <view class="ptn_right_left" >
            <text class="circle" >?</text>
          </view>
          <text class="data_explain" >{{dataExplain}}</text>
      </a>
    </view>
    <view class="today_total_msg" >
      <TodayTotal></TodayTotal>
    </view>
    <view class="sr_com" >
      <compare ></compare>
    </view>
    <view class="sr_zb" v-if="showedTabId != 'zj'" >
      <zbpie></zbpie>
    </view>
    <view class="sr_gx" v-if="showedTabId != 'zj'" >
      <gxbar></gxbar>
    </view>
    <view class="area_tab" :style="{top: showedTabId != 'zj' ? '1106Px' : '566Px' }" >
      <selectTab :tabData="tabData" :setChoosedIndex="setChoosedIndex" ></selectTab>
    </view>
    <view class="area_tab_body" :style="{top: showedTabId != 'zj' ? '1156Px' : '616Px' }" >
      <zjTabBody v-if="showedTabId == 'zj'" :showedTabIndex="showedTabIndex" ></zjTabBody>
      <jtgsTabBody v-if="showedTabId != 'zj'" :showedTabIndex="showedTabIndex" ></jtgsTabBody>
    </view>
    
    <a v-if="showedTabId != 'zj'" class="change_company" @click="showChoosedCompany()" >公司  切换</a>
    <showCompany v-if="showCompany" :showChoosedCompany="showChoosedCompany" ></showCompany>
    <explain v-if="isShowExplain" :showOrHideExplain="showOrHideExplain" ></explain>
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
import gxbar from '../gxbar/gxbar.vue'
import showCompany from '../showCompany/showCompany.vue'

export default {
  data () {
    return {
      back:'<',
      title: '中检一天',
      secondTitle:String,
      dataDate: "数据更新截止 " + new Date().toISOString().slice(0,10) + ' ' + new Date().toTimeString().slice(0,8),
      dataExplain: "数据说明",
      isShowExplain:false,
      pmHeight:Number,
      tabData:Array,
      showedTabId:'zj',
      showedTabIndex:0,
      showCompany:false,
      scrollTop:Number
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
    showCompany: showCompany
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
      // 类型名称
      Taro.setStorageSync("showTypeName", '中检一天');
      // 该属性用来区分显示中检一天tab标签还是具体公司tab标签
      // 同时用来进行查询相关数据传参
      this.showedTabId = 'zj';
      this.secondTitle = '中检一天';

      this.tabData = [];

      this.tabData.push({name:'公司', id: 'zj', isChecked: true});
      this.tabData.push({name:'区域公司', id: 'zj', isChecked: false});
      this.tabData.push({name:'产品线', id: 'zj', isChecked: false});
      this.tabData.push({name:'客户', id: 'zj', isChecked: false});
    }else{
      this.showedTabId = Taro.getStorageSync("showType");
      this.secondTitle = Taro.getStorageSync("showTypeName");

      this.tabData = [];

      this.tabData.push({name:'公司', id: 'zj', isChecked: true});
      this.tabData.push({name:'产品线', id: 'zj', isChecked: false});
      this.tabData.push({name:'客户', id: 'zj', isChecked: false});
    }

    // 置顶
    document.scrollingElement.scrollTop = 0;
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
      Taro.setStorageSync("showTypeName",'中检一天');

      Taro.reLaunch({
          url:'/pages/index/index'
      });
    }
  }
}
</script>
