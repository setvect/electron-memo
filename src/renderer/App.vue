<template>
  <div>
    <p class="title">Hello, World!</p>
    <button @click="incremnt()">증가</button>
    {{ count }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      count: 0 as number,
    };
  },
  methods: {
    incremnt() {
      this.count++;
    },
  },
});
</script>

<style scoped>
.title {
  font-size: 30px;
}
</style>
