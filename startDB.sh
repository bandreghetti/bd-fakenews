#!/bin/bash

docker stop postgres_database postgres_admin db-api
docker rm postgres_database postgres_admin db-api

sudo rm -rf /data/postgres
sudo rm -rf /data/pgadmin

docker-compose up -d
