# Day 63 — DNS and Route 53

## 1. What is DNS?

DNS stands for Domain Name System.

DNS resolves human-readable domain names
into the information needed to reach services.

Example:
app.example.com -> Application Load Balancer

## 2. Important DNS Records

A:
Maps a hostname to an IPv4 address.

AAAA:
Maps a hostname to an IPv6 address.

CNAME:
Maps a hostname to another hostname.

MX:
Specifies email servers.

TXT:
Stores text information for verification
and email authentication.

Route 53 Alias:
Can point a DNS name to supported AWS
resources such as an Application Load Balancer.

## 3. What is Amazon Route 53?

Amazon Route 53 is a managed DNS service.

It supports:

- Hosted zones
- DNS records
- Health checks
- Routing policies
- Domain registration

## 4. Planned Application Domain

Example domain:
app.example.com

Planned DNS record:

Name: app.example.com
Type: A
Alias: Yes
Target: Application Load Balancer

Note:
example.com is a placeholder domain.

## 5. Request Flow

1. User enters https://app.example.com
2. DNS resolver looks up the domain
3. DNS returns the ALB destination
4. Browser connects to the ALB over HTTPS
5. ALB forwards the request to the application
6. Application communicates with PostgreSQL

## 6. HTTPS and TLS

For HTTPS we plan to use:

- AWS Certificate Manager (ACM)
- A valid certificate for the application domain
- HTTPS listener on ALB port 443
- HTTP to HTTPS redirect if port 80 is enabled

DNS alone does not provide HTTPS encryption.

## 7. DNS TTL

TTL means Time To Live.

It controls how long DNS responses may be
cached by resolvers.

Lower TTL can help with planned DNS changes,
but does not guarantee instant propagation.

## 8. Route 53 Routing Policies

Simple:
Basic routing to a resource.

Weighted:
Distributes DNS responses by assigned weights.

Latency:
Routes according to AWS-measured latency.

Failover:
Uses health checks to support DNS failover.

## 9. Security Considerations

- Use HTTPS for public applications.
- Restrict access to DNS configuration.
- Protect domain registrar accounts with MFA.
- Monitor unexpected DNS changes.
- Avoid exposing internal database hostnames.

## 10. Current Status

Documentation only.

No domain or Route 53 hosted zone
has been created.

No DNS records have been deployed.
