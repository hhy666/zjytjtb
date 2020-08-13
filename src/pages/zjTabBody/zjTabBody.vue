<template>
  <view class='zjTabBody'>
      <gstj v-if="showedTabIndex == 0" />
      <qygstj v-if="showedTabIndex == 1" />
      <cpxtj v-if="showedTabIndex == 2" />
      <khtj v-if="showedTabIndex == 3" />
  </view>
</template>

<script>
import './zjTabBody.scss'
import gstj from '../gstj/gstj.vue'
import qygstj from '../qygstj/qygstj.vue'
import cpxtj from '../cpxtj/cpxtj.vue'
import khtj from '../khtj/khtj.vue'

export default {
  name: 'zjTabBody',
  data(){
    return {}
  },
  props:{
      showedTabIndex:Number
  },
  components: {
      gstj: gstj,
      qygstj: qygstj,
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
