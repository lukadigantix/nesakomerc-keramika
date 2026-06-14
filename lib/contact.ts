const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendContactMessage(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Greška pri slanju poruke");
  return json;
}
