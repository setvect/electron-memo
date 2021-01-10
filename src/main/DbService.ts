import { Sequelize, Model, DataTypes } from "sequelize";
import fs from "fs";

class MemoEntity extends Model {
  public memoSeq!: number;
  public content!: string;
  public regDate!: Date;
}

export default class DbService {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "db/electron-memo.db",
    });
  }

  init(): void {
    DbService.makeDirectory("db");
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

  private static makeDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
}

