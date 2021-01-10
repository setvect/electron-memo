<template>
  <b-container class="warp">
    <b-row>
      <b-table hover :bordered="true" :fields="fields" :items="items">
        <template #cell(no)="data">
          {{ data.item.memoSeq }}
        </template>
        <template #cell(메모)="data">
          {{ data.item.content }}
        </template>
        <template #cell(등록일)="data">
          {{ data.item.regDate.toISOString() }}
        </template>
        <template #cell(삭제)="data">
          <b-link @click="deleteItem(data.item.memoSeq)">삭제</b-link>
        </template>
      </b-table>
    </b-row>
    <b-row>
      <b-form inline @submit="addMemo">
        <b-form-input
          v-model="content"
          type="text"
          placeholder="메모 내용"
          class="mb-2 mr-sm-2 mb-sm-0"
          required
        />
        <b-button type="submit">등록</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ipcRenderer } from "electron";

interface IMemo {
  memoSeq: number;
  content: string;
  regDate: Date;
}

@Component
export default class MemoList extends Vue {
  private count = 0;
  private fields = ["no", "메모", "등록일", "삭제"];
  private items: Array<IMemo> = [];
  private content = "";
  mounted(): void {
    this.loadList();
  }

  private loadList() {
    ipcRenderer.invoke("listMemo").then((result) => {
      this.items = result;
    });
  }

  private addMemo(event: Event): void {
    event.preventDefault();
    ipcRenderer
      .invoke("addMemo", { content: this.content, regDate: new Date(), })
      .then(() => {
        this.content = "";
        this.loadList();
      });
  }

  private deleteItem(memoSeq: number): void {
    ipcRenderer
      .invoke("deleteMemo", memoSeq)
      .then(() => {
        this.content = "";
        this.loadList();
      });
  }
}
</script>

<style scoped>
.warp {
  margin-top: 50px;
}
</style>