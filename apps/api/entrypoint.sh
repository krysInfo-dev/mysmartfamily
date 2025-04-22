#!/bin/sh
export BREVO_API_KEY=$(cat /run/secrets/brevo_api_key)
export DB_HOST=mysql
export DB_PORT=3306
export DB_NAME=mysmartfamily
export DB_USER=root
export DB_PASSWORD=$(cat /run/secrets/mysql_root_password)
export FILE_STORAGE_URL=http://dufs:5000

node dist/main.js
