<template>
  <div>{{ msg }}</div>
  <div>
    <div>姓名：{{ userinfo.name }}</div>
    <div>年龄：{{ userinfo.age }}</div>
    <button type="button" @click="begin">开始考试</button>
  </div>
  <div v-if="exams.length > 0">
    <h2>题目</h2>
    <div v-for="(item, index) in exams" :key="item.title">
      <div>题目（{{ index + 1 }}）：{{ item.title }}</div>
      <div></div>
    </div>
  </div>
</template>

<script setup>

import { useUserInfo, useExam } from './hook'

const [userinfo] = useUserInfo();
const [exams, begin] = useExam();

</script>

<style scoped></style>
