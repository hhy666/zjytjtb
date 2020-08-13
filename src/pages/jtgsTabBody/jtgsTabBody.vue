<template>
  <view class='jtgsTabBody'>
      <jtgsgstj v-if="showedTabIndex == 0" />
      <jtgscpxtj v-if="showedTabIndex == 1" />
      <jtgskhtj v-if="showedTabIndex == 2" />
  </view>
</template>

<script>
import './jtgsTabBody.scss'
import jtgsgstj from '../jtgsgstj/jtgsgstj.vue'
import jtgscpxtj from '../jtgscpxtj/jtgscpxtj.vue'
import jtgskhtj from '../jtgskhtj/jtgskhtj.vue'

export default {
  name: 'jtgsTabBody',
  data(){
    return {}
  },
  props:{
      showedTabIndex:Number
  },
  components: {
      jtgsgstj: jtgsgstj,
      jtgscpxtj: jtgscpxtj,
      jtgskhtj: jtgskhtj
  },
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
