<template>
  <view class='today_total_kuang'>
    <view v-for="(value,index) in ttdata" :key="index" 
        class="today_total_unit" 
        :style="{marginTop: index > 3 ? '8Px' : 0 }" >

        <view class="ttu_today" >
            <text class="ttu_today_w" >今日</text>
            <text class="ttu_today_n" >{{value.today}}</text>
        </view>
        <view class="ttu_total" >
            <text class="ttu_total_n" >{{value.total.n.length > 5 ? value.total.n.substr(0,value.total.n.indexOf(".")) : value.total.n }}</text>
            <text class="ttu_total_w" >{{value.total.w}}</text>
        </view>
        <view class="ttu_word" >
            <text>{{value.word}}</text>
        </view>
        <view class="ttd_line_view" v-if="index % 4 != 3" >
            <!-- <view class="ttd_line" ></view> -->
            <img :src=lineSrc width="5px" height="80%" />
        </view>
    </view>    
  </view>
</template>

<script>
import './todayTotal.scss'
import Taro from '@tarojs/taro'
import linePng from '@/static/images/line.png'
import requestData from '../util/request'

export default {
  name: 'todayTotal',
  data(){
    return {
        lineSrc: linePng,
        ttdata:Array
    }
  },
  components: {
      
  },
  created(){
      const _this = this;

      // 获取缓存的id
      const companyId = Taro.getStorageSync("showType");
      // 缓存的area值    
      const showArea = Taro.getStorageSync("showArea");
      const operId = showArea == 0 ? 'findTodayTotal' 
        : ((showArea == 1 || showArea == 2) ? 'findTotalCompany' : 'findTodayTotalCpx' );

      requestData({
            operServiceId: 'reportService',
            operId: operId,
            data: {companyId: companyId}
        },response => {
            if(response.data.data.ttdata == undefined){
                alert("数据查询出错！");
                return false;
            }

            _this.ttdata = response.data.data.ttdata;
        });
  },
  mounted(){},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
