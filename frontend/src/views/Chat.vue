<template>
  <main>
    <div class="message-group" ref="el">
      <div class="message-item" v-for="group in messages[activeRoom]">
        <!--<div class="message-avatar">

        </div>-->

        <header class="message-header">
          <div class="message-sender" :style="{ '--sender-color': users[group.sender]?.color }">
            {{ group.sender }}
          </div>

          <div class="message-timestamp">
            {{ group.timestamp.toLocaleString() }}
          </div>
        </header>

        <template v-for="message in group.messages">
          <div class="message-content"
               :class="{ 'visual-content-only': (message as FormattedMessage).hasVisualContentOnly }"
               v-html="(message as FormattedMessage).content"></div>

          <div class="message-embed" v-for="embed in (message as FormattedMessage).embeds">
            <div class="embed-site-name" v-if="embed.siteName">{{ embed.siteName }}</div>

            <div class="embed-url">
              <a :href="embed.url">{{ embed.title }}</a>
            </div>

            <div class="embed-description" v-if="embed.description">{{ embed.description }}</div>
            <img :src="embed.image" :alt="embed.title" class="embed-image" v-if="embed.image"/>
          </div>
        </template>
      </div>
    </div>

    <div class="input-wrapper">
      <textarea :rows="messageRows"
                placeholder="Send a message"
                @keydown.enter="sendMessage"
                v-model="message"
                ref="messageInput"></textarea>

      <button type="button" class="btn btn-primary" @click="sendMessage">
        >
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { activeRoom } from '@/store/Rooms';
import { AddChatMessage, type FormattedMessage, messages, users } from '@/store/RoomChat';
import { MessageType, Send } from '@/store/Client';

const el = ref<HTMLElement>();
watch(activeRoom, () => scrollMessageContainerDown('instant'));

const messageInput = ref<HTMLInputElement>();
const message = ref('');
const messageRows = ref(1);

watch(message, (value) => {
  messageRows.value = value.count('\n', 3) + 1;
  // messageInput.value!.scrollTo({ top: messageInput.value!.scrollHeight });
});

function sendMessage(e: KeyboardEvent | MouseEvent) {
  if ('key' in e) {
    if (e.shiftKey) return;
    e.preventDefault();
  }

  const ok = Send(MessageType.ChatMessage, {
    message: message.value,
  });

  if (ok) {
    AddChatMessage('Tecno', message.value);

    message.value = '';
    messageRows.value = 1;
  }
}

function scrollMessageContainerDown(behavior?: ScrollBehavior) {
  nextTick(() => el.value!.scrollTo({
    top: el.value!.scrollHeight,
    behavior,
  }));
}

watch(messages, () => scrollMessageContainerDown(), { deep: true });
</script>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 1em;
  height: calc(100% - 2em);
  overflow: hidden;
  user-select: text;

  > .message-group {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scroll-behavior: smooth;

    > .message-item {
      margin-bottom: 1em;

      &:first-child {
        margin-top: auto;
      }

      > .message-header {
        display: flex;

        > .message-sender {
          margin-right: .5em;
          color: var(--sender-color);
        }

        > .message-timestamp {
          font-size: .9em;
          opacity: .5;
          margin-top: .1em;
        }
      }

      > .message-content {
        white-space: pre;

        &.visual-content-only {
          > :deep(.emote) {
            height: 2em;
          }
        }

        > :deep(.emote) {
          height: 1em;
          vertical-align: middle;
        }
      }

      > .message-embed {
        padding: 1em;
        border-radius: .5em;
        background-color: rgba(black, .1);
        width: 25em;
        overflow: hidden;
        margin: .5em 0;

        > :not(:last-child) {
          margin-bottom: .5em;
        }

        > .embed-description {
          font-size: .9em;
        }

        > .embed-image {
          width: 100%;
          border-radius: .5em;
        }
      }
    }
  }

  > .input-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    margin-top: .5em;

    > textarea {
      background-color: rgba(black, .2);
      border: none;
      border-radius: .5em;
      resize: none;
      padding: .75em 1em;
      outline: none;
      color: inherit;
      font: inherit;
      scroll-padding: .75em;
    }

    > .btn {
      margin-left: 1em;
    }
  }
}
</style>
