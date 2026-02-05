// server/api/users.get.ts
import User from '../models/User';

export default defineEventHandler(async () => {
  try {
    // 查询所有用户（按创建时间倒序）
    const users = await User.findAll();
    return {
      success: true,
      data: users,
      total: users.length,
    };
  } catch (error) {
    return {
      success: false,
      message: '查询用户失败',
      error: (error as Error).message,
    };
  }
});
