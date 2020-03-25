#!/bin/sh

# Image built on the result of cicd/shared-scripts/image_name.sh
source cicd/shared-scripts/image_name.sh

echo "Building image: $IMAGE"

docker build --rm --no-cache \
  --tag "$IMAGE" .

docker push "$IMAGE"
