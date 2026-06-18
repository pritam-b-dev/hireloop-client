import React from "react";
import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "../../../../lib/core/session";

const CompanyPage = async () => {
  //যেহেতু এটা সার্ভার সাইড। এখানে useSession কাজ করবে না। Server-এ session পেতে হলে betterAuth এ বলা আছে getSession() ব্যবহার করতে। check lib->core->session.js
  const user = await getUserSession();

  return (
    <div>
      <CompanyProfile recruiter={user} />
    </div>
  );
};

export default CompanyPage;
