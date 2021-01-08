<template>
  <MemoList />
</template>

<script lang="ts">
import Vue from "vue";
import MemoList from "./components/MemoList.vue";

export default Vue.extend({
  name: "App",
  components:{
    MemoList,
  },
});
</script>
