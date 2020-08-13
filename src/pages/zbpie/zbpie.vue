<template>
  <view class='zbpie'>
    <view class="zbpie_part_1" >
      <text class="zbpie_part_1_title" >{{zbpiePart1Title}}</text>
      <view class="zbpie_chart_jnqndb" >
        <chart :option="zbpieOption" />
      </view>
    </view>
  </view>
</template>

<script>
import './zbpie.scss'
import chart from "../chart/chart.vue";

export default {
  name: 'zbpie',
  data(){
    return {
        zbpiePart1Title:'一级产品线开票收入占比',
        zbpieOption:Object
    }
  },
  components: {
      chart: chart
  },
  created(){
      const sdata = [];

      for (let index = 0; index < parseInt(Math.random()*10+5); index++) {
          sdata.push({value: parseInt(Math.random()*10000+10), name: '数据项'+index});  
      }  
      
      this.initZbpieOption(sdata);
  },
  mounted(){},
  methods: {
      initZbpieOption(sdata){
          this.zbpieOption = {
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
                            formatter: '{b}\n{c}, {d}%',
                            fontSize:12,
                            fontWeight:'bold'
                        },
                        labelLine:{
                            length:10,
                            length2:15
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
          }
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
