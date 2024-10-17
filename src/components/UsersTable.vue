<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/store";

const userStore = useUserStore();

const { filteredUsers } = storeToRefs(userStore);

const { setSelectedUserId, setUserModalMode, setModalVisibility } = userStore;

const handleShowEditUserModal = (id: string) => {
  setSelectedUserId(id);
  setUserModalMode("edit");
  setModalVisibility("edit", true);
};

const handleShowRemoveUserModal = (id: string) => {
  setSelectedUserId(id);
  setModalVisibility("remove", true);
};
</script>

<template>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white text-center shadow-md">
      <thead className="bg-gradient-to-r from-blue-100 to-green-100">
        <tr className="">
          <th className="py-3 px-4 border-b">Username</th>
          <th className="py-3 px-4 border-b">Name</th>
          <th className="py-3 px-4 border-b">Email</th>
          <th className="py-3 px-4 border-b">Role</th>
          <th className="py-3 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
          className="hover:bg-yellow-50 transition duration-200"
        >
          <td className="py-3 px-4 border-b border-gray-200">
            {{ user.username }}
          </td>
          <td className="py-3 px-4 border-b border-gray-200">
            {{ user.name }}
          </td>
          <td className="py-3 px-4 border-b border-gray-200">
            {{ user.email }}
          </td>
          <td className="py-3 px-4 border-b border-gray-200">
            {{ user.role }}
          </td>
          <td
            className="py-3 lg:px-4 border-b border-gray-200 lg:flex lg:justify-center lg:space-x-2"
          >
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-1 rounded-lg shadow-md transition duration-300"
              @click="handleShowEditUserModal(user.id)"
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-md transition duration-300"
              @click="handleShowRemoveUserModal(user.id)"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
