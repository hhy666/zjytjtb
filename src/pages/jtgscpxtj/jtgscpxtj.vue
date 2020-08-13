<template>
  <view class='jtgscpxtj'>
    <view class="jtgscpxtj_part_1" >
      <text class="jtgscpxtj_part_1_title" >{{jtgscpxtjPart1Title}}</text>
      <view class="jtgscpxtj_table" >
        <view class="jtgscpxtj_table_head" >
            <text class="jtgscpxtj_table_head_th" >产品线</text>
            <text class="jtgscpxtj_table_head_th" >委托单量</text>
            <text class="jtgscpxtj_table_head_th" >开票收入</text>
            <text class="jtgscpxtj_table_head_th" >成本总额</text>
            <text class="jtgscpxtj_table_head_th" >出证数量</text>
        </view>
        <view class="jtgscpxtj_table_tr" v-for="(item,index) in tableData" :key="index" >
            <view class="jtgscpxtj_table_head_td" >
                <a :class="{icon_close:!showedChildrenIndex[index], icon_open: showedChildrenIndex[index]}" 
                    v-if="item.children.length > 0"
                    @click="showChildrenData(index)" ></a>
                <text class="gtht_name" 
                    :class="{iconNotExist:item.children.length == 0}" 
                    >{{item.cpxname}}</text>
            </view>
            <text class="jtgscpxtj_table_head_td" >{{item.wtdl}}</text>
            <text class="jtgscpxtj_table_head_td" >{{item.kpsr}}</text>
            <text class="jtgscpxtj_table_head_td" >{{item.cbze}}</text>
            <text class="jtgscpxtj_table_head_td" >{{item.czsl}}</text>

            <view class="jtgscpxtj_table_tr_children" 
                v-for="(im,idx) in item.children" :key="idx" 
                v-if="showedChildrenIndex[index]" >
                <a class="jtgscpxtj_table_head_td" @click="gotoGsDetail(index,idx)" >{{im.cpxname}}</a>
                <text class="jtgscpxtj_table_head_td" >{{im.wtdl}}</text>
                <text class="jtgscpxtj_table_head_td" >{{im.kpsr}}</text>
                <text class="jtgscpxtj_table_head_td" >{{im.cbze}}</text>
                <text class="jtgscpxtj_table_head_td" >{{im.czsl}}</text>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import './jtgscpxtj.scss'

export default {
  name: 'jtgscpxtj',
  data(){
    return {
        jtgscpxtjPart1Title:'按产品线统计',
        tableData:Array,
        showedChildrenIndex:Array
    }
  },
  components: {},
  created(){
      this.tableData = [];    
      
      for (let index = 0; index < 8; index++) {
          const tr = {};

          tr.cpxname = this.returnCpxName(index);
          // 委托单量
          tr.wtdl = parseInt(Math.random()*10000)+'万';
          // 开票收入
          tr.kpsr = parseInt(Math.random()*10000)+'万';
          // 成本总额
          tr.cbze = parseInt(Math.random()*10000)+'万';
          // 出证数量
          tr.czsl = parseInt(Math.random()*10000)+'万';

          // 随机数
          const sj = parseInt(Math.random()*20 + 2), child = [];

          for (let idx = 0; idx < sj; idx++) {
              child.push({
                  cpxname: tr.cpxname+idx,
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
      },
      returnCpxName(ix){
          let cpxname = "";
          switch(ix){
            case 0:
                cpxname = "大宗贸易";
                break;
            case 1:
                cpxname = "农食安全及溯源";
                break;
            case 2:
                cpxname = "工业";
                break;
            case 3:
                cpxname = "消费品";
                break;
            case 4:
                cpxname = "政府与机构业务";
                break;
            case 5:
                cpxname = "认证服务与企业优化";
                break;
            case 6:
                cpxname = "其他";
                break;
            case 7:
                cpxname = "其他支出项";
                break;
          }

          return cpxname;
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
