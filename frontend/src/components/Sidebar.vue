<template>
  <aside class="sidebar">
    <header>
      <h1>Yapper</h1>
    </header>

    <div class="chat-room-group">
      <div class="chat-room-item"
           v-for="room in rooms"
           :key="room"
           :class="{ active: room === activeRoom }"
           @click="activeRoom = room">
        {{ room }}
      </div>

      <button type="button" class="btn btn-primary">
        +&nbsp;&nbsp;New Room
      </button>
    </div>

    <div class="voice-group">
      <VoiceChat/>
    </div>

    <div class="action-bar-group">
      <button type="button" class="btn btn-primary" @click="Quit()">
        Exit
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { rooms, activeRoom } from '@/store/Rooms';
import { Quit } from '@wails/runtime';
import VoiceChat from '@/components/VoiceChat.vue';
</script>

<style scoped lang="scss">
aside {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  position: relative;
  cursor: default;
  text-align: center;
  width: 15em;

  &:after {
    position: absolute;
    right: 0;
    top: 3em;
    bottom: 3em;
    width: 1px;
    background-color: rgba(black, .2);
    content: ' ';
  }

  > header {
    --wails-draggable: drag;
    padding: 1em 1em;
    margin-bottom: 3em;
    text-transform: uppercase;

    > h1 {
      margin: 0;
    }
  }

  > .chat-room-group {
    padding: 0 1em;
    max-width: 100%;
    overflow: hidden;

    > .chat-room-item {
      padding: .75em 1em;
      border-radius: .5em;
      margin: 1em 0;
      cursor: pointer;
      transition: background-color ease-in-out .2s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.active {
        background-color: rgba(black, .2);
      }

      &:hover {
        background-color: rgba(black, .3);
      }
    }
  }

  > .action-bar-group {
    padding: 1em 1em;

    > .btn {
      padding: 1em 3em;
      text-transform: uppercase;
    }
  }
}
</style>
