<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../store/store";
import { storeToRefs } from "pinia";
import UsersHeader from "./UsersHeader.vue";
import UsersTable from "./UsersTable.vue";
import UserModal from "./UserModal.vue";
import RemoveUserModal from "./RemoveUserModal.vue";

const userStore = useUserStore();

const { fetchUsers } = userStore;

const {
  isVisibleAddUserModal,
  isVisibleEditUserModal,
  isVisibleRemoveUserModal,
} = storeToRefs(userStore);

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-6">
    <div class="container mx-auto bg-white shadow-lg rounded-lg p-6">
      <UsersHeader />
      <UsersTable />
      <UserModal v-if="isVisibleAddUserModal" />
      <UserModal v-if="isVisibleEditUserModal" />
      <RemoveUserModal v-if="isVisibleRemoveUserModal" />
    </div>
  </div>
</template>
