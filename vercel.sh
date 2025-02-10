#!/bin/bash

if [[ $VERCEL_ENV == "production" ]] ; then
  echo "Running production build..."
  npm run build:production
else
  echo "Running staging build..."
  npm run build:staging
fi 