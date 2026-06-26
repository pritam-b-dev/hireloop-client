import UserTableClient from "../../../../components/dashboard/UserTableClient";
import { getUserList } from "../../../../lib/api/users";

const AdminUsersPage = async () => {
  const data = await getUserList();
  return <UserTableClient initialUsers={data.users} />;
};

export default AdminUsersPage;
