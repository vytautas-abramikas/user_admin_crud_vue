import { defineStore } from "pinia";
import axios from "axios";
import { TUser } from "../types/TUser";
import { TState } from "../types/TState";

export const useUserStore = defineStore("userStore", {
  state: (): TState => ({
    users: [],
    filterTerm: "",
    userModalMode: "add",
    selectedUserId: "",
    isVisibleAddUserModal: false,
    isVisibleEditUserModal: false,
    isVisibleRemoveUserModal: false,
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3002/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async createUser(user: TUser) {
      try {
        const response = await axios.post("http://localhost:3002/users", user);
        this.users = [...this.users, response.data];
        this.setModalVisibility("add", false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    async updateUser(updatedUser: TUser) {
      try {
        const response = await axios.put(
          `http://localhost:3002/users/${updatedUser.id}`,
          updatedUser
        );
        this.users = this.users.map((user) =>
          user.id === updatedUser.id ? response.data : user
        );
        this.setModalVisibility("edit", false);
      } catch (error) {
        console.error("Error editing user:", error);
      }
    },
    async deleteUser(userId: string) {
      try {
        await axios.delete(`http://localhost:3002/users/${userId}`);
        this.users = this.users.filter((user) => user.id !== userId);
        this.setModalVisibility("remove", false);
      } catch (error) {
        console.error("Error removing user:", error);
      }
    },
    setFilterTerm(term: string) {
      this.filterTerm = term;
    },
    setUserModalMode(mode: "add" | "edit") {
      this.userModalMode = mode;
    },
    setSelectedUserId(id: string) {
      this.selectedUserId = id;
    },
    setModalVisibility(modal: "add" | "edit" | "remove", visibility: boolean) {
      switch (modal) {
        case "add":
          this.isVisibleAddUserModal = visibility;
          break;
        case "edit":
          this.isVisibleEditUserModal = visibility;
          break;
        case "remove":
          this.isVisibleRemoveUserModal = visibility;
          break;
        default:
          break;
      }
    },
  },
  getters: {
    filteredUsers: (state) => {
      return state.users.filter(
        (user) =>
          user.name.includes(state.filterTerm) ||
          user.username.includes(state.filterTerm) ||
          user.email.includes(state.filterTerm)
      );
    },
  },
});
