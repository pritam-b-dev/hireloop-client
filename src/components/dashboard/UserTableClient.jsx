"use client";
import React, { useState } from "react";
import { Table, Chip, Avatar, Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { updateUserRole } from "../../lib/actions/users";
import { ConfirmationModal } from "./ConfirmationModal";

const UserTableClient = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, setIsPending] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    action: null,
  });

  const openConfirm = (title, message, action) => {
    setModalConfig({ isOpen: true, title, message, action });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleRoleChange = async (userId, currentRole) => {
    setIsPending(true);
    const newRole = currentRole === "recruiter" ? "seeker" : "recruiter";

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );

    try {
      await updateUserRole(userId, newRole);
      toast.success(`Role updated to ${newRole}`);
    } catch (error) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: currentRole } : user,
        ),
      );
      toast.error("Failed to update role");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-6 bg-[#18181b] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <Table variant="secondary" className="dark">
        <Table.ScrollContainer>
          <Table.Content aria-label="User Management Table">
            <Table.Header>
              <Table.Column isRowHeader>User Name</Table.Column>
              <Table.Column>Email Address</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Join Date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column className="text-right">Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image src={user.image} alt={user.name} />
                        <Avatar.Fallback>
                          {user.name.substring(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-zinc-400">
                    {user.email}
                  </Table.Cell>
                  <Table.Cell>
                    <Chip variant="flat" size="sm" className="capitalize">
                      {user.role}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell className="text-zinc-400">
                    {formatDate(user.createdAt)}
                  </Table.Cell>
                  <Table.Cell>
                    <Chip
                      color={user.banned ? "danger" : "success"}
                      size="sm"
                      variant="dot"
                    >
                      {user.banned ? "Suspended" : "Active"}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell className="text-right flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="flat"
                      isDisabled={user.role === "admin"}
                      onClick={() =>
                        openConfirm(
                          "Change Role",
                          `Are you sure you want to change ${user.name}'s role to ${user.role === "recruiter" ? "Seeker" : "Recruiter"}?`,
                          () => handleRoleChange(user.id, user.role),
                        )
                      }
                    >
                      {user.role === "admin" ? "Admin" : "Change Role"}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.action}
        title={modalConfig.title}
        message={modalConfig.message}
      />
    </div>
  );
};

export default UserTableClient;
