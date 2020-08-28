<template>
  <view class='gxbar'>
    <view class="gxbar_part_1" >
      <text class="gxbar_part_1_title" >{{gxbarPart1Title}}</text>
      <view class="gxbar_chart_jnqndb" >
        <chart :option="gxbarOption" />
      </view>
    </view>
  </view>
</template>

<script>
import './gxbar.scss'
import chart from "../chart/chart.vue";
import Taro from '@tarojs/taro'
import requestData from '../util/request'
import * as echarts from "../../ec-canvas/echarts.min.js";

export default {
  name: 'gxbar',
  data(){
    return {
        gxbarPart1Title:'客户贡献值TOP5',
        gxbarOption:null,
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
    // 获取area值 
    const showArea = Taro.getStorageSync("showArea");  
    // operId
    const operId = showArea < 3 ? 'findJtgsGxbar' : 'findCpxGxbar';
    // data
    let rdata = {companyId: companyId};

    if(companyId == "东南亚区域" || companyId == "欧洲区域"
        || companyId == "非洲区域"){
        const childs = Taro.getStorageSync("childs");
        rdata = {companyId: companyId,childs: childs};
    }

    requestData({
        operServiceId: 'reportService',
        operId: operId,
        data: rdata
    },response => {
        _this.initGxbarOption(response.data.data.gxbarOption);
        // setTimeout(()=>{
        //     _this.setChartClick();
        // },1);
    });
  },
  mounted(){},
  methods: {
      initGxbarOption(option){
          this.gxbarOption = {
                backgroundColor:'#fff',
                color:['#5087E5', '#00B0F0'],
                tooltip:{
                    show:true,
                    trigger:'axis'
                },
                legend:{
                    icon:'rect',
                    itemWidth:13,
                    itemHeight:13,
                    top:5,
                    data:['已到款','贡献值']
                },
                grid: {
                    top:45,
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
                        name:'贡献值',
                        type: 'bar',
                        barWidth:10,
                        barGap:'20%',
                        data: option.sdata[0],
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
                    },
                    {
                        name:'已到款',
                        type: 'bar',
                        barWidth:10,
                        barGap:'20%',
                        data: option.sdata[1],
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
