const MY_SUPABASE_URL = "https://wlnspyyqlzrvkrlljofs.supabase.co";
const MY_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsbnNweXlxbHpydmtybGxqb2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODgwNjQsImV4cCI6MjA4OTg2NDA2NH0.vH8y4hql6H6OwN49T_VbYuu2o6FoiyV4Eovd75ANX8g";

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
