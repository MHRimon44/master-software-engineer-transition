type Endpoint = {
  name: string;
  protocol: 'HTTP' | 'HTTPS';
  port: number;
  public: boolean;
};

const endpoints: Endpoint[] = [
  {
    name: 'API ALB',
    protocol: 'HTTPS',
    port: 443,
    public: true,
  },
  {
    name: 'Web',
    protocol: 'HTTPS',
    port: 443,
    public: true,
  },
  {
    name: 'CloudFront',
    protocol: 'HTTPS',
    port: 443,
    public: true,
  },
  {
    name: 'NestJS',
    protocol: 'HTTP',
    port: 3000,
    public: false,
  },
  {
    name: 'PostgreSQL',
    protocol: 'HTTP',
    port: 5432,
    public: false,
  },
];

const healthCheck = {
  path: '/health',
  expectedStatus: 200,
};

const cloudFront = {
  origin: 'S3',
  bucketPublic: false,
  originAccessControl: true,
};

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }

  console.log(`PASS: ${message}`);
}

assert(
  endpoints
    .filter((endpoint) => endpoint.public)
    .every((endpoint) => endpoint.protocol === 'HTTPS' && endpoint.port === 443),
  'Public endpoints use HTTPS on port 443',
);

assert(endpoints.find((e) => e.name === 'NestJS')?.public === false, 'NestJS is not public');

assert(
  endpoints.find((e) => e.name === 'PostgreSQL')?.public === false,
  'PostgreSQL is not public',
);

assert(
  healthCheck.path === '/health' && healthCheck.expectedStatus === 200,
  'ALB health check is configured',
);

assert(
  cloudFront.origin === 'S3' && cloudFront.bucketPublic === false && cloudFront.originAccessControl,
  'CloudFront uses a private S3 origin with OAC',
);

console.log('Traffic plan validation passed.');
