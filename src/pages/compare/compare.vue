<template>
  <view class='compare'>
    <view class="compare_part_1" >
      <text class="compare_part_1_title" >{{comparePart1Title}}</text>
      <view class="compare_chart_jnqndb" >
        <chart :option="jnqndbOption" />
      </view>
    </view>
  </view>
</template>

<script>
import './compare.scss'
import { $ } from '@tarojs/extend'
import chart from "../chart/chart.vue";

export default {
  name: 'compare',
  data(){
    return {
        comparePart1Title:'本年开票收入与去年同期对比',
        jnqndbOption:Object
    }
  },
  components: {
      chart: chart
  },
  created(){
      this.initJnqndbOption();
  },
  mounted(){},
  methods: {
      initJnqndbOption(){
        const option = {};
        const xAxisData = [];

        for (let index = 1; index < 13; index++) {
            xAxisData.push(index+'月');
        }   

        option.xAxisData = xAxisData;

        const legendData = [];

        legendData.push({name:'去年收入',icon:'rect'});
        legendData.push({name:'今年收入',icon:'rect'});
        legendData.push({name:'同比',icon:'path://M10,10 L19,10 L19,12 L10,12 M,20,11 a3,3 0 1,0 6,0 a3,3 0 1, 0 -6, 0 M27,10 L36,10 L36,12 L27,12Z'});

        option.yAxis = [];

        option.yAxis.push({min: parseInt(Math.random()*0), max: parseInt(Math.random()*90000+10000)});
        option.yAxis.push({min: parseInt(Math.random()*0), max: parseInt(Math.random()*90+10)});

        const seriesData = [];
        
        for (let index = 0; index < legendData.length; index++) {
            const dta = [];

            for (let i = 1; i < 13; i++) {
                if(index % 3 == 2){
                    dta.push(parseInt(Math.random()*option.yAxis[1].max));
                }else{
                    dta.push(parseInt(Math.random()*option.yAxis[0].max));
                }
            }
          
            seriesData.push(dta);
        }

        option.seriesData = seriesData;
        
        console.log(option);

        this.jnqndbOption = {
            color:['#00B0F0','#3F6CFE','#FF1F1F'],
            legend:[{
                height:20,
                top:5,
                itemWidth:20,
                itemHeight:8,
                data:legendData
            }],
            grid:[{
                left: 40,
                right: 30,
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
                    fontSize: 10
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
                name: legendData[0].name,
                type: 'bar',
                barGap: '10%',
                symbol: 'rect',
                symbolSize: 8,
                data: option.seriesData[0]
            },{
                name: legendData[1].name,
                type: 'bar',
                barGap: '10%',
                symbol: 'rect',
                symbolSize: 8,
                data: option.seriesData[1]
            },{
                name: legendData[2].name,
                type: 'line',
                yAxisIndex:1,
                symbol: 'circle',
                symbolSize: 8,
                data: option.seriesData[2]
            }]
        }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
