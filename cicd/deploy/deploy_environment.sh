#!/bin/sh
# Image to deploy
. "$CI_PROJECT_DIR/cicd/shared-scripts/image_name.sh"

if [ -z $CI_COMMIT_TAG ]; then
  echo "Deploying to DEV"
  PROJECT_NAME="ikea-retail-pim-dev"
else
  echo "Deploying to PROD"
  PROJECT_NAME="ikea-retail-pim-prod"
fi

echo "DEPLOYING $IMAGE"
gcloud beta run deploy devops-dashboard \
  --platform managed \
  --region europe-north1 \
  --project "$PROJECT_NAME" \
  --image "$IMAGE" \
  --allow-unauthenticated