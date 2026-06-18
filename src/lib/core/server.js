"use server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), //backend এ req.body তে পেয়ে যাবে, যা app.use(express.json()) দিয়ে পার্স করেছি।
  });
  return res.json();
};
