"use server";
import { getUserToken } from "./session";

// এই ফাইল সবসময় server-এ চলবে, browser-এ না

// backend-এর base URL — .env থেকে আসে
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//create header
export const authHeader = async () => {
  const token = await getUserToken();
  //create header
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

// ============যেকোনো GET request-এর জন্য reusable helper================
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return res.json();
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: await authHeader(),
  });

  return res.json();
};

// ============যেকোনো POST request-এর জন্য reusable helper================

// path → "/api/companies" বা "/api/jobs" বা যেকোনো endpoint
// data → যে object টা body-তে পাঠাবো

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json", // backend-কে জানাচ্ছি body-তে JSON আসছে
      ...(await authHeader()),
    },
    body: JSON.stringify(data), // JS object → JSON string, backend req.body-তে পাবে
  });
  return res.json(); // response টাকে আবার JS object বানিয়ে return
};
