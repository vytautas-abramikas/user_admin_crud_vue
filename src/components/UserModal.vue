<script setup lang="ts">
import { ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/store";
import { TUser } from "../types/TUser";

const userStore = useUserStore();

const { filteredUsers, userModalMode, selectedUserId } = storeToRefs(userStore);

const { createUser, updateUser, setModalVisibility } = userStore;

const emptyUser: TUser = {
  id: "",
  username: "",
  name: "",
  email: "",
  role: "User",
};

const userData: TUser =
  userModalMode.value === "add"
    ? emptyUser
    : filteredUsers.value.find((user) => user.id === selectedUserId.value) ||
      emptyUser;

const userState: Ref<TUser> = ref({ ...userData });

const errors: Ref<{ username: string; name: string; email: string }> = ref({
  username: "",
  name: "",
  email: "",
});

const validate = (): boolean => {
  const newErrors = { username: "", name: "", email: "" };
  if (userState.value.username.length < 3) {
    newErrors.username = "Username must be at least 3 characters long";
  }
  if (userState.value.name.length < 3) {
    newErrors.name = "Name must be at least 3 characters long";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userState.value.email)) {
    newErrors.email = "Email is not valid";
  }
  errors.value = newErrors;
  return !Object.values(newErrors).some((error) => error);
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (validate()) {
    if (userModalMode.value === "add") {
      const userToAdd = { ...userState.value, id: String(Date.now()) };
      createUser(userToAdd);
    } else {
      updateUser(userState.value);
    }
  }
};
</script>

<template>
  <div
    :id="userModalMode === 'add' ? 'addUserModal' : 'editUserModal'"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-2xl">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        {{ userModalMode === "add" ? "Add User" : "Edit User" }}
      </h2>
      <form @submit="handleSubmit">
        <div class="mb-6">
          <label
            class="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
            for="input_username"
          >
            Username
          </label>
          <div class="relative group">
            <input
              id="input_username"
              v-model="userState.username"
              type="text"
              :class="`w-full px-4 py-2 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`"
              placeholder="Enter username"
            />
            <div
              v-if="errors.username"
              class="absolute z-10 opacity-85 left-0 top-full mt-1 hidden group-hover:block bg-white border border-red-500 text-red-500 text-sm p-2 rounded-lg shadow-lg"
            >
              {{ errors.username }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
            for="input_name"
          >
            Name
          </label>
          <div class="relative group">
            <input
              id="input_name"
              v-model="userState.name"
              type="text"
              :class="`w-full px-4 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`"
              placeholder="Enter name"
            />
            <div
              v-if="errors.name"
              class="absolute z-10 opacity-85 left-0 top-full mt-1 hidden group-hover:block bg-white border border-red-500 text-red-500 text-sm p-2 rounded-lg shadow-lg"
            >
              {{ errors.name }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
            for="input_email"
          >
            Email
          </label>
          <div class="relative group">
            <input
              id="input_email"
              v-model="userState.email"
              type="text"
              :class="`w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`"
              placeholder="Enter email"
            />

            <div
              v-if="errors.email"
              class="absolute z-10 opacity-85 left-0 top-full mt-1 hidden group-hover:block bg-white border border-red-500 text-red-500 text-sm p-2 rounded-lg shadow-lg"
            >
              {{ errors.email }}
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 font-semibold mb-2 after:content-['*'] after:text-red-500"
            for="select_role"
          >
            Role
          </label>
          <select
            id="select_role"
            v-model="userState.role"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="User">User</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <div class="flex justify-between">
          <button
            type="button"
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
            @click="setModalVisibility(userModalMode, false)"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            {{ userModalMode === "add" ? "Add" : "Save" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
