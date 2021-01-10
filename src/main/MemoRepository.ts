import { Sequelize, Model, DataTypes } from "sequelize";
import fs from "fs";

export class MemoEntity extends Model {
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

  public static async listMemo() {
    const result = await MemoEntity.findAll({
      raw: true,
    });
    console.log("result :>> ", result);
    return result;
  }

  public static async create(memo: any): Promise<void> {
    await MemoEntity.create(memo);
  }

  public static async deleteMemo(memoSeq: number): Promise<void> {
    const item = await MemoEntity.findByPk(memoSeq);
    await item.destroy();
  }

  private static makeDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }

}

