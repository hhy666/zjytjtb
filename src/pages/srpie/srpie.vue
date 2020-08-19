<template>
  <view class='srpie'>
    <view class="srpie_part_1" >
      <text class="srpie_part_1_title" >{{srpiePart1Title}}</text>
      <view class="srpie_chart_jnqndb" >
        <chart :option="srpieOption" />
      </view>
    </view>
  </view>
</template>

<script>
import './srpie.scss'
import chart from "../chart/chart.vue";
import Taro from '@tarojs/taro'
import requestData from '../util/request'

export default {
  name: 'srpie',
  data(){
    return {
        srpiePart1Title:'重点服务技术中类收入',
        srpieOption:null
    }
  },
  components: {
      chart: chart
  },
  created(){
    const _this = this;

    // 获取缓存的id
    const companyId = Taro.getStorageSync("showType");    

    requestData({
        operServiceId: 'reportService',
        operId: 'findSrpieCpx',
        data: {companyId: companyId}
    },response => {
        _this.initSrpieOption(response.data.data.tableData);
        console.log(response.data.data);
    });
  },
  mounted(){},
  methods: {
      initSrpieOption(sdata){
          this.srpieOption = {
                backgroundColor:"#fff",
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        startAngle:140,
                        radius: [0, 75],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: sdata,
                        label:{
                            show: true,
                            // formatter: '{b}\n{c}, {d}%',
                            fontSize:12,
                            fontWeight:'bold',
                            formatter:params => {
                                let str = params.name+ "\n";
                                const value = params.value;
                                str += value > 100000000 ? 
                                        parseFloat(value/100000000).toFixed(2)+'亿' 
                                        : ( value > 10000 ? 
                                            parseFloat(value/10000).toFixed(2)+'万' : value );
                                str += "\n"+params.percent+"%";
                                return str;
                            }
                        },
                        labelLine:{
                            length:10,
                            length2:10
                        },
                        smooth:true
                    }
                ]
          }
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
