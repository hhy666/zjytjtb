<template>
  <view class='qygstj'>
    <view class="qygstj_part_1" >
        <text class="qygstj_part_1_title" >{{qygstjPart1Title}}</text>
        <view class="qygstj_table" >
        <view class="qygstj_table_head" >
            <text class="qygstj_table_head_th" >公司</text>
            <text class="qygstj_table_head_th" >委托单量</text>
            <text class="qygstj_table_head_th" >开票收入</text>
            <text class="qygstj_table_head_th" >成本总额</text>
            <text class="qygstj_table_head_th" >出证数量</text>
            <text class="qygstj_table_head_th" >操作</text>
        </view>
        <view class="qygstj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <a class="qygstj_table_head_td" @click="showChildrenData(index)" >
                <a :class="{icon_close:!showedChildrenIndex[index], icon_open: showedChildrenIndex[index]}" 
                    v-if="item.children.length > 0" ></a>
                <a class="gtht_name" 
                   :class="{iconNotExist:item.children.length == 0}" 
                    >{{item.gsname}}</a>
            </a>
            <text class="qygstj_table_head_td" >{{item.wtdl}}</text>
            <text class="qygstj_table_head_td" >{{item.kpsr.length > 6 ? item.kpsr.substr(0,item.kpsr.indexOf("."))+item.kpsr.substr(item.kpsr.indexOf(".")+3) : item.kpsr }}</text>
            <text class="qygstj_table_head_td" >{{item.cbze.length > 6 ? item.cbze.substr(0,item.cbze.indexOf("."))+item.cbze.substr(item.cbze.indexOf(".")+3) : item.cbze }}</text>
            <text class="qygstj_table_head_td" >{{item.czsl}}</text>
            <a class="qygstj_table_head_td gtht_name" @click="gotoGsDetail(index,-1)" >详情</a>

            <view class="qygstj_table_tr_children" 
                v-for="(im,idx) in item.children" :key="idx" 
                v-if="showedChildrenIndex[index]" >
                <a class="qygstj_table_head_td" >{{im.gsname}}</a>
                <text class="qygstj_table_head_td" >{{im.wtdl}}</text>
                <text class="qygstj_table_head_td" >{{im.kpsr.length > 6 ? im.kpsr.substr(0,im.kpsr.indexOf("."))+im.kpsr.substr(im.kpsr.indexOf(".")+3) : im.kpsr }}</text>
                <text class="qygstj_table_head_td" >{{im.cbze.length > 6 ? im.cbze.substr(0,im.cbze.indexOf("."))+im.cbze.substr(im.cbze.indexOf(".")+3) : im.cbze }}</text>
                <text class="qygstj_table_head_td" >{{im.czsl}}</text>
                <a class="qygstj_table_head_td gtht_name" @click="gotoGsDetail(index,idx)" >详情</a>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './qygstj.scss'
import Taro from '@tarojs/taro'
import requestData from '../util/request'

export default {
  name: 'qygstj',
  data(){
    return {
        qygstjPart1Title:'按区域公司统计',
        tableData:Array,
        showedChildrenIndex:Array
    }
  },
  components: {},
  created(){
      const _this = this;

      requestData({
          operServiceId: 'reportService',
          operId: 'findCompanyMsgByArea',
          data: {}
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
  mounted(){},
  methods: {
    showChildrenData(idx){
        this.$set(this.showedChildrenIndex,idx,!this.showedChildrenIndex[idx]);
    },
    gotoGsDetail(index, idx){
        // 设置 点击的公司信息
        if(idx < 0){
          Taro.setStorageSync("showType",this.tableData[index].id);
          Taro.setStorageSync("showArea",2);
          Taro.setStorageSync("showTypeName",this.tableData[index].gsname);
        }else{
          Taro.setStorageSync("showType",this.tableData[index].children[idx].id);
          Taro.setStorageSync("showArea",2);
          Taro.setStorageSync("showTypeName",this.tableData[index].children[idx].gsname);
        }

        Taro.reLaunch({
            url:'/pages/index/index?s='+Math.random()
        });
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
