<template>
  <template v-if="isConnected">
    <Sidebar/>
    <RouterView/>
  </template>

  <template v-else>
    <div class="login-container">
      <h2>Login</h2>

      <input type="text" placeholder="Username" autofocus v-model.trim="userName"/>

      <button type="button" class="btn btn-primary" @click="login">
        Login
      </button>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import { Connect, MessageType, Send } from '@/store/Client';

const isConnected = ref(false);
const userName = ref(localStorage.getItem('username') || '');
if (userName.value.length > 0) login();

async function login() {
  if (userName.value.length === 0) return;

  await Connect();

  const ok = Send(MessageType.Welcome, {
    name: userName.value,
  });
  if (!ok) return;

  localStorage.setItem('username', userName.value);
  isConnected.value = true;
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > .btn {
    margin-top: 1em;
  }
}
</style>
