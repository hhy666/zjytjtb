<template>
  <view class='cpxTabBody'>
      <cpxgstj v-if="showedTabIndex == 0" />
      <fwjstj :jsid='showedTabIndex' v-if="showedTabIndex == 1" />
      <fwjstj :jsid='showedTabIndex' v-if="showedTabIndex == 2" />
      <khtj v-if="showedTabIndex == 3" />
  </view>
</template>

<script>
import './cpxTabBody.scss'
import cpxgstj from '../cpxgstj/cpxgstj.vue'
import fwjstj from '../fwjstj/fwjstj.vue'
import cpxtj from '../cpxtj/cpxtj.vue'
import khtj from '../khtj/khtj.vue'

export default {
  name: 'cpxTabBody',
  data(){
    return {}
  },
  props:{
      showedTabIndex:Number
  },
  components: {
      cpxgstj: cpxgstj,
      fwjstj: fwjstj,
      cpxtj: cpxtj,
      khtj: khtj
  },
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
