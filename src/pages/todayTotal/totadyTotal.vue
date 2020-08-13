<template>
  <view class='today_total_kuang'>
    <view v-for="(value,index) in ttdata" :key="index" class="today_total_unit" :style="{marginTop: index > 4 ? '8Px' : 0 }" >
        <view class="ttu_today" >
            <text class="ttu_today_w" >今日</text>
            <text class="ttu_today_n" >{{value.today}}</text>
        </view>
        <view class="ttu_total" >
            <text class="ttu_total_n" >{{value.total.n}}</text>
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
import linePng from '@/static/images/line.png'

export default {
  name: 'todayTotal',
  data(){
    return {
        lineSrc: linePng,
        ttdata:[{
            today:'+122',
            total:{w:'万单', n:174},
            word:'开工数量'
        },{
            today:'+1万',
            total:{w:'万', n:292},
            word:'出证数量'
        },{
            today:'+100个',
            total:{w:'万个', n:6},
            word:'客户数量'
        },{
            today:'+100个',
            total:{w:'万个', n:6},
            word:'供应商数量'
        },{
            today:'+2000万',
            total:{w:'亿元', n:10.4},
            word:'委托金额'
        },{
            today:'+2000万',
            total:{w:'亿元', n:10.4},
            word:'完工金额'
        },{
            today:'+100万',
            total:{w:'万', n:292},
            word:'开票收入'
        },{
            today:'+100万',
            total:{w:'万元', n:6000},
            word:'成本总额'
        }]
    }
  },
  components: {
      
  },
  created(){},
  mounted(){},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
