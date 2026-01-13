import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db';

// 定义 User 模型（对应 users 表）
class User extends Model {
  declare id: number;
  declare name: string;
  declare created_at: string;
}

// 初始化模型（映射数据库表结构）
User.init(
  {
    // 主键 ID
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // 用户名
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 20],
      },
    },
    // 创建时间
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // 关联 Sequelize 实例
    tableName: 'user', // 数据库表名（默认复数形式，可手动指定）
    timestamps: false, // 自动生成 createdAt/updatedAt 字段
    underscored: true, // 字段名蛇形命名（如 createdAt → created_at）
  },
);

export default User;
