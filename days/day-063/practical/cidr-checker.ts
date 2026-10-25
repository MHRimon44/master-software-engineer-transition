type IPv4Range = {
  start: number;
  end: number;
};

function ipv4ToNumber(ip: string): number {
  const parts = ip.split('.');

  if (parts.length !== 4 || parts.some((part) => !/^\d+$/.test(part) || Number(part) > 255)) {
    throw new Error(`Invalid IPv4 address: ${ip}`);
  }

  return parts.reduce((acc, part) => acc * 256 + Number(part), 0);
}

function cidrToRange(cidr: string): IPv4Range {
  const parts = cidr.split('/');

  if (parts.length !== 2) {
    throw new Error(`Invalid CIDR: ${cidr}`);
  }

  const [ip, prefixText] = parts;
  const prefix = Number(prefixText);

  if (!/^\d+$/.test(prefixText) || prefix < 0 || prefix > 32) {
    throw new Error(`Invalid prefix: ${cidr}`);
  }

  const address = ipv4ToNumber(ip);
  const blockSize = 2 ** (32 - prefix);
  const start = Math.floor(address / blockSize) * blockSize;

  return {
    start,
    end: start + blockSize - 1,
  };
}

function overlaps(a: string, b: string): boolean {
  const first = cidrToRange(a);
  const second = cidrToRange(b);

  return first.start <= second.end && second.start <= first.end;
}

const vpc = '10.0.0.0/16';

const subnets = [
  '10.0.1.0/24',
  '10.0.2.0/24',
  '10.0.11.0/24',
  '10.0.12.0/24',
  '10.0.21.0/24',
  '10.0.22.0/24',
];

const vpcRange = cidrToRange(vpc);

for (const subnet of subnets) {
  const range = cidrToRange(subnet);

  if (range.start < vpcRange.start || range.end > vpcRange.end) {
    throw new Error(`${subnet} is outside VPC`);
  }
}

for (let i = 0; i < subnets.length; i++) {
  for (let j = i + 1; j < subnets.length; j++) {
    if (overlaps(subnets[i], subnets[j])) {
      throw new Error(`Subnet overlap: ${subnets[i]} and ${subnets[j]}`);
    }
  }
}

console.log('PASS: All subnets are inside the VPC');
console.log('PASS: No overlapping subnets');
console.log(`PASS: Validated ${subnets.length} subnets`);
