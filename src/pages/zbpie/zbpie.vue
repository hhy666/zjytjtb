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
import Taro from '@tarojs/taro'
import requestData from '../util/request'

export default {
  name: 'zbpie',
  data(){
    return {
        zbpiePart1Title:'一级产品线开票收入占比',
        zbpieOption:null
    }
  },
  components: {
      chart: chart
  },
  created(){
    const _this = this;

    // 获取缓存的id
    const companyId = Taro.getStorageSync("showType");    

    let rdata = {companyId: companyId};

    if(companyId == "东南亚区域" || companyId == "欧洲区域"
        || companyId == "非洲区域"){
        const childs = Taro.getStorageSync("childs");
        rdata = {companyId: companyId,childs: childs};
    }

    requestData({
        operServiceId: 'reportService',
        operId: 'findFirstCompanyKp',
        data: rdata
    },response => {
        _this.initZbpieOption(response.data.data.zbpieOption);
        console.log(response.data.data);
    });
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
