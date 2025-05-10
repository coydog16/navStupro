#!/bin/bash
# .envファイルがなければ作成し、UID/GIDを自動でセット
if [ ! -f .env ]; then
  echo "UID=$(id -u)" > .env
  echo "GID=$(id -g)" >> .env
  echo ".envファイルを作成しました。"
else
  echo ".envファイルは既に存在します。"
fi
cat .env
