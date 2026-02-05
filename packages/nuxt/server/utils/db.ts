import { Sequelize } from 'sequelize';

const env = import.meta.env;

// 创建 Sequelize 实例（单例模式）
const sequelize = new Sequelize(
  'postgresql://postgres.kocfmjimypnpamnuzcyg:srRwFM3DRTabnk0P@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
);

// 验证数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Sequelize 数据库连接成功');
  } catch (error) {
    console.error('❌ Sequelize 数据库连接失败：', (error as Error).message);
  }
};

testConnection();

// 导出 Sequelize 实例（供模型和 API 使用）
export default sequelize;
