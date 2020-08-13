<template>
  <view class='showCompany' :style="{height:pmHeight+'px'}" >
      <view class="sc_outer_kuang" :style="{height:pmHeight+'px'}" ></view>
      <view class="sc_inner_kuang" :style="{height:pmHeight*0.78+'px'}" >
          <view class="scik_title" >
              <text class="scikt_word" >请选择公司</text>
              <a class="scikt_close" @click="cancle()" >x</a>
          </view>
          <view class="scik_body" >
              <view class="scikb_left" :style="{height: childrenData.length*44+'px'}">
                  <a class="scikbl_tr" 
                    v-for="(item,index) in companyData" :key="index" 
                    :class="{choosed: choosedIndex == index}"
                    @click="showChildren(index)" >{{item.name}}</a>
              </view>
              <view class="scikb_right" 
                @touchstart="touchStart($event)" 
                @touchmove="touchMove($event)" 
                @touchend="touchEnd($event)" 
                :style="{height: childrenData.length*44+'px'}" >
                  <a class="scikbr_tr"
                    v-for="(item,index) in childrenData" :key="index" 
                    :class="{choosed: choosedChildIndex == index}"
                    @click="chooseThis(index)" >{{item.name}}</a>
              </view>
          </view>
          <view class="scik_bottom" >
              <a class="cancel_btn" @click="cancle()" >取消</a>
              <a class="submit_btn" @click="submit()" >确定</a>
          </view>
      </view>
  </view>
</template>

<script>
import './showCompany.scss'
import Taro from '@tarojs/taro'
import { $ } from '@tarojs/extend';

export default {
  name: 'showCompany',
  data(){
    return {
        companyData:Array,
        childrenData:Array,
        choosedIndex:Number,
        choosedChildIndex:-1,
        pmHeight:Number,
        defaultOffset: 50, // 默认高度, 相应的修改.releshMoudle的margin-top和.down-tip, .up-tip, .refresh-tip的height
        top: 0,
        scrollIsToTop: 0,
        startY: 0,
        isDropDown: true, // 是否下拉
        isRefreshing: false, // 是否正在刷新  
        dropDownState: 1, // 显示1:下拉可以刷新, 2:松开立即刷新, 3:正在刷新数据中...
        dropDownInfo: {
            downText: '下拉可以刷新',
            downImg: 'arrow.png',
            upText: '松开立即刷新',
            upImg: 'arrow.png',
            refreshText: '正在刷新数据...',
            refreshImg: 'loading.png'
        }
    }
  },
  props:{
      showChoosedCompany:Function
  },
  components: {},
  created(){
      this.pmHeight = window.innerHeight;
      this.choosedIndex = 0;

      this.companyData = [];

      this.companyData.push({id:'zjdw', name:'在京单位', children:[]});
      this.companyData.push({id:'dfgs', name:'地方公司', children:[]});
      this.companyData.push({id:'jwgs', name:'境外公司', children:[]});

      for (let index = 0; index < parseInt(Math.random()*10+3); index++) {
          this.companyData[0].children.push({id:'zjdw', name:'在京单位'+index, isChoosed: false});
      }
      
      for (let index = 0; index < parseInt(Math.random()*10+3); index++) {
          this.companyData[1].children.push({id:'zjdw', name:'地方公司'+index, isChoosed: false});
      }
      
      for (let index = 0; index < parseInt(Math.random()*10+3); index++) {
          this.companyData[2].children.push({id:'zjdw', name:'境外公司'+index, isChoosed: false});
      }

      this.childrenData = this.companyData[0].children;
  },
  mounted(){},
  methods: {
      showChildren(index){
          this.choosedIndex = index;
          this.choosedChildIndex = -1;
          this.childrenData = this.companyData[index].children;
      },
      chooseThis(index){
          this.choosedChildIndex = index;
      },
      cancle(){
          this.showChoosedCompany();
      },
      submit(){
          if(this.choosedChildIndex == -1){
              return false;
          }

          $('body').removeClass('modal-open');
          // 设置 点击的公司信息
          Taro.setStorageSync("showType",this.childrenData[this.choosedChildIndex].id);
          Taro.setStorageSync("showTypeName",this.childrenData[this.choosedChildIndex].name);

          Taro.reLaunch({
              url:'/pages/index/index?s='+Math.random()
          });
      }, 
    /**
     * 触摸开始，手指点击屏幕时
     * @param {object} e Touch 对象包含的属性
     */
    touchStart(e){
      this.startY=e.targetTouches[0].pageY;
    },
    /**
     * 接触点改变，滑动时
     * @param {object} e Touch 对象包含的属性
     */
    touchMove (e){
      if (e.targetTouches[0].pageY > this.startY) {
        // 下拉
        this.isDropDown = true;        
      }else{
        // 上啦
        this.isDropDown = false
      }
    },
    /**
     * 触摸结束，手指离开屏幕时
     * @param {object} e Touch 对象包含的属性
     */
    touchEnd: function(e){
      if (this.isDropDown && !this.isRefreshing) {
        // if (this.top >= this.defaultOffset) {
        //   // do refresh
        //   this.refresh()
        //   this.isRefreshing = true
        // } else {
        //   // cancel refresh
        //   this.isRefreshing = false
        //   this.isDropDown = false
        //   // this.dropDownState = 1
        //   this.top = 0
        // }
      }else if(!this.isDropDown && !this.isRefreshing){
        var scrollHeight = document.querySelector('.scik_body').scrollHeight;
        var scrollTop = document.querySelector('.scik_body').scrollTop;
        var clientHeight = document.querySelector('.scik_body').clientHeight;
        if (scrollHeight - clientHeight <= (scrollTop+3)) {
            //滚动条滚到最底部
            this.refresh();
        }
      }
    },
    /**
     * 刷新
     */
    refresh () {
      // this.dropDownState = 3
      this.top = this.defaultOffset
      // 这是全是静态数据,延时1200毫秒，给用户一个刷新的感觉，如果是接口数据的话，直接调接口即可
      // setTimeout(() => {
        this.addChildrenData(this.refreshDone)
      // }, 1000)
    },
    addChildrenData(f){
        const le = this.companyData[this.choosedIndex].children.length;
        for (let index = 0; index < parseInt(Math.random()*10+3); index++) {
          this.companyData[this.choosedIndex].children.push({id:'zjdw', name:this.companyData[this.choosedIndex].name+(le+index), isChoosed: false});
        }

        this.childrenData = this.companyData[this.choosedIndex].children;
        
        if(typeof f != undefined){
            f;
        }
    },
    /**
     * 刷新完成
     */
    refreshDone () {
      this.isRefreshing = false
      this.isDropDown = false
      this.dropDownState = 1
      this.top = 0
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
