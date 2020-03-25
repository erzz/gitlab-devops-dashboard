#!/bin/bash
PATH="google-cloud-sdk/bin:${PATH}"

if [ -z $CI_COMMIT_TAG ]; then
  echo "Setting DEV SA as the active account"
  echo $DEV_GCP_DEPLOY_SA > "$CI_PROJECT_DIR/gcloud-service-key.json"
else
  echo "Setting PROD SA as the active account"
  echo $PROD_GCP_DEPLOY_SA > "$CI_PROJECT_DIR/gcloud-service-key.json"
fi

gcloud auth activate-service-account --key-file "$CI_PROJECT_DIR/gcloud-service-key.json"
