export type ApiError = {
  code: string;
  message: string;
};

export function isApiError(value: unknown): value is ApiError {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "code" in value &&
    "message" in value &&
    typeof value.code === "string" &&
    typeof value.message === "string"
  );
}

const response1: unknown = {
  code: "PAYMENT_FAILED",
  message: "Payment could not be completed",
};

const response2: unknown = {
  code: 500,
  message: "Server error",
};

if (isApiError(response1)) {
  console.log(response1.code);
  console.log(response1.message);
}

console.log(isApiError(response2));
