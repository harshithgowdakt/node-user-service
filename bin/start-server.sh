#!/bin/bash
set -e
set -x

pm2 start pm2-app.json --only server