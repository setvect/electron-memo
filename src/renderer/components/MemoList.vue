<template>
  <div>
    <p class="title">Hello, World!</p>
    <button @click="incremnt()">증가</button>
    {{ count }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class MemoList extends Vue {
  private count = 0;

  public incremnt(): void {
    this.count++;
  }
}
</script>

<style scoped>
.title {
  font-size: 30px;
}
</style>
