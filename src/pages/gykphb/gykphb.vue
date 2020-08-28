<template>
  <view class='gykphb'>
    <view class="gykphb_part_1" >
        <text class="gykphb_part_1_title" >{{gykphbPart1Title}}</text>
        <view class="gykphb_chart_jnqndb" >
            <chart :option='gykphbOption' />
        </view>
    </view>
  </view>
</template>

<script>
import './gykphb.scss'
import Taro from '@tarojs/taro'
import requestData from '../util/request'
import chart from "../chart/chart.vue";

export default {
  name: 'gykphb',
  data(){
    return {
        gykphbPart1Title:'各月开票收入环比情况',
        gykphbOption:null
    }
  },
  components: {
      chart: chart
  },
  created(){
      this.initGykphbOption();
  },
  mounted(){},
  methods: {
      initGykphbOption(){
        const _this = this;

        // 获取缓存的id
        const companyId = Taro.getStorageSync("showType");    

        requestData({
            operServiceId: 'reportService',
            operId: 'findInvoiceDataCpx',
            data: {companyId: companyId}
        },response => {
            if(response.error){
                _this.gykphbOption = {
                    error: true,
                    msg: response.error
                }
                
                return false;
            }

            const option = response.data.data;

            _this.gykphbOption = {
                color:['#5087E5','#FF1516'],
                tooltip:{
                    triggrt:"x"
                },
                grid:[{
                    left: 45,
                    right: 35,
                    top: 30,
                    bottom: 60,
                    height: '75%'
                }],
                xAxis:[{
                    type: 'category',
                    splitLine: {
                        show:false
                    },
                    axisLabel: {
                        interval: 0,
                        fontSize: 10
                    },
                    axisTick: {
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    data:option.xAxisData
                }],
                yAxis:[{
                    position:'left',
                    min:option.yAxis[0].min,
                    max:option.yAxis[0].max,
                    axisLabel: {
                        fontSize: 10,
                        formatter:function(value){
                            return value > 100000000 ? 
                                parseFloat(value/100000000).toFixed(2)+'亿' 
                                : ( value > 10000 ? 
                                    parseInt(value/10000)+'万' : value );
                        }
                    },
                    splitLine: {
                        show:false
                    },
                    axisTick: {
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    boundaryGap:300
                },{
                    position:'right',
                    min:option.yAxis[1].min,
                    max:option.yAxis[1].max,
                    axisLabel:{
                        fontSize: 10,
                        formatter:'{value}%'
                    },
                    splitLine: {
                        lineStyle:{
                            color:['#eee']
                        }
                    },
                    axisTick: {
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    boundaryGap:300
                }],
                series:[{
                    type: 'bar',
                    barGap: '10%',
                    symbol: 'rect',
                    symbolSize: 8,
                    data: option.seriesData[0]
                },{
                    type: 'line',
                    yAxisIndex:1,
                    symbol: 'circle',
                    symbolSize: 8,
                    data: option.seriesData[1]
                }]
            }
        });
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
