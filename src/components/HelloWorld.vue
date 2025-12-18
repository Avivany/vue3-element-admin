<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/store'
const counterStore = useCounterStore()

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code>
      to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>
    , the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">
      Vue Docs Scaling up Guide
    </a>
    .
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <div>
    <el-button type="success">
      <i-ep-SuccessFilled />
      Success
    </el-button>
    <el-button type="info">
      <i-ep-InfoFilled />
      Info
    </el-button>
    <el-button type="warning">
      <i-ep-WarningFilled />
      Warning
    </el-button>
    <el-button type="danger">
      <i-ep-WarnTriangleFilled />
      Danger
    </el-button>
    <el-button type="danger">
      <svg-icon icon-class="dev" />
      Danger
    </el-button>
    <el-button type="danger">
      <i-tabler-align-box-center-middle-filled />
      Danger
    </el-button>
    <span>{{ counterStore.double }}</span>
    <i class="i-tabler-align-box-top-center"></i>
    <i class="i-tabler:air-traffic-control"></i>
    <i class="i-ep:failed"></i>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
