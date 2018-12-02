#!/bin/bash

docker stop postgres_database postgres_admin
docker rm postgres_database postgres_admin

sudo rm -rf /data/postgres
sudo rm -rf /data/pgadmin

docker-compose up -d
