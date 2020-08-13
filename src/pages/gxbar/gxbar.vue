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

export default {
  name: 'gxbar',
  data(){
    return {
        gxbarPart1Title:'客户贡献值TOP5',
        gxbarOption:Object
    }
  },
  components: {
      chart: chart
  },
  created(){
      const option = {};

      option.xAxis = {};
      
      option.xAxis.min = parseInt(Math.random()*100);
      option.xAxis.max = parseInt(Math.random()*100000+10000);

      option.yData = [];
      
      for (let index = 0; index < 5; index++) {
          option.yData.push('客户名称'+index);
      }

      option.sdata = [];

      option.sdata.push([]);
      option.sdata.push([]);

      for (let index = 0; index < 5; index++) {
          option.sdata[0].push(parseInt(Math.random()*option.xAxis.max+option.xAxis.min));
          option.sdata[1].push(parseInt(Math.random()*option.sdata[0][index]+option.xAxis.min));
      }

      this.initGxbarOption(option);
  },
  mounted(){},
  methods: {
      initGxbarOption(option){
          this.gxbarOption = {
                backgroundColor:'#fff',
                color:['#5087E5', '#00B0F0'],
                legend:{
                    icon:'rect',
                    itemWidth:13,
                    itemHeight:13,
                    top:5,
                    data:['已到款','贡献值']
                },
                grid: {
                    top:30,
                    bottom:30,
                    right:20,
                    left: '18%'
                },
                xAxis: {
                    type: 'value',
                    min:option.xAxis.min,
                    max:option.xAxis.max,
                    axisLabel:{
                        show:true
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
                    axisLabel:{
                        align:'right',
                        margin: 5,
                        color:'#aaa',
                        fontWeight: 'bold'
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
                            offset:[5,0]
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
                            offset:[5,0]
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
