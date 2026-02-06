#!/bin/bash
set -e

# ==================================================
# CONFIG
# ==================================================
UI_IMAGE=bridg-money-website
NGINX_IMAGE=nginx:latest
COMPOSE_FILE=bm/docker-compose.yml
SERVICE=nginx

export ENV=${1:-prod}  # dev | beta | prod

# if [[ "$ENV" != "dev" && "$ENV" != "beta" && "$ENV" != "prod" ]]; then
#   echo "❌ Invalid ENV: $ENV (use dev | beta | prod)"
#   exit 1
# fi

# ==================================================
# ENV SPECIFIC CONFIG
# ==================================================
# if [[ "$ENV" == "dev" ]]; then
#   BUILD_CMD="build-dev"
#   SERVER="ubuntu@13.126.xxx.xxx"
#   KEY=~/Desktop/Bridg.Money/aws/Keys/BMDev_SK.pem

# elif [[ "$ENV" == "beta" ]]; then
  # BUILD_CMD="build"
  # SERVER="ubuntu@13.127.39.226"
  # KEY=~/Desktop/Bridg.Money/aws/mu-fe-vm1.pem

# else
  BUILD_CMD="build"
  SERVER="ubuntu@13.233.132.137"
  KEY=~/Desktop/Bridg.Money/aws/Keys/BMProd_SK.pem
# fi

REMOTE_DIR=/home/ubuntu
ARCHIVE=${UI_IMAGE}.tar.gz

echo "=============================================="
echo "🚀 Deploying BM Site UI ($ENV)"
echo "🖥️ Server     : $SERVER"
echo "=============================================="

# ==================================================
# BUILD BM Site UI
# ==================================================
echo "🧱 Building BM Site UI..."
npm ci
npm run "$BUILD_CMD"

# ==================================================
# BUILD ARTIFACT IMAGE
# ==================================================
echo "🐳 Building Docker image..."
docker build \
  --build-arg ENV="$ENV" \
  -f deploy/local.Dockerfile \
  -t "$UI_IMAGE" .

# ==================================================
# SAVE IMAGE
# ==================================================
echo "📦 Saving Docker image..."
docker save "$UI_IMAGE" | gzip > "$ARCHIVE"

# ==================================================
# COPY TO EC2
# ==================================================
echo "🚚 Copying image to EC2..."
scp -i "$KEY" "$ARCHIVE" "$SERVER:$REMOTE_DIR/"

# ==================================================
# DEPLOY ON EC2
# ==================================================
echo "🔄 Deploying on EC2..."
ssh -i "$KEY" "$SERVER" << EOF
  set -e
  cd $REMOTE_DIR

  echo "📥 Loading Docker image..."
  sudo docker load < $ARCHIVE

  echo "♻️ Restarting nginx service..."
  sudo docker compose -f $COMPOSE_FILE up -d --force-recreate $SERVICE

  echo "🧹 Cleaning up..."
 
EOF
#  rm -f $ARCHIVE
# ==================================================
# CLEAN LOCAL
# ==================================================
rm -f "$ARCHIVE"

echo "✅ Bridg.Money Website ($ENV) deployed successfully"
