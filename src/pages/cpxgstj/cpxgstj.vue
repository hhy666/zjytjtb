<template>
  <view class='cpxgstj'>
    <view class="cpxgstj_part_1" >
      <text class="cpxgstj_part_1_title" >{{cpxgstjPart1Title}}</text>
      <view class="cpxgstj_table" >
        <view class="cpxgstj_table_head" >
            <text class="cpxgstj_table_head_th" >公司名称</text>
            <text class="cpxgstj_table_head_th" >委托单量</text>
            <text class="cpxgstj_table_head_th" >开票收入</text>
            <text class="cpxgstj_table_head_th" >成本总额</text>
            <text class="cpxgstj_table_head_th" >出证数量</text>
        </view>
        <view class="cpxgstj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <a class="cpxgstj_table_head_td" 
              @touchstart="touchStart($event,item.gsname,index)" 
              @touchend="touchEnd($event,item.gsname,index)" 
              :title="item.gsname" >
              {{item.gsname.length > 6 ? item.gsname.substr(0,6) + '..' : item.gsname}}
            </a>
            <text class="cpxgstj_table_head_td" >{{item.wtdl}}</text>
            <text class="cpxgstj_table_head_td" >{{item.kpsr}}</text>
            <text class="cpxgstj_table_head_td" >{{item.cbze}}</text>
            <text class="cpxgstj_table_head_td" >{{item.czsl}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './cpxgstj.scss'
import Taro from '@tarojs/taro'
import {$} from '@tarojs/extend'
import requestData from '../util/request'

export default {
  name: 'cpxgstj',
  data(){
    return {
        cpxgstjPart1Title:'按公司统计',
        tableData:Array
    }
  },
  components: {},
  created(){
        const _this = this;

        // 获取缓存的id
        const cpxName = Taro.getStorageSync("showType");    

        requestData({
            operServiceId: 'reportService',
            operId: 'findCompanyMsgByCpxName',
            data: {cpxName: cpxName}
        },response => {
            _this.tableData = response.data.data.tableData;
        });
  },
  mounted(){},
  methods: {
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
