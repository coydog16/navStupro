#!/bin/bash
# 作業ディレクトリへ移動
cd "$(dirname "$0")"
echo "現在の作業ディレクトリ: $(pwd)"

# ターミナルの作業ディレクトリも同じ場所に移動（VSCode統合ターミナル用）
if [ -n "$VSCODE_GIT_IPC_HANDLE" ] && command -v code >/dev/null 2>&1; then
  code -r --reuse-window "$(pwd)"
fi

# LINUX版Docker Desktopがインストールされていない場合はインストール
if ! command -v docker &> /dev/null; then
  echo "Dockerがインストールされていません。インストールを開始します..."
  if [ -f /etc/debian_version ]; then
    # Debian/Ubuntu系
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg lsb-release
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    echo "Dockerのインストールが完了しました。"
  else
    echo "このLinuxディストリビューション用の自動インストールスクリプトは未対応です。公式ドキュメントを参照してください。"
    exit 1
  fi
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
echo "webApp用コンテナでnpm install & npm run devを自動実行します..."
WEBAPP_CONTAINER=$(docker ps --filter "name=web" --format "{{.Names}}" | head -n1)
if [ -n "$WEBAPP_CONTAINER" ]; then
  docker exec -it "$WEBAPP_CONTAINER" bash -c "cd /var/www && npm install && npm run dev"
else
  echo "webApp用のコンテナが見つかりませんでした。"
fi

echo "すべての自動起動が完了しました。"
