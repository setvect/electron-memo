import { Sequelize, Model, DataTypes } from "sequelize";
import fs from "fs";


interface MemoType {
  memoSeq: number;
  content: string;
  regDate: Date;
}

export class MemoEntity extends Model<MemoType> {
  public memoSeq!: number;
  public content!: string;
  public regDate!: Date;
}

export default class MemoRepository {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "db/electron-memo.db",
    });
  }

  init(): void {
    MemoRepository.makeDirectory("db");
    MemoEntity.init(
      {
        memoSeq: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        content: {
          type: new DataTypes.STRING(1000),
        },
        regDate: {
          type: DataTypes.DATE,
        },
      }, {
        sequelize: this.sequelize,
        tableName: "MEMO",
        underscored: true,
        timestamps: false,
      }
    );
    MemoEntity.sync();
  }

  public static async listMemo(): Promise<Array<MemoType>> {
    const result = await MemoEntity.findAll({
      order: [["memoSeq", "DESC"]],
      // raw: true, // raw: true로 설정하면 Date 타입의 값이 값이 문자열 변함
    });
    // Date 타입을 유지하기 위해 사용
    const rtnValue = result.map((record: MemoEntity) => record.get({
      plain: true,
    }));
    return rtnValue;
  }

  public static async create(memo: MemoType): Promise<void> {
    await MemoEntity.create(memo);
  }

  public static async deleteMemo(memoSeq: number): Promise<void> {
    MemoEntity.destroy({
      where: {
        memoSeq,
      },
    });

  }

  private static makeDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

}

