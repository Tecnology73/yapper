<template>
  <h4>Voice Channels</h4>
  <p>Peer ID: {{ peerId }}</p>

  <input type="text" placeholder="User Name" v-model.trim="userName"/>

  <button type="button" class="btn btn-primary" :disabled="!userName" @click="createChannel">
    +&nbsp;&nbsp;Create Channel
  </button>

  <input type="text" placeholder="Join Code" v-model.trim="joinCode"/>
  <button type="button" class="btn btn-primary" :disabled="!userName" @click="joinChannel">
    >&nbsp;&nbsp;Join Channel
  </button>
  
  <video autoplay playsinline muted ref="localStream"></video>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Peer, MediaConnection } from 'peerjs';

const localStream = ref<HTMLVideoElement>();

const myStreams: {
  video: MediaStream | null,
  audio: MediaStream | null,
} = {
  video: null,
  audio: null,
};

const peerId = ref<string>('');
let mediaCall: MediaConnection;
let peer: Peer;
const members = ref<Record<string, {
  call: MediaConnection,
  stream: MediaStream | null,
}>>({});

const userName = ref('');
const joinCode = ref('');

function generatePeerId() {
  const bytes = window.crypto.getRandomValues(new Uint8Array(3));
  let id = '';
  for (const byte of bytes) {
    id += byte.toString(16);
  }

  return id;
}

function initPeer() {
  if (peer) return;

  peerId.value = generatePeerId();
  peer = new Peer(peerId.value, {
    host: 'localhost',
    port: 9000,
    path: '/yapper',
    debug: 3,
    config: {
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
    },
  });
}

async function getMediaStreams() {
  myStreams.video?.getTracks().forEach(track => track.stop());
  myStreams.audio?.getTracks().forEach(track => track.stop());

  const streams = await Promise.all([
    // Live stream
    /*navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: 'browser',
          },
          audio: {
            // @ts-ignore
            suppressLocalAudioPlayback: false,
          },
          preferCurrentTab: false,
          selfBrowserSurface: 'exclude',
          systemAudio: 'include',
          surfaceSwitching: 'include',
          monitorTypeSurfaces: 'include',
        })
        .catch(_ => null),*/

    // Voice chat
    navigator.mediaDevices.getUserMedia({
          audio: true,
        })
        .catch(_ => null),
  ]);

  // myStreams.video = streams[0];
  // myStreams.audio = streams[1];
  myStreams.audio = streams[0];
}

async function createChannel() {
  initPeer();
  await getMediaStreams();

  if (myStreams.video)
    localStream.value!.srcObject = myStreams.video;

  peer.on('call', call => {
    const member = members.value[call.peer] ??= {
      call,
      stream: null,
    };

    call.answer(myStreams.audio!);

    call.on('stream', _remoteStream => member.stream = _remoteStream);
    call.on('error', console.error);
    call.on('close', () => {
      member.stream?.getTracks().forEach(track => track.stop());
      delete members.value[call.peer];
    });
  });
}

async function joinChannel() {
  initPeer();
  await getMediaStreams();

  if (myStreams.video)
    localStream.value!.srcObject = myStreams.video;

  const connection = peer.connect(joinCode.value);
  connection.on('error', console.error);

  const call = peer.call(joinCode.value, myStreams.audio!);
  if (!call) {
    console.error('Unable to connect to remote peer!');
    return;
  }

  const member = members.value[call.peer] ??= {
    call,
    stream: null,
  };

  call.on('stream', _remoteStream => member.stream = _remoteStream);
  call.on('error', console.error);
  call.on('close', () => {
    member.stream?.getTracks().forEach(track => track.stop());
    delete members.value[call.peer];
  });
}
</script>

<style scoped lang="scss">
h4 {
  border-top: solid 1px rgba(black, .2);
  padding: 2em 0;
}

video {
  position: fixed;
  top: 0;
  right: 0;
  border: solid 2px red;
  width: 400px;
  height: 225px;
  background-color: black;

  &:nth-of-type(1) {
    top: 300px;
    border-color: green;
  }
}
</style>
