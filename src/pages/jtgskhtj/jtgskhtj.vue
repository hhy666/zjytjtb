<template>
  <view class='jtgskhtj'>
    <view class="jtgskhtj_part_1" >
      <text class="jtgskhtj_part_1_title" >{{jtgskhtjPart1Title}}</text>
      <text class="jtgskhtj_part_1_explain" >{{explain}}</text>
      <view class="jtgskhtj_part_1_tab" >
          <a class="jtgskhtj_part_1_tab_in" :class="{on:chooseThis == 1}" @click="searchData(1)" >内部</a>
          <a class="jtgskhtj_part_1_tab_out" :class="{on:chooseThis == 2}" @click="searchData(2)" >外部</a>
      </view>
      <view class="jtgskhtj_table" >
        <view class="jtgskhtj_table_head" >
            <text class="jtgskhtj_table_head_th" >客户名称</text>
            <text class="jtgskhtj_table_head_th" >委托金额</text>
            <text class="jtgskhtj_table_head_th" >已开票</text>
            <text class="jtgskhtj_table_head_th" >已收款</text>
            <text class="jtgskhtj_table_head_th" >出证数量</text>
        </view>
        <view class="jtgskhtj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <a class="jtgskhtj_table_head_td khname" 
              @touchstart="touchStart($event,item.khname,index)" 
              @touchend="touchEnd($event,item.khname,index)" 
              :title="item.khname" >
              {{item.khname.length > 6 ? item.khname.substr(0,6) + '..' : item.khname}}
            </a>
            <text class="jtgskhtj_table_head_td" >{{item.wtje}}</text>
            <text class="jtgskhtj_table_head_td" >{{item.ykp}}</text>
            <text class="jtgskhtj_table_head_td" >{{item.ysk}}</text>
            <text class="jtgskhtj_table_head_td" >{{item.czsl}}</text>
        </view>
        <text class="data_loading" v-if="dataLoading" >数据加载中...</text>
        <a class="jtgskhtj_load_more" 
          @click="loadMoreData()" 
          v-if="tableData.length < 100 && showLoadMore" >更多>></a>
      </view>
    </view>
  </view>
</template>

<script>
import './jtgskhtj.scss'
import {$} from '@tarojs/extend'
import Taro from '@tarojs/taro'
import requestData from '../util/request'

export default {
  name: 'jtgskhtj',
  data(){
    return {
        jtgskhtjPart1Title:'按客户统计',
        explain:'取客户委托金额前100名',
        tableData:Array,
        showedChildrenIndex:Array,
        chooseThis:2,
        pageNum:1,
        dataLoading:true,
        showLoadMore:true
    }
  },
  components: {},
  created(){
      const _this = this;

      // 获取缓存的id
      const companyId = Taro.getStorageSync("showType");    

      // data
      let rdata = {companyId: companyId,pageNum: this.pageNum++ +'',groupType:'0'+this.chooseThis};

      if(companyId == "东南亚区域" || companyId == "欧洲区域"
        || companyId == "非洲区域"){
        const childs = Taro.getStorageSync("childs");
        rdata = {companyId: companyId,pageNum: this.pageNum++ +'',groupType:'0'+this.chooseThis,childs: childs};
      }

      requestData({
          operServiceId: 'reportService',
          operId: 'findJtgsTableKh',
          data: rdata
      },response => {
        if(response.data.data.tableData == undefined){
            _this.showLoadMore = false;
            _this.dataLoading = false;
            return false;
          }
        _this.tableData = response.data.data.tableData;
        _this.dataLoading = false;

        if(response.data.data.tableData.length < 10 || this.pageNum > 10){
          _this.showLoadMore = false;
        }
      });
  },
  mounted(){},
  methods: {
      searchData(flag){
        this.chooseThis = flag;  
        this.pageNum = 1;
        this.dataLoading = true;
        this.showLoadMore = true;
        this.tableData = [];
        const _this = this;

        // 获取缓存的id
        const companyId = Taro.getStorageSync("showType");    

        // data
        let rdata = {companyId: companyId,pageNum: this.pageNum++ +'',groupType:'0'+this.chooseThis};

        if(companyId == "东南亚区域" || companyId == "欧洲区域"
          || companyId == "非洲区域"){
          const childs = Taro.getStorageSync("childs");
          rdata = {companyId: companyId,pageNum: this.pageNum++ +'',groupType:'0'+this.chooseThis,childs: childs};
        }

        requestData({
            operServiceId: 'reportService',
            operId: 'findJtgsTableKh',
            data: rdata
        },response => {
          if(response.data.data.tableData == undefined){
            _this.showLoadMore = false;
            _this.dataLoading = false;
            return false;
          }
          _this.tableData = response.data.data.tableData;
          _this.dataLoading = false;
          
          if(response.data.data.tableData.length < 10 || _this.pageNum > 10){
            _this.showLoadMore = false;
          }
        });
      },
      loadMoreData(){
        this.dataLoading = true;
        const _this = this;

        // 获取缓存的id
        const companyId = Taro.getStorageSync("showType");    

        // data
        let rdata = {companyId: companyId,pageNum: this.pageNum++ +'',groupType:'0'+this.chooseThis};

        if(companyId == "东南亚区域" || companyId == "欧洲区域"
          || companyId == "非洲区域"){
          const childs = Taro.getStorageSync("childs");
          rdata = {companyId: companyId,pageNum: this.pageNum++ +'',groupType:'0'+this.chooseThis,childs: childs};
        }

        requestData({
          operServiceId: 'reportService',
          operId: 'findJtgsTableKh',
          data: rdata
        },response => {
          if(response.data.data.tableData == undefined){
            _this.showLoadMore = false;
            _this.dataLoading = false;
            return false;
          }

          _this.tableData = _this.tableData.concat(response.data.data.tableData);
          _this.dataLoading = false;

          if(response.data.data.tableData.length < 10 || _this.pageNum > 10){
            _this.showLoadMore = false;
          }
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

        Taro.setStorageSync("khmc",name);

        Taro.navigateTo({
          url:'../khmsg/khmsg?s='+Math.random()
        });
      }
    }
}
</script>
<style lang='scss' scoped>
</style>
