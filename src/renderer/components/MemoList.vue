<template>
  <b-container class="warp">
    <b-row>
      <b-table hover :bordered="true" :fields="fields" :items="items">
        <template #cell(no)="data">
          {{ data.item.no }}
        </template>
        <template #cell(메모)="data">
          {{ data.item.memo }}
        </template>
        <template #cell(등록일)="data">
          {{ data.item.regDate.toISOString() }}
        </template>
        <template #cell(삭제)="data">
          <b-link @click="deleteItem(data.item.no)">삭제</b-link>
        </template>
      </b-table>
    </b-row>
    <b-row>
      <b-form inline @submit="addMemo">
        <b-form-input
          v-model="memo"
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

interface IMemo {
  no: number;
  memo: string;
  regDate: Date;
}

@Component
export default class MemoList extends Vue {
  private count = 0;
  private fields = ["no", "메모", "등록일", "삭제"];
  private items: Array<IMemo> = [
    { no: 2, memo: "피아노 연습하기", regDate: new Date(), },
    { no: 1, memo: "설겆이 하기", regDate: new Date(), }
  ];
  private memo = "";

  public deleteItem(no: number): void {
    const val = this.items.find((item) => item.no == no);
    if (val == null) {
      return;
    }
    const index = this.items.indexOf(val);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  public addMemo(event: Event): void {
    event.preventDefault();
    let nextNo;
    if (this.items.length == 0) {
      nextNo = 1;
    } else {
      nextNo =
        this.items
          .map((item) => item.no)
          .reduce((previous, current) =>
            previous > current ? previous : current
          ) + 1;
    }

    this.items.splice(0, 0, {
      no: nextNo,
      memo: this.memo,
      regDate: new Date(),
    });
    this.memo = "";
  }
}
</script>

<style scoped>
.warp {
  margin-top: 50px;
}
</style>