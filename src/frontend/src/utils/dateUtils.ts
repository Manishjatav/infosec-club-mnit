export function formatDate(time: bigint): string {
  const ms = Number(time) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(time: bigint): string {
  const ms = Number(time) / 1_000_000;
  return new Date(ms).toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isUpcoming(time: bigint): boolean {
  return Number(time) > Date.now() * 1_000_000;
}

export function nowBigInt(): bigint {
  return BigInt(Date.now()) * BigInt(1_000_000);
}
