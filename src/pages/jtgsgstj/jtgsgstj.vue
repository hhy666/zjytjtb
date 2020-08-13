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
            <text class="jtgsgstj_table_head_td" v-if="curCompanyId == item.id" >{{item.gsname}}</text>
            <a class="jtgsgstj_table_head_td gtht_a" @click="gotoGsDetail(index)" v-else >{{item.gsname}}</a>
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

      // 初始化获取子公司及当前公司信息
      this.tableData = [];    
      
      for (let index = 0; index < parseInt(Math.random()*30 + 3); index++) {
          const tr = {};

          tr.gsname = index == 0 ? Taro.getStorageSync("showTypeName") : '子公司'+index;
          // 公司id
          tr.id = index == 0 ? this.curCompanyId : parseInt(Math.random()*10000+1);
          // 委托单量
          tr.wtdl = parseInt(Math.random()*10000)+'万';
          // 开票收入
          tr.kpsr = parseInt(Math.random()*10000)+'万';
          // 成本总额
          tr.cbze = parseInt(Math.random()*10000)+'万';
          // 出证数量
          tr.czsl = parseInt(Math.random()*10000)+'万';

          this.tableData.push(tr);
      }
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
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
