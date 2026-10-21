import { BadRequestException } from '@nestjs/common';

const MAX_IDEMPOTENCY_KEY_LENGTH = 128;

export function validateIdempotencyKey(
  value: string | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalizedValue = value.trim();

  if (normalizedValue.length === 0) {
    throw new BadRequestException('idempotency-key must not be empty');
  }

  if (normalizedValue.length > MAX_IDEMPOTENCY_KEY_LENGTH) {
    throw new BadRequestException(
      `idempotency-key must not exceed ${MAX_IDEMPOTENCY_KEY_LENGTH} characters`,
    );
  }

  return normalizedValue;
}
