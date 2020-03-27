#!/bin/sh

# Image built on the result of cicd/shared-scripts/image_name.sh
source cicd/shared-scripts/image_name.sh

echo "Building image: $IMAGE"

echo "Adding GROUPID to .env file"
echo "GITLAB_GROUPID=5897639" >> temp_env
echo "Adding API key to .env file"
echo "GITLAB_API_KEY=$MR_TOKEN" >> temp_env

docker build --rm --no-cache \
  --tag "$IMAGE" .

docker push "$IMAGE"
