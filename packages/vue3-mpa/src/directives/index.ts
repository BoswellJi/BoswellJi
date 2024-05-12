import type { App } from 'vue';
import { dateFormatDirective } from './dateFormat';

/**
 * 导出指令方法：v-xxx
 * @methods authDirective 用户权限指令，用法：v-auth
 */
export default function directive(app: App) {
  // 日期格式化
  dateFormatDirective(app);
}
