<template>
  <div class="page-list">
    <div class="why_choose_us" v-show="brand">
      <div class="choose_lc clearfix">
        <div class="sin_choose">
          <div class="choose_img"></div>
          <p>旅游B2B平台</p>
          <span>同程旅游B2C+旅仓B2B</span>
          <span>无缝对接构建B2B2C生态体系</span>
          <span>我们坚持去做最受客户信赖的平台</span>
        </div>
        <div class="sin_choose">
          <div class="choose_img"></div>
          <p>海量供应商资源</p>
          <span>拥有自己的供应商系统</span>
          <span>共享同程所有采购渠道和资源</span>
          <span>我们坚持为同行提供更加丰富的旅游产品</span>
        </div>
        <div class="sin_choose">
          <div class="choose_img"></div>
          <p>优质的服务</p>
          <span>专属客户经理</span>
          <span>强大的计调团队</span>
          <span>我们坚持一切以客户的需求为依归</span>
        </div>
        <div class="sin_choose">
          <div class="choose_img"></div>
          <p>移动收客解决方案</p>
          <span>小程序为同行分享转发</span>
          <span>提供便捷的移动办公</span>
          <span>我们坚持为同行提供最优的营销系统</span>
        </div>
      </div>
    </div>

    <div class="bottom-box">
      <p>苏州工业园区裕新路188号同程大厦 邮编: 215123</p>
      <p>Copyright © 2013-2022 版权所有 同程网络科技股份有限公司</p>
      <p>
        <a
          class="a_keepRecodeInfo"
          href="http://beian.miit.gov.cn/"
          target="_blank"
          title="备案序号：苏ICP备09033604号-30"
          rel="nofollow"
          >备案序号：苏ICP备09033604号-30</a
        >
      </p>
      <p>
        <a href="/helper/helpcenter" target="_blank">帮助中心</a> <span> | </span>
        <a href="/helper/helpcenter?tag=about" target="_blank">关于我们</a> <span> | </span>
        <a href="/helper/helpcenter?tag=contact" target="_blank">联系我们</a> <span> | </span>
        <a href="/account/register" target="_blank">分销商入驻</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    brand: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
