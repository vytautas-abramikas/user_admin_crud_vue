<script setup lang="ts">
import { useUserStore } from "../store/store";

const userStore = useUserStore();

const { setFilterTerm, setUserModalMode, setModalVisibility } = userStore;

const showAdduserModal = () => {
  setUserModalMode("add");
  setModalVisibility("add", true);
};
</script>

<template>
  <h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">
    Users' Administration Panel
  </h1>
  <div class="flex justify-between items-center mb-6">
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
      @click="showAdduserModal"
    >
      Add User
    </button>
    <input
      type="text"
      id="searchInput"
      class="border border-gray-300 rounded-lg px-4 py-2 w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      placeholder="Filter users..."
      @keyup="setFilterTerm"
    />
  </div>
</template>
