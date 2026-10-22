# Containers vs Virtual Machines

| Feature     | Container                              | Virtual machine          |
| ----------- | -------------------------------------- | ------------------------ |
| Kernel      | Shares host/VM kernel                  | Guest OS kernel          |
| Isolation   | Namespaces, cgroups, security controls | Hypervisor + guest OS    |
| Startup     | Often faster                           | Often slower             |
| Footprint   | Often smaller                          | Often larger             |
| Persistence | Writable layer removed with container  | Virtual disk may persist |

On macOS, Docker Desktop runs Linux containers inside a Linux VM.

## Notes

- An image is an immutable package/template; a container is an instance with a writable layer.
- Image layers can be cached and reused.
- A registry (e.g., Docker Hub) stores/distributes images.
- Volumes/bind mounts persist data beyond a container's writable layer.
- Namespaces isolate process views; cgroups manage resource usage.
