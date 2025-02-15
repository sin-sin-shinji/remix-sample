# ベースイメージ
FROM node:22.13.0-bullseye-slim as base

# ビルドステージ
FROM base as build
RUN mkdir /app
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 本番用のファイル・依存関係の作成
FROM base as production-deps
RUN mkdir /app/
WORKDIR /app/
COPY --from=build /app/node_modules /app/node_modules
ADD package.json package-lock.json /app/
RUN npm prune --production

# 最終ステージ
FROM base
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
RUN mkdir /app
WORKDIR /app

# 各ステージから必要な情報を取得
ADD package.json package-lock.json /app/
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=production-deps /app/node_modules /app/node_modules

CMD ["npm", "start"]
EXPOSE $PORT
