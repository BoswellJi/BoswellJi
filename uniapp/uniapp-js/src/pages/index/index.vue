<template>
  <view class="content">
    <view>
      <text class="title">{{ title }}</text>
      <button @tap="tapHandle">点击</button>
    </view>
    <component1>
      <template v-slot:default="scope">
        <view>
          default  slot content{{scope}}
        </view>
       </template> 
       <template v-slot:header="scope">
        <view>
          header  slot content{{scope}}
        </view>
       </template> 
       <template v-slot:body="scope">
        <view>
          body  slot content{{scope}}
        </view>
       </template> 
    </component1>
    <component2></component2>
  </view>
</template>

<script>
import component1 from '../components/component1';
import component2 from '../components/component2';

export default {
  provide: {
    foo: 'bar'
  },

  components: {
    component1,
    component2
  },
  data() {
    return {
      title: 'Hello',
      name: 'df'
    };
  },
  onLoad() {
    // console.log(this.foo,'Page');
  },
  methods: {
    tapHandle() {
      this.title = this.title == 'Boswell' ? 'Hello' : 'Boswell';
      uni.navigateTo({ url: '/pages/second/index?name=Boswell' })
    }
  }
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
