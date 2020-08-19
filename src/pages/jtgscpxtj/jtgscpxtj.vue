<template>
  <view class='jtgscpxtj'>
    <view class="jtgscpxtj_part_1" >
      <text class="jtgscpxtj_part_1_title" >{{jtgscpxtjPart1Title}}</text>
      <view class="jtgscpxtj_table" >
        <view class="jtgscpxtj_table_head" >
            <text class="jtgscpxtj_table_head_th" >产品线</text>
            <text class="jtgscpxtj_table_head_th" >委托单量</text>
            <text class="jtgscpxtj_table_head_th" >开票收入</text>
            <text class="jtgscpxtj_table_head_th" >成本总额</text>
            <text class="jtgscpxtj_table_head_th" >出证数量</text>
        </view>
        <view class="jtgscpxtj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <text class="jtgscpxtj_table_head_td" >{{item.cpxname}}</text>
            <text class="jtgscpxtj_table_head_td" >{{item.wtdl}}</text>
            <text class="jtgscpxtj_table_head_td" >{{item.kpsr}}</text>
            <text class="jtgscpxtj_table_head_td" >{{item.cbze}}</text>
            <text class="jtgscpxtj_table_head_td" >{{item.czsl}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './jtgscpxtj.scss'
import Taro from '@tarojs/taro'
import requestData from '../util/request'

export default {
  name: 'jtgscpxtj',
  data(){
    return {
        jtgscpxtjPart1Title:'按产品线统计',
        tableData:Array,
        showedChildrenIndex:Array
    }
  },
  components: {},
  created(){
      const _this = this;

      // 获取缓存的id
      const companyId = Taro.getStorageSync("showType");    

      requestData({
          operServiceId: 'reportService',
          operId: 'findJTGSCompanyCpx',
          data: {companyId: companyId}
      },response => {
        _this.tableData = response.data.data.tableData;
      });
  },
  mounted(){},
  methods: {
      
  }
}
</script>
<style lang='scss' scoped>
</style>
