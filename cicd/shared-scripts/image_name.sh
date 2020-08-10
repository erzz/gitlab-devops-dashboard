#!/bin/sh

# Informational output for debug and historical reference
echo "CI_REGISTRY_IMAGE=$CI_REGISTRY_IMAGE"
echo "CI_COMMIT_REF_SLUG=$CI_COMMIT_REF_SLUG"
echo "CI_COMMIT_SHORT_SHA=$CI_COMMIT_SHORT_SHA"
echo "CI_COMMIT_TAG=$CI_COMMIT_TAG"

# Configure domain and tagging based on environment
if [ -z $CI_COMMIT_TAG ]; then
    # Coming from a push/merge
    if [ "$CI_COMMIT_REF_SLUG" == "master" ]; then
        IMAGE_TAG="$CI_COMMIT_REF_SLUG-$CI_COMMIT_SHORT_SHA"
    else
        IMAGE_TAG="$CI_COMMIT_REF_SLUG-$CI_COMMIT_SHORT_SHA"
    fi
else
    # Coming from a tag
    IMAGE_TAG="$CI_COMMIT_TAG"
fi

IMAGE="$CI_REGISTRY_IMAGE:$IMAGE_TAG"
echo "IMAGE: $IMAGE"
