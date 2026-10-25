# Day 65 — Amazon S3 Storage Design

## Objective

Store application images and attachments
using Amazon S3.

## 1. Use Cases

- Product images
- User-uploaded attachments
- Generated PDF documents
- Application media files

## 2. Example Object Keys

products/123/main.webp
products/123/gallery/image-01.webp
attachments/456/document.pdf

S3 stores objects using bucket names and keys.

## 3. Upload Architecture

Client
|
v
NestJS API
|
v
Authorization and validation
|
v
Generate short-lived presigned upload URL
|
v
Client uploads directly to S3
|
v
API verifies upload and saves metadata

## 4. Database Metadata

PostgreSQL can store:

- Object key
- File owner
- MIME type
- File size
- Upload status
- Created timestamp

Actual file bytes remain in S3.

## 5. Security

- [ ] Enable Block Public Access
- [ ] Use least-privilege IAM policies
- [ ] Use short-lived presigned URLs
- [ ] Validate allowed file types
- [ ] Enforce maximum file size
- [ ] Generate safe object keys
- [ ] Enable appropriate encryption
- [ ] Avoid storing AWS credentials in code
- [ ] Configure CORS only for approved origins

Do not trust the client-provided filename
or MIME type alone.

## 6. Lifecycle and Versioning

Consider:

- S3 Versioning for recovery requirements
- Lifecycle rules for unused objects
- Retention policies for important files
- Cleanup of abandoned uploads

Versioning can increase storage costs.

## 7. S3 vs PostgreSQL

PostgreSQL:
Structured data, transactions and relations.

S3:
Images, PDFs and other binary objects.

S3 is not a relational database.

## 8. Status

Conceptual architecture only.

No S3 bucket has been created.
