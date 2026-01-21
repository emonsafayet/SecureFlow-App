export async function http<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
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
