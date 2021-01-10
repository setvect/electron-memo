# 테이블 설계

- MEMO: 메모장

| Column Name | Attribute Name | Key | Type    | Len  | Not Null | Description   |
| ----------- | -------------- | --- | ------- | ---- | -------- | ------------- |
| MEMO_SEQ    | 일련번호       | PK  | integer |      | Y        | AUTOINCREMENT |
| CONTENT     | 내용           |     | varchar | 1000 | Y        |
| REG_DATE    | 등록일         |     | date    |      | Y        |
