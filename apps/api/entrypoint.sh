#!/bin/sh
export BREVO_API_KEY=$(cat /run/secrets/brevo_api_key)
export DB_HOST=mysql
export DB_PORT=3306
export DB_NAME: mysmartfamily
export DB_USER=mysmartfamily
export DB_PASSWORD=$(cat /run/secrets/mysql_user_password)
export FILE_STORAGE_URL=http://dufs:5000

node dist/main.js
