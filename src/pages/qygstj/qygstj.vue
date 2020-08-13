<template>
  <view class='qygstj'>
    <view class="qygstj_part_1" >
        <text class="qygstj_part_1_title" >{{qygstjPart1Title}}</text>
        <view class="qygstj_table" >
        <view class="qygstj_table_head" >
            <text class="qygstj_table_head_th" >公司</text>
            <text class="qygstj_table_head_th" >委托单量</text>
            <text class="qygstj_table_head_th" >开票收入</text>
            <text class="qygstj_table_head_th" >成本总额</text>
            <text class="qygstj_table_head_th" >出证数量</text>
        </view>
        <view class="qygstj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <view class="qygstj_table_head_td" >
                <a :class="{icon_close:!showedChildrenIndex[index], icon_open: showedChildrenIndex[index]}" 
                    v-if="item.children.length > 0"
                    @click="showChildrenData(index)" ></a>
                <a class="gtht_name"  @click="gotoGsDetail(index,-1)"
                    :class="{iconNotExist:item.children.length == 0}" 
                    >{{item.gsname}}</a>
            </view>
            <text class="qygstj_table_head_td" >{{item.wtdl}}</text>
            <text class="qygstj_table_head_td" >{{item.kpsr}}</text>
            <text class="qygstj_table_head_td" >{{item.cbze}}</text>
            <text class="qygstj_table_head_td" >{{item.czsl}}</text>

            <view class="qygstj_table_tr_children" 
                v-for="(im,idx) in item.children" :key="idx" 
                v-if="showedChildrenIndex[index]" >
                <a class="qygstj_table_head_td" @click="gotoGsDetail(index,idx)" >{{im.gsname}}</a>
                <text class="qygstj_table_head_td" >{{im.wtdl}}</text>
                <text class="qygstj_table_head_td" >{{im.kpsr}}</text>
                <text class="qygstj_table_head_td" >{{im.cbze}}</text>
                <text class="qygstj_table_head_td" >{{im.czsl}}</text>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './qygstj.scss'

export default {
  name: 'qygstj',
  data(){
    return {
        qygstjPart1Title:'按区域公司统计',
        tableData:Array,
        showedChildrenIndex:Array
    }
  },
  components: {},
  created(){
      this.tableData = [];    

      for (let index = 0; index < 3; index++) {
          const tr = {};

          tr.gsname = index == 0 ? '欧洲公司' : (index == 1 ? '东南亚公司' : '非洲');
          // 委托单量
          tr.wtdl = parseInt(Math.random()*10000)+'万';
          // 开票收入
          tr.kpsr = parseInt(Math.random()*10000)+'万';
          // 成本总额
          tr.cbze = parseInt(Math.random()*10000)+'万';
          // 出证数量
          tr.czsl = parseInt(Math.random()*10000)+'万';

          // 随机数
          const sj = parseInt(Math.random()*20), child = [];

          for (let idx = 0; idx < sj; idx++) {
              child.push({
                  gsname: tr.gsname+idx,
                  wtdl: parseInt(Math.random()*100)+'万',
                  kpsr: parseInt(Math.random()*100)+'万',
                  cbze: parseInt(Math.random()*100)+'万',
                  czsl:parseInt(Math.random()*100)+'万'
              });
          }

          tr.children = child;

          this.tableData.push(tr);
    }

    this.showedChildrenIndex = [];

    // 设置默认展开第1行
    for (let index = 0; index < this.tableData.length; index++) {
        this.showedChildrenIndex.push(index == 0 ? true : false);
    }

    console.log(this.tableData)
  },
  mounted(){},
  methods: {
    showChildrenData(idx){
        this.$set(this.showedChildrenIndex,idx,!this.showedChildrenIndex[idx]);
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
