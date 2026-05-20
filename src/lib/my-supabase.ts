const MY_SUPABASE_URL = "https://ofuhbdbvnovwtrxcmecl.supabase.co";
const MY_SUPABASE_KEY = "sb_publishable_qHMvKEAOR4GWY6QBMNKFKg_t2Y5ztES";

const headers = {
  "apikey": MY_SUPABASE_KEY,
  "Authorization": `Bearer ${MY_SUPABASE_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "resolution=merge-duplicates",
};

export async function saveToContacts(data: Record<string, any>) {
  try {
    await fetch(`${MY_SUPABASE_URL}/rest/v1/contacts?on_conflict=email`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.warn("saveToContacts error:", err);
  }
}

export async function saveToNewsletter(email: string) {
  try {
    await fetch(`${MY_SUPABASE_URL}/rest/v1/newsletter?on_conflict=email`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email }),
    });
  } catch (err) {
    console.warn("saveToNewsletter error:", err);
  }
}
