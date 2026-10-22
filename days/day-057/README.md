# Day 57 — Container Mental Model

**Roadmap source:** Session 057, page 69. No Dockerfile today.

## Requirements
Docker Desktop installed and running; Node/tsx for DSA.

## Commands (from repository root)
```bash
docker --version
docker info
bash days/day-057/docker/lifecycle.sh
npx --yes tsx days/day-057/dsa/day57-topological-sort.ts
```

## Manual commands
```bash
docker run --name day57-demo -d alpine:3.20 sleep 600
docker image ls
docker ps
docker ps -a
docker inspect day57-demo
docker exec day57-demo sh -c 'echo hello > /tmp/note.txt'
docker stop day57-demo
docker start day57-demo
docker exec day57-demo cat /tmp/note.txt
docker rm -f day57-demo
```

## Definition of done
- [ ] Explain image vs container without notes
- [ ] Explain ephemeral writable layer and stop/start distinction
- [ ] Inspect image list and running/stopped containers
- [ ] Compare containers vs VMs in notes
- [ ] Solve one topological sort problem and redo a previous one
- [ ] Commit and push

`git add days/day-057/ && git commit -m "docs(docker): capture container mental model"`
