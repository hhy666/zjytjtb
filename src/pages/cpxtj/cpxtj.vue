<template>
  <view class='cpxtj'>
    <view class="cpxtj_part_1" >
      <text class="cpxtj_part_1_title" >{{cpxtjPart1Title}}</text>
      <view class="cpxtj_table" >
        <view class="cpxtj_table_head" >
            <text class="cpxtj_table_head_th" >产品线</text>
            <text class="cpxtj_table_head_th" >委托单量</text>
            <text class="cpxtj_table_head_th" >开票收入</text>
            <text class="cpxtj_table_head_th" >成本总额</text>
            <text class="cpxtj_table_head_th" >出证数量</text>
        </view>
        <view class="cpxtj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <view class="cpxtj_table_head_td" >
                <a :class="{icon_close:!showedChildrenIndex[index], icon_open: showedChildrenIndex[index]}" 
                    v-if="item.children.length > 0"
                    @click="showChildrenData(index)" ></a>
                <text class="gtht_name" 
                    :class="{iconNotExist:item.children.length == 0}" 
                    >{{item.gsname}}</text>
            </view>
            <text class="cpxtj_table_head_td" >{{item.wtdl}}</text>
            <text class="cpxtj_table_head_td" >{{item.kpsr}}</text>
            <text class="cpxtj_table_head_td" >{{item.cbze}}</text>
            <text class="cpxtj_table_head_td" >{{item.czsl}}</text>

            <view class="cpxtj_table_tr_children" 
                v-for="(im,idx) in item.children" :key="idx" 
                v-if="showedChildrenIndex[index]" >
                <a class="cpxtj_table_head_td" @click="gotoGsDetail(index,idx)" >{{im.gsname}}</a>
                <text class="cpxtj_table_head_td" >{{im.wtdl}}</text>
                <text class="cpxtj_table_head_td" >{{im.kpsr}}</text>
                <text class="cpxtj_table_head_td" >{{im.cbze}}</text>
                <text class="cpxtj_table_head_td" >{{im.czsl}}</text>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './cpxtj.scss'
import requestData from '../util/request'

export default {
  name: 'cpxtj',
  data(){
    return {
        cpxtjPart1Title:'按产品线统计',
        tableData:Array,
        showedChildrenIndex:Array
    }
  },
  components: {},
  created(){
      const _this = this;

      requestData({
          operServiceId: 'reportService',
          operId: 'findCompanyMsgByCpx',
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
        Taro.setStorageSync("showTypeName",this.tableData[index].gsname);
        }else{
        Taro.setStorageSync("showType",this.tableData[index].children[idx].id);
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
