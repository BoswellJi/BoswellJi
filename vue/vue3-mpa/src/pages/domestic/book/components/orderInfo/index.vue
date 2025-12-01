<template>
  <div class="mt-[0.2rem] bg-[#fff] px-[0.4rem] py-[0.26rem] text-[0.2rem]">
    <h1 class="text-[0.25rem]">订单信息确认</h1>
    <template v-if="lcSingleProductBookingC.length">
      <div class="mt-[0.3rem]">
        <div class="font-bold">搭配产品</div>
        <div>
          <lc-single-product-booking :list="lcSingleProductBookingC" />
        </div>
      </div>
    </template>
    <div class="mt-[0.3rem]">
      <div class="font-bold">游玩日期</div>
      <div class="flex">
        <div class="mr-[0.4rem] flex">
          <div class="mr-[0.1rem]">游玩行程:</div>
          <div>{{ domesticBooking.queryString.version }}行程</div>
        </div>
        <div class="mr-[0.4rem] flex">
          <div class="mr-[0.1rem]">出团日期:</div>
          <div>{{ domesticBooking.queryString.day }}</div>
        </div>
        <div class="flex">
          <div class="mr-[0.2rem]">返程日期:</div>
          <div>{{ backDate }}</div>
        </div>
      </div>
    </div>
    <div class="mt-[.2rem] border border-[#CCCCCC]">
      <el-row class="justify-between border-b border-[#CCCCCC] py-[.1rem] text-[#ccc]">
        <el-col :span="3" class="text-center">价格类型</el-col>
        <el-col :span="3">建议售价</el-col>
        <el-col :span="3">结算价</el-col>
        <el-col :span="3" class="text-center">人数</el-col>
        <el-col :span="3">价格小计</el-col>
      </el-row>
      <el-row
        class="justify-between py-[.1rem]"
        v-for="item of domesticBooking.priceList"
        :key="item.PriceId"
      >
        <el-col :span="3" class="text-center">{{ item.PriceName }}</el-col>
        <el-col :span="3">&yen;{{ item.MarketPrice }}</el-col>
        <el-col :span="3">&yen;{{ item.DistributePrice }}</el-col>
        <el-col :span="3" class="text-center">{{
          item.PriceId ? domesticBooking.priceMap[item.PriceId] : ''
        }}</el-col>
        <el-col :span="3" class="text-[#FF6005]"
          >&yen;{{ domesticBooking.totalPrice(item) }}</el-col
        >
      </el-row>
    </div>
    <div class="mt-[.1rem] text-[0.2rem] text-[#ccc]">
      <div>温馨提示</div>
      <div>
        <span class="text-[#FF6005]">单房差：</span
        >本产品是按“双人共住一间房”核算的单人价格，所以当出行人数为奇数或者有游客需要单独住一间房时，需要补齐另外半间房的费用。
      </div>
    </div>
    <div class="mt-[0.3rem]" v-if="domesticBooking.prefInfoList?.length">
      <div class="font-bold">优惠详情</div>
      <div
        class="mb-1 flex items-center justify-between"
        v-for="(item, index) of domesticBooking.prefInfoList"
        :key="index"
      >
        <div class="mr-[10px] whitespace-nowrap bg-[#FF6005] px-[5px] leading-[1.2em] text-[#fff]">
          优惠立减
        </div>
        <div class="mr-[20px] whitespace-nowrap">{{ item.PrefDes }}</div>
        <div
          class="w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-1 text-[12px] text-[#ccc]"
        >
          {{ item.PrefRemark }}
        </div>
        <div class="whitespace-nowrap text-[12px] text-[#FF6005]">¥ {{ item.PrefAmount }}</div>
      </div>
    </div>
    <div class="mt-[0.3rem]">
      <div class="font-bold">保险信息</div>
      <div class="p-[20px]">
        <div class="flex leading-[1em]" v-for="(item, index) of insuranceList" :key="index">
          <div class="mr-[20px]">{{ item[0] }}</div>
          <div class="flex-1">
            <div
              class="mb-[10px] flex flex-1 items-center justify-between"
              v-for="(item1, index1) of item[1]"
              :key="index1"
            >
              <div>{{ item1.name }}</div>
              <el-popover title="保险详情" :width="500" trigger="hover">
                <template #reference>
                  <el-icon class="ml-[5px]"><QuestionFilled class="text-[#ccc]" /></el-icon>
                </template>
                <div class="h-[300px] overflow-auto" v-html="item1.detail"></div>
              </el-popover>
              <div class="ml-[20px] flex-1 border-t border-dashed"></div>
              <div class="mr-2 text-[#FF6005]">&yen;{{ item1.price }}/人</div>
              <el-checkbox
                v-model="item1.checked"
                @change="insuranceChange(Boolean($event), item[0], index1)"
                class="h-[1em!important]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-form ref="formRef" :model="formModel">
      <h1 class="text-[0.25rem]">联系人信息</h1>
      <div class="flex gap-x-[30px] p-1">
        <div class="flex-auto">
          <div class="mb-[.15rem] text-[0.2rem]">
            <span class="text-[#FF6005]">*</span>联系人姓名：
          </div>
          <div>
            <el-form-item prop="concat.name" :rules="[{ required: true }]" :show-message="false">
              <el-input v-model="formModel.concat.name" />
            </el-form-item>
          </div>
        </div>
        <div class="flex-auto">
          <div class="mb-[.15rem] text-[0.2rem]">
            <span class="text-[#FF6005]">*</span>联系人手机：
          </div>
          <div>
            <el-form-item prop="concat.phone" :rules="[{ required: true }]" :show-message="false">
              <el-input v-model="formModel.concat.phone" />
            </el-form-item>
          </div>
        </div>
        <div class="relative flex-1">
          <div class="mb-[.15rem] text-[0.2rem]">
            <span class="text-[#FF6005]">*</span>
            联系人邮箱：
          </div>
          <div>
            <el-form-item prop="concat.email" :rules="[{ required: true }]" :show-message="false">
              <el-input v-model="formModel.concat.email" />
            </el-form-item>
          </div>
          <div class="mt-[5px] text-[12px]">用于接收出团通知书，请正确填写联系人邮箱</div>
        </div>
      </div>
      <h1 class="flex items-center justify-between text-[0.25rem]">
        <span> 出游人信息</span>
        <div>
          <span
            class="mr-[10px] cursor-pointer bg-[#FF6005] px-[5px] py-[2px] text-[15px] text-[#FFF]"
            @click="cancelTourist"
            >稍后提供</span
          >
          <span
            class="cursor-pointer border border-dashed border-[#0185c6] text-[15px] text-[#0185c6] hover:border-[#FF6005] hover:text-[#FF6005]"
            @click="addTourist"
            >+增加出游人</span
          >
        </div>
      </h1>
      <div class="mb-[.15rem] text-[12px] text-[#ccc]">
        <span class="text-[#FF6005]">*</span
        >为保障顺利占位，出游人数小于等于10人时，请提供真实完整的游客信息再提交订单；如暂无游客信息，请联系出境计调进行处理）
      </div>
      <div class="p-1">
        <el-checkbox-group v-model="personTypeList" @change="personTypeListChange">
          <el-checkbox label="有孕妇">有孕妇</el-checkbox>
          <el-checkbox label="有80周岁（含）以上的老人">有80周岁（含）以上的老人</el-checkbox>
          <el-checkbox label="有外籍友人（含港澳台同胞）">有外籍友人（含港澳台同胞）</el-checkbox>
          <el-checkbox label="都是未成年人">都是未成年人</el-checkbox>
        </el-checkbox-group>
        <template v-for="(item, index) of formModel.list" :key="index">
          <h1 class="py-[10px] text-[0.24rem]">游客{{ index + 1 }}</h1>
          <div class="flex flex-wrap gap-x-[20px]">
            <div class="mb-[10px] w-[10%]">
              <div class="mb-[.15rem] text-[0.2rem]">中文姓名</div>
              <div>
                <el-form-item
                  :prop="`list[${index}].name`"
                  :rules="[{ required: true }]"
                  :show-message="false"
                >
                  <el-input v-model="item.name" />
                </el-form-item>
              </div>
            </div>
            <div class="w-[10%]">
              <div class="mb-[.15rem] text-[0.2rem]">类别</div>
              <div>
                <el-select v-model="item.personType">
                  <el-option label="成人" value="1"></el-option>
                  <el-option label="儿童" value="2"></el-option>
                </el-select>
              </div>
            </div>
            <div class="w-[13%]">
              <div class="mb-[.15rem] text-[0.2rem] opacity-0">*</div>
              <div>
                <el-select v-model="item.certType">
                  <el-option label="身份证" value="1"></el-option>
                  <template v-if="detail.cardTypeLimits">
                    <el-option label="护照" value="2"></el-option>
                    <el-option label="其他" value="10"></el-option>
                  </template>
                </el-select>
              </div>
            </div>
            <div class="w-[30%]">
              <div class="mb-[.15rem] text-[0.2rem]">证件号</div>
              <div>
                <el-form-item
                  :prop="`list[${index}].idNo`"
                  :rules="[{ required: true }]"
                  :show-message="false"
                >
                  <el-input v-model="item.idNo" @blur="idNoBlur(item)" />
                </el-form-item>
              </div>
            </div>
            <div class="w-[20%]">
              <div class="mb-[.15rem] text-[0.2rem]">出生日期</div>
              <div>
                <el-form-item
                  :prop="`list[${index}].date`"
                  :rules="[{ required: true }]"
                  :show-message="false"
                >
                  <el-date-picker
                    value-format="YYYY-MM-DD"
                    v-model="item.date"
                    type="date"
                    placeholder="请选择"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="w-[20%]">
              <div class="mb-[.15rem] text-[0.2rem]">性别</div>
              <div>
                <el-radio-group v-model="item.sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="w-[20%]">
              <div class="mb-[.15rem] text-[0.2rem]">手机号</div>
              <div>
                <el-form-item
                  :prop="`list[${index}].phone`"
                  :rules="[{ required: true }]"
                  :show-message="false"
                >
                  <el-input v-model="item.phone" />
                </el-form-item>
              </div>
            </div>
            <div class="w-[48%] text-right" v-if="index != 0">
              <div class="mb-[.15rem] text-[0.2rem] opacity-0">*</div>
              <div>
                <el-button @click="formModel.list.splice(index, 1)">删除</el-button>
              </div>
            </div>
          </div>
        </template>
      </div>
      <h1 class="text-[0.25rem]">备注信息</h1>
      <el-input
        class="mt-[10px]"
        maxlength="1000"
        placeholder=""
        show-word-limit
        type="textarea"
        resize="none"
        :rows="4"
        v-model="domesticBooking.remark"
      />
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useDomesticBooking } from '@/stores/domesticBooking';
import request from '@/utils/request';
import type { CheckboxValueType, FormInstance } from 'element-plus';
import moment from 'moment';
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { IdCardReg } from '@/utils/regexp';

const domesticBooking = useDomesticBooking();
const personTypeList = ref<string[]>([]);
const insuranceList = domesticBooking.insuranceList;
const formModel = reactive({
  concat: domesticBooking.concatPerson,
  list: domesticBooking.personList,
});
const formRef = ref<FormInstance>();
const lcSingleProductBookingC: any = computed(() => {
  return domesticBooking.singleProduct || [];
});
const allPersonCount = computed(() => {
  return Object.values(domesticBooking.priceMap).reduce((total, item) => {
    return (total += Number(item));
  }, 0);
});
const detail = computed(() => {
  return domesticBooking.detail || ({} as Domestic.Data);
});
const backDate = computed(() => {
  return moment(domesticBooking.queryString.day.replace(/-/g, '/'))
    .add(domesticBooking.queryString.playDays - 1, 'days')
    .format('YYYY-MM-DD');
});

const getDomesticInsurance = async () => {
  const { lineId, departureCityId, arrivalCityId } = detail.value;
  const { priceList } = domesticBooking;
  const price0 = priceList ? priceList[0] : ({} as Domestic.PriceObjType); // 成人价
  const price1 = priceList ? priceList[1] : ({} as Domestic.PriceObjType); // 单房差
  const data = await request<DomesticInsurance.Res, DomesticInsurance.Res, DomesticInsurance.Req>({
    url: '/webapi/domestic/getDomesticInsurance',
    method: 'post',
    data: {
      lineId: String(lineId),
      playDays: domesticBooking.queryString.playDays,
      price: Number(price0.DistributePrice),
      allPrice: Number(price1.DistributePrice),
      deaprtCityId: departureCityId,
      arriveCityId: arrivalCityId.split(',')[0],
    },
  });
  const typeMap: { [key: string]: string } = {
    0: '旅游险',
    3: '综合险',
    1: '取消险',
  };
  data.data.forEach((item) => {
    item.checked = false;
    const key = item.insuranceType.toString();
    if (insuranceList.has(typeMap[key])) {
      const arr = insuranceList.get(typeMap[key]) as DomesticInsurance.Data[];
      arr.push(item);
      insuranceList.set(typeMap[key], arr);
    } else {
      insuranceList.set(typeMap[key], [item]);
    }
  });
};

const insuranceChange = (flag: boolean, key: string, index: number) => {
  if (flag) {
    for (let item of insuranceList) {
      item[1].forEach((item1, index1) => {
        if (item[0] === key && index === index1) {
          // todo...
        } else {
          item1.checked = false;
        }
      });
    }
  }
};

const personTypeListChange = (e: CheckboxValueType[]) => {
  domesticBooking.setPersonTypeList(e as unknown as string[]);
};

const idNoBlur = (item: domesticBooking.Person) => {
  if (IdCardReg.test(item.idNo)) {
    const id = item.idNo.slice(6, 14);
    const sex = item.idNo.slice(16, 17);
    item.date = `${id.slice(0, 4)}-${id.slice(4, 6)}-${id.slice(6, 8)}`;
    item.sex = Number(sex) % 2 ? '1' : '0';
  }
};

const getUserInfo = async () => {
  const {
    data: { contactMobile, contactName, contractEmail },
  } = await request({
    url: '/webapi/common/getUserInfo',
    method: 'get',
  });
  domesticBooking.concatPerson.name = contactName;
  domesticBooking.concatPerson.phone = contactMobile;
  domesticBooking.concatPerson.email = contractEmail;
  domesticBooking.setUserName(contactName);
};

const addTourist = () => {
  if (domesticBooking.personList.length >= allPersonCount.value) return;
  domesticBooking.personList.push({
    name: '',
    personType: '1',
    certType: '1',
    idNo: '',
    date: '',
    sex: '1',
    phone: '',
  });
};

const cancelTourist = () => {
  domesticBooking.setPersonList([]);
  formModel.list = domesticBooking.personList;
};

const upgradeScheme = () => {};

onBeforeMount(() => {
  upgradeScheme();
  getUserInfo();
});

onMounted(() => {
  domesticBooking.formRef = formRef.value;
});

watch(
  () => detail.value,
  () => {
    getDomesticInsurance();
  },
);
</script>
