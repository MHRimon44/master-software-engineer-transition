#!/usr/bin/env bash
set -euo pipefail
name=day57-demo
trap 'docker rm -f "$name" >/dev/null 2>&1 || true' EXIT
docker rm -f "$name" >/dev/null 2>&1 || true
printf '\n1. Start container\n'
docker run --name "$name" -d alpine:3.20 sleep 600
printf '\n2. Compare image and container\n'
docker image ls alpine
docker ps --filter "name=$name"
printf '\n3. Write ephemeral file\n'
docker exec "$name" sh -c 'echo day57 > /tmp/note.txt'
docker exec "$name" cat /tmp/note.txt
printf '\n4. Stop and start same container: file remains\n'
docker stop "$name" >/dev/null
docker start "$name" >/dev/null
docker exec "$name" cat /tmp/note.txt
printf '\n5. Remove and recreate: file disappears\n'
docker rm -f "$name" >/dev/null
docker run --name "$name" -d alpine:3.20 sleep 600 >/dev/null
if docker exec "$name" test -f /tmp/note.txt; then echo 'Unexpected: file exists'; exit 1; else echo 'PASS: new container has no old note'; fi
