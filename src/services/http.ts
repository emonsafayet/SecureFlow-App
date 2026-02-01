export async function http<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "";
  const finalUrl = baseUrl ? new URL(url, baseUrl).toString() : url;

  const res = await fetch(finalUrl, {
    headers: {
      "Content-Type": "application/json",
      // Authorization will come later
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}
