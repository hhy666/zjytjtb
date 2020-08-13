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
      option: Object
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

      chart.setOption(this.option);

      window.onresize = chart.resize;
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
