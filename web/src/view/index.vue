<template>
  <div class="page">
    <div class="searcharea">
      <el-row>
        <el-col :span="8">
          月份：
          <el-select v-model="selectMonth" placeholder="Select">
            <el-option label="全部" :value="0">
              <div align="center">全部</div>
            </el-option>
            <el-option
              v-for="item in monthlist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <div align="center">{{ item.label }}</div>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          账单分类：
          <el-select v-model="selectCategories" placeholder="Select">
            <el-option label="全部" value="">
              <div align="center">全部</div>
            </el-option>
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <div align="center">{{ item.name }}</div>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8"
          ><el-button type="primary" @click="search">搜索</el-button>
          <el-button type="success" @click="addpage">添加</el-button></el-col
        >
      </el-row>
    </div>
    <div class="tablearea">
      <el-table :data="billLIst" height="400" style="width: 100%">
        <el-table-column prop="timedesc" label="账单时间" width="300" />
        <el-table-column prop="typedesc" label="账单类型" width="180" />
        <el-table-column prop="categorydesc" label="账单分类" />
        <el-table-column prop="amount" label="账单金额">
          <template #default="scope"> {{ scope.row.amount }}￥ </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="totalarea">
      <el-row>
        <el-col align="center" :span="8">
          支出:
          <span class="red"> {{ totalInfo.pay }}</span>
        </el-col>
        <el-col align="center" :span="8">
          收入:
          <span class="red"> {{ totalInfo.income }}</span>
        </el-col>
        <el-col align="center" :span="8">
          <span class="detailbutton" @click="dialogDetail = true">详情>></span>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="dialogVisible" title="添加" width="70%">
      <el-row>
        <el-col :span="8">
          账单分类：
          <el-select
            class="amount"
            v-model="newAddInfo.category"
            placeholder="Select"
            @change="typechange"
          >
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <div align="center">{{ item.name }}</div>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          账单金额：
          <el-input
            class="amount"
            v-model="newAddInfo.amount"
            @input="restrictedMoney"
            placeholder="Please input"
          />
          <span>￥</span>
        </el-col>
        <el-col :span="8"> 账单类型：{{ newAddInfo.typedesc }} </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addBillInfo">添加</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogDetail" title="详情" width="70%">
      <el-table :data="detailInfo" height="400" style="width: 100%">
        <el-table-column prop="categorydesc" label="账单分类" />
        <el-table-column prop="pay" label="支出" width="300" sortable>
          <template #default="scope"> {{ scope.row.pay }}￥ </template>
        </el-table-column>
        <el-table-column prop="income" label="收入" width="180" sortable>
          <template #default="scope"> {{ scope.row.income }}￥ </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogDetail = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElSelect,
  ElOption,
  ElRow,
  ElCol,
  ElDialog,
  ElInput,
  ElMessage,
} from "element-plus";
import { addBill, getBill, getCategories } from "../api/api";
import dayjs from "dayjs";
import { plusOrMinus } from "../lib/util";
export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
    ElSelect,
    ElOption,
    ElRow,
    ElCol,
    ElInput,
    ElDialog,
  },
  setup() {
    const billLIst = ref([] as any[]); //账单列表
    const categories = ref([] as any[]); //分类
    const monthlist = ref([] as any[]);
    const selectMonth = ref(0);
    const selectCategories = ref("");
    const dialogVisible = ref(false);
    const dialogDetail = ref(false);
    const newAddInfo = ref({
      category: "",
      amount: "0",
      type: 0,
      typedesc: "",
    });
    //总额信息
    const totalInfo = computed(() => {
      let res = {
        pay: 0,
        income: 0,
      };
      billLIst.value.forEach((item: { category: String; [key: string]: any }) => {
        if (item.type == 0) {
          res.pay += parseFloat(item.amount);
        } else {
          res.income = parseFloat(item.amount);
        }
      });
      return res;
    });
    //详细总和信息
    const detailInfo = computed(() => {
      let catemap = getCateMap();
      let res: any[] = [];
      let totalMap: { [key: string]: any } = {};
      billLIst.value.forEach((item: { category: String; [key: string]: any }) => {
        let typename = catemap[String(item.category)].name;
        if (totalMap[typename] == undefined) {
          totalMap[typename] = {
            categorydesc: typename,
            pay: 0,
            income: 0,
          };
        }
        if (item.type == 0) {
          totalMap[typename].pay += parseFloat(item.amount);
        } else {
          totalMap[typename].income = parseFloat(item.amount);
        }
      });
      Object.keys(totalMap).forEach((key: string) => {
        res.push(totalMap[key]);
      });
      return res;
    });

    for (let index = 1; index <= 12; index++) {
      monthlist.value.push({
        value: index,
        label: `${index}月`,
      });
    }

    const getCateMap = () => {
      let map: { [key: string]: any } = {};
      categories.value.forEach((item: { [key: string]: any }) => {
        map[String(item.id)] = item;
      });
      return map;
    };
    /**
     * 搜索操作
     */
    const search = async () => {
      let datalist: any[] = await getBill();
      datalist = datalist.filter((item) => {
        if (selectMonth.value == 0) {
          return true;
        }

        return dayjs(new Date(parseInt(item.time))).month() === selectMonth.value - 1;
      });
      datalist = datalist.filter((item) => {
        if (selectCategories.value == "") {
          return true;
        }
        return item.category === selectCategories.value;
      });

      billLIst.value = datalist;
      let catemap = getCateMap();
      billLIst.value.forEach((item: { category: String; [key: string]: any }) => {
        item.categorydesc = catemap[String(item.category)].name;
        item.timedesc = dayjs(new Date(parseInt(item.time))).format();
        item.typedesc = item.type == 0 ? "支出" : "收入";
      });
    };
    const addpage = () => {
      dialogVisible.value = true;
      newAddInfo.value.category = categories.value[0].id;
      newAddInfo.value.type = categories.value[0].type;
      newAddInfo.value.typedesc = categories.value[0].type == 0 ? "支出" : "收入";
      newAddInfo.value.amount = "0";
    };
    const typechange = () => {
      let catemap = getCateMap();
      newAddInfo.value.type = catemap[newAddInfo.value.category].type;
      newAddInfo.value.typedesc = newAddInfo.value.type == 0 ? "支出" : "收入";
    };
    /**
     * 账单数值匹配
     */
    const restrictedMoney = () => {
      if (newAddInfo.value.amount == "") {
        newAddInfo.value.amount = "0";
      } else {
        newAddInfo.value.amount = String(plusOrMinus(newAddInfo.value.amount));
      }
    };
    /**
     * 添加账单
     */
    const addBillInfo = async () => {
      try {
        await addBill(newAddInfo.value);
        dialogVisible.value = false;
        search();
        ElMessage("保存成功");
      } catch {
        ElMessage("保存失败");
      }
    };

    onMounted(async () => {
      categories.value = await getCategories();
      search();
    });
    return {
      billLIst,
      categories,
      monthlist,
      selectMonth,
      selectCategories,
      search,
      dialogVisible,
      newAddInfo,
      addpage,
      typechange,
      restrictedMoney,
      addBillInfo,
      totalInfo,
      detailInfo,
      dialogDetail,
    };
  },
});
</script>

<style scoped>
.page {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 20px 80px 20px 80px;
}
.searcharea {
  margin-bottom: 30px;
}
.tablearea {
  max-height: 80%;
  overflow-y: scroll;
}
.amount {
  width: 100px;
}
.red {
  color: red;
}
.totalarea {
  margin-top: 50px;
}
.detailbutton {
  cursor: pointer;
  color: rgb(0, 140, 255);
}
</style>
