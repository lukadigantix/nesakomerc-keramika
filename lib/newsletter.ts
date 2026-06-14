const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; alreadySubscribed: boolean }> {
  const res = await fetch(`${BASE_URL}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Greška");
  return json;
}
