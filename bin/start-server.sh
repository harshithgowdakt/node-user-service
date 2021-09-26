#!/bin/bash
set -e
set -x

BASEDIR=$(dirname "$0")"/../"
cd "$BASEDIR"

pm2 start bin/pm2-app.json
