---
# You can also start simply with 'default'
theme: bricks
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Prisma ORM
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
background: rgba(255,255,255,1)
selectable: true
lineNumbers: true
---

<div class="text-center">

# Prisma ORM

## 全栈最后一公里（前端版）

</div>

---
layout: center
---

# 概念

<div class="text-[30px] text-left">
Prisma 是一个开源的，<span v-mark.box.red="1">下一代的</span> Node.js  和 TypeScript ORM（对象关系映射）工具，用于简化数据库访问和管理。它通过抽象底层 SQL，提供<span v-mark.box.red="1">直观的类型安全 API</span>， <span v-mark.box.red="1">让开发者更高效</span>地操作数据库，支持 PostgreSQL、MySQL、SQLite、MongoDB（实验性）等多种数据库。
</div>

---
layout: two-cols
---

# 下一代

- 怎么了就下一代了？

<v-click at="2">

- <span v-mark.highlight.yellow="1">Prisma ORM 的主要目标是提高应用开发者在使用数据库时的工作效率,再次考虑生产力和控制之间的权衡。</span>
</v-click>

::right::
<v-click at="1">

# Vite


<img src="./images/8.png" />
</v-click>

---

# 趋势图

<img class="w-[100%] block" src="https://prisma.nodejs.cn/assets/images/prisma-makes-devs-productive-b18ac4ab360d4e3d2b48cfe1b4218b99.png" />


---
layout: two-cols
---

<div class="w-[100%] h-[100%] flex justify-center items-center ml-[50px]">
  <svg class="scale-300" width="180" height="56" viewBox="0 0 180 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.209637 19.0073C-0.0659575 18.5726 -0.070121 18.0189 0.198904 17.58L10.3282 1.05707C10.8916 0.138071 12.252 0.218426 12.7033 1.19735L21.9569 21.2706C22.3002 22.0154 21.905 22.8917 21.1194 23.1274L6.72474 27.4458C6.14558 27.6195 5.52155 27.3867 5.19781 26.876L0.209637 19.0073ZM11.4969 5.88824C11.5945 5.40217 12.2605 5.33208 12.4572 5.78717L18.8402 20.5571C18.9603 20.8352 18.8108 21.1559 18.5205 21.2425L8.57492 24.2114C8.20935 24.3205 7.85916 24.0011 7.93428 23.627L11.4969 5.88824ZM48.4948 21.1371H51.3226V10.772H48.4948V21.1371ZM48.3744 8.09277C48.3744 7.17221 48.8878 6.7116 49.9137 6.7116C50.9394 6.7116 51.4527 7.17221 51.4527 8.09277C51.4527 8.53176 51.3244 8.87321 51.068 9.11743C50.8114 9.36165 50.4267 9.48343 49.9137 9.48343C48.8878 9.48343 48.3744 9.01987 48.3744 8.09277ZM87.1709 16.335L86.0768 16.372C85.2548 16.3969 84.6429 16.5455 84.2412 16.8172C83.8392 17.0893 83.6386 17.5031 83.6386 18.0596C83.6386 18.8567 84.0959 19.2555 85.0106 19.2555C85.6656 19.2555 86.1897 19.0672 86.5819 18.6898C86.9744 18.313 87.1709 17.8124 87.1709 17.1878V16.335ZM88.0053 21.1375L87.4583 19.7282H87.384C86.908 20.3279 86.4182 20.7437 85.9144 20.9755C85.4109 21.2072 84.7542 21.3228 83.9446 21.3228C82.9491 21.3228 82.1661 21.0386 81.5941 20.47C81.0226 19.9017 80.7368 19.0918 80.7368 18.0409C80.7368 16.941 81.1214 16.1298 81.8907 15.6073C82.6607 15.0851 83.8209 14.7961 85.3723 14.7404L87.1709 14.6848V14.2304C87.1709 13.1799 86.633 12.6544 85.5576 12.6544C84.7293 12.6544 83.7558 12.9045 82.6371 13.4054L81.7009 11.4955C82.8938 10.8716 84.2167 10.559 85.6689 10.559C87.0596 10.559 88.1258 10.8621 88.8676 11.4677C89.6091 12.0734 89.98 12.9946 89.98 14.2304V21.1375H88.0053ZM72.4802 21.1375H69.6524V15.0834C69.6524 14.3357 69.527 13.775 69.2772 13.4008C69.0265 13.0269 68.6326 12.8397 68.0948 12.8397C67.3719 12.8397 66.8465 13.1058 66.5188 13.6371C66.1911 14.1688 66.0275 15.0435 66.0275 16.261V21.1375H63.1996V10.7723H65.3599L65.74 12.0982H65.8978C66.1757 11.6225 66.5778 11.25 67.1029 10.9812C67.6283 10.7121 68.231 10.5776 68.9109 10.5776C70.4623 10.5776 71.5128 11.0846 72.0631 12.0982H72.3132C72.5915 11.616 73.001 11.2421 73.5419 10.9763C74.0827 10.7105 74.6929 10.5776 75.3728 10.5776C76.5471 10.5776 77.4359 10.8791 78.0382 11.4817C78.6409 12.0844 78.9421 13.0502 78.9421 14.3786V21.1375H76.1051V15.0834C76.1051 14.3357 75.9798 13.775 75.73 13.4008C75.4792 13.0269 75.0854 12.8397 74.5475 12.8397C73.8555 12.8397 73.3379 13.0872 72.9945 13.5815C72.6517 14.0761 72.4802 14.8608 72.4802 15.9362V21.1375ZM60.17 20.4885C60.9088 19.9323 61.2781 19.1227 61.2781 18.0594C61.2781 17.5468 61.1887 17.1045 61.0093 16.7336C60.8299 16.3627 60.5517 16.0353 60.1749 15.7508C59.7981 15.4667 59.2046 15.1609 58.3946 14.8332C57.4862 14.4685 56.8976 14.1932 56.6285 14.0079C56.3601 13.8226 56.2252 13.6033 56.2252 13.3496C56.2252 12.8985 56.6426 12.6729 57.477 12.6729C57.9465 12.6729 58.4071 12.7443 58.8582 12.886C59.3093 13.0284 59.7948 13.2104 60.314 13.4331L61.1668 11.3936C59.9863 10.8498 58.7718 10.5778 57.5232 10.5778C56.2127 10.5778 55.2009 10.8295 54.4872 11.3333C53.7729 11.8371 53.416 12.5495 53.416 13.4701C53.416 14.0079 53.5012 14.461 53.6714 14.8286C53.841 15.1963 54.113 15.5223 54.4872 15.8065C54.8607 16.091 55.4467 16.4 56.2438 16.7336C56.8 16.9686 57.2453 17.1742 57.5788 17.3503C57.9128 17.5265 58.1475 17.6843 58.2837 17.8231C58.4195 17.9622 58.4876 18.1429 58.4876 18.3655C58.4876 18.9587 57.9743 19.2553 56.9483 19.2553C56.4478 19.2553 55.8684 19.1718 55.2103 19.0052C54.5517 18.8382 53.9601 18.6313 53.4347 18.3838V20.7203C53.8983 20.918 54.3959 21.0679 54.9275 21.1701C55.4591 21.2719 56.1014 21.3229 56.8557 21.3229C58.3266 21.3229 59.4314 21.0447 60.17 20.4885ZM46.9948 10.661C46.7414 10.6054 46.4232 10.5776 46.0398 10.5776C45.3969 10.5776 44.8021 10.7553 44.2554 11.1108C43.708 11.4664 43.2739 11.9345 42.9524 12.5152H42.8136L42.3962 10.7723H40.2546V21.1375H43.0824V15.8622C43.0824 15.0278 43.3341 14.3786 43.8376 13.9151C44.3418 13.4515 45.0446 13.2197 45.9472 13.2197C46.2749 13.2197 46.5528 13.2508 46.7817 13.3124L46.9948 10.661ZM31.9317 13.9614H32.8774C33.7613 13.9614 34.4223 13.7869 34.8613 13.4376C35.3003 13.0886 35.5196 12.5799 35.5196 11.9124C35.5196 11.239 35.3356 10.7414 34.968 10.4199C34.6 10.0984 34.0239 9.93766 33.2388 9.93766H31.9317V13.9614ZM38.4214 11.8106C38.4214 13.2694 37.9657 14.385 37.0537 15.1573C36.1423 15.9302 34.8459 16.3162 33.1649 16.3162H31.9317V21.1373H29.0577V7.58296H33.3872C35.0315 7.58296 36.2814 7.93684 37.1375 8.64461C37.9936 9.35238 38.4214 10.4079 38.4214 11.8106Z" fill="#000000" />
  </svg>
</div>

::right::

# 优势

<br />
<br />

## 1、适用于大多数的数据库和框架

<br />

## 2、直观的数据模型

<br />

## 3、类型安全的数据库客户端

<br />

## 4、类型安全的原始 SQL

<br />

## 5、Prisma Studio

---
layout: two-cols
---

<div class="w-[100%] h-[100%] flex justify-center items-center ml-[-50px]">
  <img src="./images/2.png"  />
</div>

::right::

# 用于大多数的数据库和框架

<br />
<br />
<br />
<br />

## Prisma ORM 与流行工具的兼容性确保了没有技术栈的锁定，更低的集成成本和平稳的过渡。所以你可以<span v-mark.underline.red="1">不受限制地灵活发展</span>。


---

# 框架

<div class="w-[100%] h-[100%] flex justify-center items-center ">
  <img src="./images/3.png"/>
</div>

---

# 数据库

<div class="w-[100%] h-[100%] flex justify-center items-center ">
  <img src="./images/4.png" />
</div>

---
layout: two-cols
---

<div class="w-[100%] h-[100%] flex justify-center items-center ml-[-20px]">
  <img src="https://cdn.sanity.io/images/p2zxqf70/production/4bb48b7558feb21ca5e957ae4322c76b9df701cc-456x424.svg" />
</div>

::right::

# 直观的数据模型


<br />
<br />

<div class="text-[30px]">
Prisma 使用一种名为 <span v-mark.underline.red="1"> Prisma Schema </span>的专用语言来描述数据模型，这种模型不仅是数据库结构的抽象，还能自动生成类型安全的数据库访问 API
</div>

---

# 数据模型的组成部分

<img src="./images/9.png" />

---

# 如何定义数据模型

1. 手动定义

```bash
prisma migrate dev --name xxx
```

2. 自动同步

```bash
prisma db pull
```

 
---
layout: two-cols
---

<div class="w-[90%] h-[100%] flex justify-center items-center">
  <img src="https://cdn.sanity.io/images/p2zxqf70/production/44f948eca766c02c2b2db812f7fe78d1be2c8b5a-556x370.svg" />
</div>

::right::

# 类型安全的数据库客户端

<br />
<br />

<div class="text-[30px]">
<span v-mark.underline.red="1">Prisma Client</span> 是一个为您的模式<span v-mark.underline.red="1">量身定制的查询构建器</span>。我们将它的 API 设计得非常直观，既适合 SQL 老手，也适合数据库新手。自动完成功能可以帮助您在不需要文档的情况下找出查询
</div>

---

# 生成流程

<img src="https://www.prisma.io/docs/assets/images/prisma-client-generation-workflow-3b42c24d27aef3025f2eb4ffc4644642.png" />

---
layout: two-cols
---

<div class="w-[90%] h-[100%] flex justify-center items-center">
  <img src="https://cdn.sanity.io/images/p2zxqf70/production/7c971d9d08805251715b0ba49a8ca7ff59f181a6-514x256.svg" />
</div>

::right::

# 类型安全的原始 SQL

<br />
<br />

<div class="text-[30px]">
TypedSQL 是 Prisma ORM 的一个新特性，它允许您在 .sql 文件中编写查询，同时仍然享受 Prisma Client 的出色开发体验。
</div>

---

# 编译时类型检查

<img src="./images/10.png" class="h-[100%]" />

---

# 生成prisma client

```bash
prisma generate --sql
```

---
layout: two-cols
---

<div class="w-[90%] h-[100%] flex justify-center items-center">
  <img src="https://cdn.sanity.io/images/p2zxqf70/production/60e52dab36faf74231ad30690380497c23ce1c98-507x243.svg" />
</div>

::right::

# 可视化数据库浏览器

<br />
<br />

<div class="text-[30px]">
Prisma Studio 是在你的 Prisma 项目中探索和操作数据的最简单的方法。通过浏览表、过滤、分页、遍历关系和安全地编辑数据来了解您的数据。
</div>

---

# web版数据库管理系统

```bash
npx prisma studio
```

<img src="https://www.prisma.io/docs/assets/images/02-open-model-542f0b9c9aba1a85069cd946b216fc9b.png" class="h-[100%]" />

---

# celljs集成prisma orm

<div class="w-[90%] h-[100%] flex justify-center  ml-[20%] text-[30px] flex-col">

<v-click>
1. 安装 prisma orm 的项目依赖  
</v-click>

<v-click>
2. 初始化 prisma orm 配置 
</v-click>


<v-click>
3. 定义数据模型 
</v-click>


<v-click>
4. 创建数据库迁移  
</v-click>

<v-click>
5. 生成 Prisma Client 
</v-click>

</div>

---

# 安装 prisma orm 的项目依赖


<div class="w-[100%] h-[100%] flex     text-[30px] flex-col">

<v-click>
prisma: <span v-mark.highlight.yellow="1">Prisma 命令行界面（CLI）是从命令行与 Prisma 项目交互的主要方式。</span>
</v-click>

<v-click>
@prisma/client： <span v-mark.highlight.yellow="2"> Prisma Client 是一个自动生成的、类型安全的查询生成器，专为当前的数据库定制。</span>
</v-click>


</div>

---

# 初始化 prisma orm 配置 


<div class="w-[100%] h-[100%] flex   text-[30px] flex-col mt-[50px]">

```bash
npx prisma init --datasource-provider mysql
```

</div>

---

# 初始化 prisma orm 配置

<img class="h-[80%]" src="./images/5.png" />


---

# .env文件的配置

1. <div class="text-[20px] text-nowrap mt-[50px]" v-mark.highlight.yellow="0">mysql://USER:PASSWORD@HOST:PORT/DATABASE?KEY1=VALUE&KEY2=VALUE&KEY3=VALUE</div>

2. schema.prisma
```prisma {1,2,3,4}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

#  定义数据模型  

<div class="w-[100%] h-[100%] flex     text-[30px] flex-col">

```prisma {10,11,12,13,14,15,16,17,18,19,20,21}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

</div>

---

# 创建数据库迁移 

```bash
npx prisma migrate dev --name init
```

---

# 创建数据库迁移(初始化)


```sql
-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(191) NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


```

---

# 创建数据库迁移(表新增字段)

```sql
-- AlterTable
ALTER TABLE `city` ADD COLUMN `JobRole` CHAR(20) NOT NULL DEFAULT '';

```

---

# 生成 Prisma Client 

```bash
npx prisma generate
```

---

# 生成 Prisma Client 

<img class="h-[80%] w-[100%]" src="./images/7.png" />

---

# 数据库编程

```ts  
import { PrismaClient } from '@/generated/prisma';
import { a } from '@/generated/prisma/sql';

const prisma = new PrismaClient();

@Controller('mysql')
export class MySqlController {
  @Post('allUsers')
  async getAllUsers() {
      const allUsers = await prisma.city.findMany({
        include: { country: true },
      });
      await prisma.$disconnect();
      return allUsers;
  }

  @Post('list')
  async getList() {
    const usersWithPostCounts = await prisma.$queryRawTyped(a());
    console.log(usersWithPostCounts);
  }
}

```

---

# 类型安全

<img class="h-[100%]" src="./images/12.png" />

---

# 注意点

<div class="w-[90%] h-[100%] flex justify-center  ml-[20%] text-[30px] flex-col">

<v-click>

- `.env`文件需要在每个环境下各存一份
  - 多个 .env 文件
  - 在 schema.prisma 中使用条件逻辑
  - 在 docker-compose.yml 中注入环境变量：
  - 在部署时通过命令行或 CI/CD 工具覆盖 .env 中的值
  

</v-click>

<v-click>

- `npx prisma migrate dev`命令的危险性

</v-click>

<v-click>

- `prisma schema`中`model`太大，可以使用`Multi-file Prisma schema`

</v-click>

</div>



---
layout: center
---

[Presentation Slides for Developers](https://sli.dev)