<template>
  <view class='tab'>
      <a class="tab_btn" 
        v-for="(item,index) in tabData" :key="index" 
        @click="chooseThis(index)" 
        :class="{cur:item.isChecked}" 
        :style="{width: (100/tabData.length)+'%'}">{{item.name}}</a>
  </view>
</template>

<script>
import './selectTab.scss'

export default {
  name: 'tab',
  data(){
    return {}
  },
  props:{
      tabData:Array,
      setChoosedIndex:Function
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
      chooseThis(idx){
          this.tabData.forEach(el=>{
            el.isChecked = false;
          });
          this.tabData[idx].isChecked=true;
          this.setChoosedIndex(idx);
      }
  }
}
</script>
<style lang='scss' scoped>
</style>
