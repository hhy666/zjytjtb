<template>
  <view class='srbar'>
    <view class="srbar_part_1" >
      <text class="srbar_part_1_title" >{{srbarPart1Title}}</text>
      <view class="srbar_chart_jnqndb" >
        <chart :option="srbarOption" />
      </view>
    </view>
  </view>
</template>

<script>
import './srbar.scss'
import chart from "../chart/chart.vue";
import Taro from '@tarojs/taro'
import requestData from '../util/request'
import * as echarts from "../../ec-canvas/echarts.min.js";

export default {
  name: 'srbar',
  data(){
    return {
        srbarPart1Title:'重点服务对象中类收入',
        srbarOption:null,
        ecId:String
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
        operId: 'findJtgsSrbar',
        data: {companyId: companyId}
    },response => {
        _this.initsrbarOption(response.data.data.srbarOption);
        // setTimeout(()=>{
        //     _this.setChartClick();
        // },1);
    });
  },
  mounted(){},
  methods: {
      initsrbarOption(option){
          this.srbarOption = {
                backgroundColor:'#fff',
                color:['#5087E5', '#00B0F0'],
                tooltip:{
                    show:true,
                    trigger:'axis'
                },
                grid: {
                    top:25,
                    bottom:30,
                    right:20,
                    left: '18%'
                },
                xAxis: {
                    type: 'value',
                    min:option.xAxis.min,
                    max:option.xAxis.max*1.5,
                    axisLabel:{
                        show:true,
                        margin:15,
                        formatter:function(value){
                            return value > 100000000 ? 
                                parseFloat(value/100000000).toFixed(2)+'亿' 
                                : ( value > 10000 ? 
                                    parseInt(value/10000)+'万' : value );
                        }
                    },
                    axisTick:{
                        show:false  
                    },
                    axisLine:{
                        show:false  
                    },
                    splitLine:{
                        lineStyle:{
                            color:['#eee']
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    boundaryGap:false,
                    axisLabel:{
                        align:'center',
                        margin: 33,
                        interval:0,
                        color:'#aaa',
                        fontWeight: 'bold',
                        formatter:function(val){
                            var strs = val.split(''); //字符串数组
                            // var str = ''
                            // for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
                            //     str += s;
                            //     if(!(i % 5)) str += '\n'; //按需要求余
                            // }
                            return strs.length > 4 ? val.substr(0,4)+".." : strs;
                        }
                    },
                    axisTick:{
                        show:false  
                    },
                    axisLine:{
                        show:true  
                    },
                    data: option.yData
                },
                series: [
                    {
                        type: 'bar',
                        barWidth:10,
                        barGap:'20%',
                        data: option.sdata,
                        label:{
                            show:true,
                            position:'right',
                            color:'#000',
                            verticalAlign:'middle',
                            fontWeight:'bold',
                            offset:[5,0],
                            formatter:params => {
                                const value = params.value;
                                return value > 100000000 ? 
                                        parseFloat(value/100000000).toFixed(2)+'亿' 
                                        : ( value > 10000 ? 
                                            parseFloat(value/10000).toFixed(2)+'万' : value );
                            }
                        },
                        z:2
                    }
                ]
          }
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
