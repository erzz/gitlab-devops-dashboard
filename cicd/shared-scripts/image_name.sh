#!/bin/sh
echo "CI_COMMIT_REF_SLUG=$CI_COMMIT_REF_SLUG"
echo "CI_COMMIT_SHORT_SHA=$CI_COMMIT_SHORT_SHA"
echo "CI_COMMIT_TAG=$CI_COMMIT_TAG"

# Configure domain and tagging based on environment
if [ -z $CI_COMMIT_TAG ]; then
    IMAGE_NAME="eu.gcr.io/ikea-retail-pim-dev/devops-dashboard"
    IMAGE_TAG="$CI_COMMIT_REF_SLUG-$CI_COMMIT_SHORT_SHA"
else
    # Coming from a tag
    IMAGE_NAME="eu.gcr.io/ikea-retail-pim-prod/devops-dashboard"
    IMAGE_TAG="$CI_COMMIT_TAG"
fi

IMAGE="$IMAGE_NAME:$IMAGE_TAG"
echo "IMAGE: $IMAGE"