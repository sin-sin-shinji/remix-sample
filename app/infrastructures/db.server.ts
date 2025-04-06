import { PrismaClient } from '@prisma/client';

// TypeScript でグローバル変数を利用するための宣言
declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // 開発環境ではホットリロード時の多重生成を防ぐためにグローバル変数を使用
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  prisma = global.__db;
}

export { prisma };
