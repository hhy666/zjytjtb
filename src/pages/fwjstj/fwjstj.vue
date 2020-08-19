<template>
  <view class='fwjstj'>
    <view class="fwjstj_part_1" >
        <text class="fwjstj_part_1_title" >{{fwjstjPart1Title}}</text>
        <view class="fwjstj_table" >
        <view class="fwjstj_table_head" >
            <text class="fwjstj_table_head_th" >{{jsName}}</text>
            <text class="fwjstj_table_head_th" >委托单量</text>
            <text class="fwjstj_table_head_th" >开票收入</text>
            <text class="fwjstj_table_head_th" >成本总额</text>
            <text class="fwjstj_table_head_th" >出证数量</text>
        </view>
        <view class="fwjstj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <a class="fwjstj_table_head_td" @click="showChildrenData(index)" >
                <a :class="{icon_close:!showedChildrenIndex[index], icon_open: showedChildrenIndex[index]}" 
                    v-if="item.children.length > 0" ></a>
                <a :class="{iconNotExist:item.children.length == 0}" 
                    >{{item.gsname}}</a>
            </a>
            <text class="fwjstj_table_head_td" >{{item.wtdl}}</text>
            <text class="fwjstj_table_head_td" >{{item.kpsr.length > 6 ? item.kpsr.substr(0,item.kpsr.indexOf("."))+item.kpsr.substr(item.kpsr.indexOf(".")+3) : item.kpsr }}</text>
            <text class="fwjstj_table_head_td" >{{item.cbze.length > 6 ? item.cbze.substr(0,item.cbze.indexOf("."))+item.cbze.substr(item.cbze.indexOf(".")+3) : item.cbze }}</text>
            <text class="fwjstj_table_head_td" >{{item.czsl}}</text>

            <view class="fwjstj_table_tr_children" 
                v-for="(im,idx) in item.children" :key="idx" 
                v-if="showedChildrenIndex[index]" >
                <a class="fwjstj_table_head_td" >{{im.gsname}}</a>
                <text class="fwjstj_table_head_td" >{{im.wtdl}}</text>
                <text class="fwjstj_table_head_td" >{{im.kpsr.length > 6 ? im.kpsr.substr(0,im.kpsr.indexOf("."))+im.kpsr.substr(im.kpsr.indexOf(".")+3) : im.kpsr }}</text>
                <text class="fwjstj_table_head_td" >{{im.cbze.length > 6 ? im.cbze.substr(0,im.cbze.indexOf("."))+im.cbze.substr(im.cbze.indexOf(".")+3) : im.cbze }}</text>
                <text class="fwjstj_table_head_td" >{{im.czsl}}</text>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './fwjstj.scss'
import Taro from '@tarojs/taro'
import requestData from '../util/request'

export default {
  name: 'fwjstj',
  data(){
    return {
        fwjstjPart1Title:'按服务技术分类统计',
        tableData:Array,
        showedChildrenIndex:Array,
        jsName:String
    }
  },
  props:{
    jsid:Number
  },
  components: {},
  created(){
      this.initData();       
  },
  mounted(){},
  methods: {
    initData(){
      this.jsName = this.jsid == 1 ? '服务技术分类' : '服务对象分类';
      const _this = this;
      // 获取缓存的id
      const cpxname = Taro.getStorageSync("showType");  
      requestData({
          operServiceId: 'reportService',
          operId: 'findCpxMsgByJsfl',
          data: {jsid: this.jsid+'', cpxname: cpxname}
      },response => {
          _this.tableData = response.data.data.tableData;

          _this.showedChildrenIndex = [];

          // 设置默认展开第1行
          for (let index = 0; index < _this.tableData.length; index++) {
              _this.showedChildrenIndex.push(index == 0 ? true : false);
          }

          console.log(_this.tableData)
      });     
    },
    showChildrenData(idx){
        this.$set(this.showedChildrenIndex,idx,!this.showedChildrenIndex[idx]);
    }
  },
  watch:{
    jsid:{
      deep:true,
      handler(val, oldVal){
        if(val != oldVal){
          this.initData();
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
