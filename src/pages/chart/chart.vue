<template>
  <view class='charts' :id="ecid">
    
  </view>
</template>

<script>
import './chart.scss'
import { $ } from '@tarojs/extend'
import * as echarts from "../../ec-canvas/echarts.min.js";

export default {
  name: 'charts',
  data(){
    return {
        ecid: String
    }
  },
  props:{
      option: Object,
      getChartOption: Function
  },
  components: {
     
  },
  created(){
    this.ecid = new Date().getMilliseconds+''+parseInt(Math.random()*1000000);
  },
  mounted(){
      this.createEcharts();
  },
  methods: {
    createEcharts: function(){
      const cvs = document.getElementById(this.ecid);

      const chart = echarts.init(cvs);

      chart.showLoading({
            text: '数据正在加载...',
            textStyle: { fontSize : 30 , color: '#444' },
            effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
      });

      const _this = this;

      const sil = setInterval(function(){
        _this.option = _this.getChartOption();

        if(_this.option != null){
          clearInterval(_this.sil);

          if(_this.option.error){
            alert(_this.option.msg);
            return false;
          }

          chart.setOption(_this.option);

          chart.hideLoading();

          window.onresize = chart.resize;
        }
      },100)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
