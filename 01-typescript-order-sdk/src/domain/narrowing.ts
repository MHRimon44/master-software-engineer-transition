export function formatValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
console.log(formatValue("hello"));
console.log(formatValue(125.456));

type ApiSuccess = {
  data: string;
};

type ApiError = {
  error: string;
};

function handleResponse(response: ApiSuccess | ApiError): string {
  if ("data" in response) {
    return `Success: ${response.data}`;
  }
  return `Error: ${response.error}`;
}
console.log(handleResponse({ data: "Order created successfully" }));
console.log(handleResponse({ error: "Failed to create order" }));

function getErrorMessage(error: Error | string): string {
  if (error instanceof Error) {
    return `Error object: ${error.message}`;
  }
  return `Error string: ${error}`;
}
console.log(getErrorMessage(new Error("Payment gateway unavailable")));
console.log(getErrorMessage("Invalid payment status"));

function formatPhone(phone?: string): string {
  if (phone) {
    return `Phone: ${phone}`;
  }
  return "Phone not available";
}
console.log(formatPhone("01700000000"));
console.log(formatPhone());
