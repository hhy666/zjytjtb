<template>
  <view class='jtgsgstj'>
    <view class="jtgsgstj_part_1" >
      <text class="jtgsgstj_part_1_title" >{{jtgsgstjPart1Title}}</text>
      <view class="jtgsgstj_table" >
        <view class="jtgsgstj_table_head" >
            <text class="jtgsgstj_table_head_th" >公司</text>
            <text class="jtgsgstj_table_head_th" >委托单量</text>
            <text class="jtgsgstj_table_head_th" >开票收入</text>
            <text class="jtgsgstj_table_head_th" >成本总额</text>
            <text class="jtgsgstj_table_head_th" >出证数量</text>
        </view>
        <view class="jtgsgstj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <!-- 暂时不做下钻 -->
            <!-- <text class="jtgsgstj_table_head_td" v-if="curCompanyId == item.id" >{{item.gsname}}</text>
            <a class="jtgsgstj_table_head_td gtht_a" @click="gotoGsDetail(index)" v-else >{{item.gsname}}</a> -->
            <text class="jtgsgstj_table_head_td" 
              @touchstart="touchStart($event,item.gsname,index)" 
              @touchend="touchEnd($event,item.gsname,index)" 
              :title="item.gsname" >
              {{item.gsname.length > 6 ? item.gsname.substr(0,6) + '..' : item.gsname}}
            </text>
            <text class="jtgsgstj_table_head_td" >{{item.wtdl}}</text>
            <text class="jtgsgstj_table_head_td" >{{item.kpsr}}</text>
            <text class="jtgsgstj_table_head_td" >{{item.cbze}}</text>
            <text class="jtgsgstj_table_head_td" >{{item.czsl}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './jtgsgstj.scss'
import Taro from '@tarojs/taro'
import {$} from '@tarojs/extend'
import requestData from '../util/request'

export default {
  name: 'jtgsgstj',
  data(){
    return {
        jtgsgstjPart1Title:'按公司统计',
        tableData:Array,
        showedChildrenIndex:Array,
        curCompanyId:String
    }
  },
  components: {},
  created(){
    // 获取当前展示的公司id
    this.curCompanyId = Taro.getStorageSync("showType");
    // 获取 展示区域
    const areaId = Taro.getStorageSync("showArea");

    if(areaId == 2){
      this.jtgsgstjPart1Title = '按区域公司统计';
    }

    const _this = this;

    // data
    let rdata = {companyId: _this.curCompanyId};

    if(_this.curCompanyId == "东南亚区域" || _this.curCompanyId == "欧洲区域"
        || _this.curCompanyId == "非洲区域"){
        const childs = Taro.getStorageSync("childs");
        rdata = {companyId: _this.curCompanyId,childs: childs};
    }

    requestData({
        operServiceId: 'reportService',
        operId: 'findJtgsCompanyMsg',
        data: rdata
    },response => {
        _this.tableData = response.data.data.tableData;
    });      
  },
  mounted(){},
  methods: {
      gotoGsDetail(index){
          // 设置 点击的公司信息
          Taro.setStorageSync("showType",this.tableData[index].id);
          Taro.setStorageSync("showTypeName",this.tableData[index].gsname);

          Taro.reLaunch({
              url:'/pages/index/index?s='+Math.random()
          });
      },
      touchStart(e,name,idx){
        try {
          e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
 
          var touch = e.touches[0]; //获取第一个触点
          var x = Number(touch.clientX); //页面触点X坐标
          var y = Number(touch.clientY); //页面触点Y坐标
          
          let $word = $("<text id='over_name_"+idx+"' >"+name+"</text>");
          $word.css({
            position:"fixed",
            top:(y-50)+'Px',
            left:(x+30)+'px',
            display:'block',
            zIndex:999,
            backgroundColor:'inherit',
            color:'#000'
          });
          $("body").append($word);
        } catch (e) {
          alert('touchSatrtFunc：' + e.message);
        }
      },
      touchEnd(e,name,idx){
        $("#over_name_"+idx).remove();
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
