<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title">{{ title }}</text>
      <button @tap="tapHandle">点击</button>
    </view>
		<component1></component1>
  </view>
</template>

<script>
import component1 from '../components/component1';
export default {
	components:{
		component1
	},
  data() {
    return {
      title: "Hello",
			name:'df'
    };
  },
  onLoad() {
    
  },
  methods: {
    tapHandle() {
      this.title = this.title == "Boswell" ? "Hello" : "Boswell";
    },
  },
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
