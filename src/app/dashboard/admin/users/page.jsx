import React from "react";
import { getUserList } from "../../../../lib/api/users";

const AdminUsersPage = async () => {
  const data = await getUserList();
  const users = data.users;
  console.log(users);
  return <div>users total: {users.length}</div>;
};

export default AdminUsersPage;
