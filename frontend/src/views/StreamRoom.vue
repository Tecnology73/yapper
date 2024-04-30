<template>
  <main>
    <input type="text" placeholder="User Name" v-model.trim="userName"/>
    <button type="button" class="btn btn-primary" @click="connectToStreamRooms">
      >&nbsp;&nbsp;Connect
    </button>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessageType, Send } from '@/store/Client';

const userName = ref('');

async function connectToStreamRooms() {
  Send(MessageType.StreamRoomsConnect, userName.value);
}
</script>

<style scoped lang="scss">

</style>
