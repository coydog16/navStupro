#!/bin/bash
# 作業ディレクトリへ移動
cd "$(dirname "$0")"
echo "現在の作業ディレクトリ: $(pwd)"

# ターミナルの作業ディレクトリも同じ場所に移動（VSCode統合ターミナル用）
if [ -n "$VSCODE_GIT_IPC_HANDLE" ] && command -v code >/dev/null 2>&1; then
  code -r --reuse-window "$(pwd)"
fi

# VSCodeの起動
if command -v code >/dev/null 2>&1; then
  echo "VSCodeを起動します..."
  code .
fi

# Dockerコンテナの起動
echo "Dockerコンテナを起動します..."
docker compose up -d

# webApp用コンテナ名を自動取得してnpm install & npm run devを実行
echo "webApp用コンテナでcomposer install, npm install & npm run devを自動実行します..."
WEBAPP_CONTAINER=$(docker ps --filter "name=web" --format "{{.Names}}" | head -n1)
if [ -n "$WEBAPP_CONTAINER" ]; then
  docker exec -it "$WEBAPP_CONTAINER" bash -c "cd /var/www && composer install"
  docker exec -it "$WEBAPP_CONTAINER" bash -c "cd /var/www && npm install && npm run dev"
else
  echo "webApp用のコンテナが見つかりませんでした。"
fi

echo "すべての自動起動が完了しました。"
