<template>
  <div class="left_left">
    <div class="Cal_Box clearfix">
      <div class="calendar-panel mCal" id="calendarcontainer" ref="calendarcontainer"></div>
    </div>
    <!-- <p class="aheadtips">预订此产品请于<span class="aheadtime">2012</span>前下单</p> -->
  </div>
</template>
<script setup lang="ts">
/* eslint-disable */
// @ts-nocheck
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { convertKeyUpperFirst } from '@/utils/util'

const emit = defineEmits<{
  (e: 'change', data: string, priceList: any[]): void
  (e: 'changePrice', data: PriceType)
  (e: 'initPrice', data: unknown[])
}>()
const startdate = ref('')
const calendarcontainer = ref()
let initday = cang.simpleday(new Date()).replace(/-/g, '/')
let priceList = []

const handlerChangePrice = (e) => {
  const target = e.target
  const className = target.className
  const text = target.innerText
  if (className === 'keng') {
    if (text === '同行价') {
      target.innerText = '建议价'
      $('.left_left').find('.market_price em').html('(*当前显示为同行价)')
      $('.left_left .dataprice').removeClass('none')
      $('.left_left .dataprace').addClass('none')
      emit('changePrice', 0 as PriceType.marketPrice)
    } else {
      target.innerText = '同行价'
      $('.left_left').find('.market_price em').html('(*当前显示为建议售价)')
      $('.left_left .dataprice').addClass('none')
      $('.left_left .dataprace').removeClass('none')
      emit('changePrice', 1 as PriceType.distributePrice)
    }
  }
}

const changePrice = () => {
  calendarcontainer.value.addEventListener('click', handlerChangePrice, false)
}

const unbindChangePrice = () => {
  calendarcontainer.value.removeEventListener('click', handlerChangePrice)
}

function showCalender() {
  let lineId = cang.getquerystring('LineId') || 1015472,
    u = cang.root + '/webapi/domestic/getDomesticPriceCalendar'
  $.ajax({
    url: u,
    type: 'post',
    data: JSON.stringify({ lineId }),
    headers: {
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    success: function (d) {
      d = convertKeyUpperFirst(d.data)
      if (d && d.PriceList) {
        const dl = d.PriceList
        priceList = dl
        for (var i = 0, ig = dl.length; i < ig; i++) {
          if (dl[i].ResidualCount >= 0) {
            startdate.value = dl[i].StartDate
            initday = startdate.value.replace(/-/g, '/')
            break
          }
        }
        CreateCalendar(setPara(dl), 'para')
        $('.goday').html('--')
        $('.backday').html('--')
        $('.tabledata .loadingp').addClass('none')
        changePrice()
        handlerInitDate(dl[0])
        emit('initPrice', priceList)
      } else {
        CreateCalendar(setPara([]), 'para')
        $('.goday').html('--')
        $('.backday').html('--')
        $('.loadingp').html('暂无团期供您选择')
        $('.bookquickbtn').css('background', '#eee').unbind('click')
      }
      handlerClickDate()
    }
  })
}

function setPara(datalist) {
  var tY, tM, tD, moon, even, toDate, para
  toDate = new Date(initday.replace(/-/g, '/'))
  tY = toDate.getFullYear()
  tM = toDate.getMonth() + 1
  tD = toDate.getDate()
  moon = tY - 1 + '-' + tM + '-' + tD
  even = tY + 1 + '-' + tM + '-' + tD
  para = {
    c: 'calendarcontainer',
    y: tY,
    m: tM,
    a: {
      d1: moon,
      d2: even
    },
    f: 0,
    clickfu: function (to) {},
    showFu: function (d) {
      var p = {},
        parsetime = cang.simpleday(d)
      for (var i = 0; i < datalist.length; i++) {
        var item = datalist[i]
        var mydate = item.StartDate
        if (mydate == parsetime) {
          p.PriceId = true
          p.AmountAdvice = item.MarketPrice
          p.AmountDirect = item.DistributePrice
          var status = item.ResidualCount
          if (status >= 0) {
            p.ResidualCount = status ? status : 10
            p.ResidualDesc = ''
          } else {
            p.ResidualCount = 0
            p.ResidualDesc = '售罄'
          }
          if (cang.simpleday(initday) == parsetime) {
            p.hover = true
          }
          //20200915新增优惠信息
          p.ContainPref = item.ContainPref || false
          p.PrefRuleId = item.PrefRuleId || 0
          p.PrefDes = item.PrefDes || ''
          p.PrefRemark = item.PrefRemark || ''
          p.PrefSupplierDes = item.PrefSupplierDes || ''
        }
      }
      return p
    }
  }
  window.para = para
  return para
}

const handleDate = ($td) => {
  if ($td.hasClass('enough')) {
    $('.left_left td').removeClass('from-day')
    $td.addClass('from-day')
    const initday = $td.attr('data-date')
    emit('change', initday, priceList)
  }
}

const handlerClickDate = () => {
  $('.left_left').delegate('td', 'click', function () {
    handleDate($(this))
  })
}

const handlerInitDate = (date) => {
  const $td = $(`.left_left td[data-date="${date.StartDate}"]`)
  handleDate($td)
}

onMounted(() => {
  showCalender()
})

onBeforeUnmount(() => {
  unbindChangePrice()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
