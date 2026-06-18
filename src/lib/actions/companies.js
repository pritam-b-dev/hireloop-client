"use server";

import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
};

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const createCompany = async (newCompanyData) => {
//   const res = await fetch(`${baseUrl}/api/companies`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newCompanyData), //backend এ req.body তে পেয়ে যাবে, যা app.use(express.json()) দিয়ে পার্স করেছি।
//   });
//   return res.json();
// };
