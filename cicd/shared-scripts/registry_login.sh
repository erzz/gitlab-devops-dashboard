#!/bin/sh
REGISTRY="https://eu.gcr.io"
echo "REGISTRY - $REGISTRY"

if [ -n "$CI_COMMIT_TAG" ]; then
  echo "Logging to Google Container Registry with CI PROD credentials..."
  docker login -u _json_key -p "$GOOGLE_RPIM_PROD_GCR_KEY" https://eu.gcr.io
else
  echo "Logging to Google Container Registry with DEV credentials..."
  docker login -u _json_key -p "$GOOGLE_RPIM_DEV_GCR_KEY" https://eu.gcr.io
fi
