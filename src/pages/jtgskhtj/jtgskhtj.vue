<template>
  <view class='jtgskhtj'>
    <view class="jtgskhtj_part_1" >
      <text class="jtgskhtj_part_1_title" >{{jtgskhtjPart1Title}}</text>
      <text class="jtgskhtj_part_1_explain" >{{explain}}</text>
      <view class="jtgskhtj_part_1_tab" >
          <a class="jtgskhtj_part_1_tab_in" :class="{on:chooseThis == 1}" @click="searchData(1)" >内部</a>
          <a class="jtgskhtj_part_1_tab_out" :class="{on:chooseThis == 2}" @click="searchData(2)" >外部</a>
      </view>
      <view class="jtgskhtj_table" >
        <view class="jtgskhtj_table_head" >
            <text class="jtgskhtj_table_head_th" >客户名称</text>
            <text class="jtgskhtj_table_head_th" >委托单量</text>
            <text class="jtgskhtj_table_head_th" >已开票</text>
            <text class="jtgskhtj_table_head_th" >已收款</text>
            <text class="jtgskhtj_table_head_th" >出证数量</text>
        </view>
        <view class="jtgskhtj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <a class="jtgskhtj_table_head_td khname" >{{item.khname}}</a>
            <text class="jtgskhtj_table_head_td" >{{item.wtdl}}</text>
            <text class="jtgskhtj_table_head_td" >{{item.ykp}}</text>
            <text class="jtgskhtj_table_head_td" >{{item.ysk}}</text>
            <text class="jtgskhtj_table_head_td" >{{item.czsl}}</text>
        </view>
        <a class="jtgskhtj_load_more" @click="loadMoreData()" v-if="tableData.length < 100" >更多>></a>
      </view>
    </view>
  </view>
</template>

<script>
import './jtgskhtj.scss'

export default {
  name: 'jtgskhtj',
  data(){
    return {
        jtgskhtjPart1Title:'按客户统计',
        explain:'取客户委托金额前100名',
        tableData:Array,
        showedChildrenIndex:Array,
        chooseThis:1
    }
  },
  components: {},
  created(){
      this.tableData = [];    

      // 随机数
      const sj = parseInt(Math.random()*20 + 2);

      for (let index = 0; index < sj; index++) {
          const tr = {};

          tr.khname = '客户名称';
          // 委托单量
          tr.wtdl = parseInt(Math.random()*10000)+'万';
          // 已开票
          tr.ykp = parseInt(Math.random()*10000)+'万';
          // 已收款
          tr.ysk = parseInt(Math.random()*10000)+'万';
          // 出证数量
          tr.czsl = parseInt(Math.random()*10000)+'万';

          this.tableData.push(tr);
      }

      console.log(this.tableData)
  },
  mounted(){},
  methods: {
      searchData(flag){
        this.chooseThis = flag;  
        this.tableData = [];    

        // 随机数
        const sj = parseInt(Math.random()*20 + 2);

        for (let index = 0; index < sj; index++) {
            const tr = {};

            tr.khname = '客户名称';
            // 委托单量
            tr.wtdl = parseInt(Math.random()*10000)+'万';
            // 已开票
            tr.ykp = parseInt(Math.random()*10000)+'万';
            // 已收款
            tr.ysk = parseInt(Math.random()*10000)+'万';
            // 出证数量
            tr.czsl = parseInt(Math.random()*10000)+'万';

            this.tableData.push(tr);
        }

      },
      loadMoreData(){
        // 随机数
        const sj = parseInt(Math.random()*20 + 2);

        for (let index = 0; index < sj; index++) {
            const tr = {};

            tr.khname = '客户名称';
            // 委托单量
            tr.wtdl = parseInt(Math.random()*10000)+'万';
            // 已开票
            tr.ykp = parseInt(Math.random()*10000)+'万';
            // 已收款
            tr.ysk = parseInt(Math.random()*10000)+'万';
            // 出证数量
            tr.czsl = parseInt(Math.random()*10000)+'万';

            this.tableData.push(tr);
        }

        console.log(this.tableData.length)
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
