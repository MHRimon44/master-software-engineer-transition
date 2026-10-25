# Day 66 — CloudFront and CDN Strategy

## 1. What is a CDN?

A Content Delivery Network caches and
delivers content from edge locations.

CloudFront is AWS's CDN service.

## 2. Good Candidates for Caching

- Product images
- Static JavaScript bundles
- CSS files
- Public fonts
- Public static documents
- Versioned media assets

## 3. Content That Needs Care

- User-specific API responses
- Authentication responses
- Private attachments
- Sensitive account information
- Rapidly changing personalized data

Do not publicly cache sensitive content.

## 4. Proposed Architecture

Client
|
v
CloudFront
|
v
Private S3 Bucket

CloudFront accesses private S3 objects
using Origin Access Control (OAC).

## 5. Cache Strategy

Versioned static assets:

- Can use longer cache lifetimes.

Frequently changing assets:

- Use shorter TTLs or versioned object keys.

Sensitive responses:

- Disable shared caching unless a safe,
  explicitly designed policy exists.

## 6. Security

- Enable S3 Block Public Access.
- Keep the S3 bucket private.
- Restrict origin access using OAC.
- Configure HTTPS for viewers.
- Validate access to private content.
- Avoid exposing confidential objects.

## 7. Cost Considerations

CloudFront may incur charges for:

- Data transfer
- Requests
- Optional additional features

S3 storage and requests may also incur charges.

Estimate costs before deployment.

## 8. Status

Conceptual CDN design only.

No CloudFront distribution created.
