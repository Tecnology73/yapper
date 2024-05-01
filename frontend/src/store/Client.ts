import { AddChatMessage } from '@/store/RoomChat';

let ws: WebSocket | null, connectPromise: PromiseResolver | null;
export let userId: number = -1;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
export const users: Record<number, string> = {};

export enum MessageType {
  Welcome,
  UserConnected,
  UserDisconnected,
  ChatMessage,
  StreamRoomsConnect,
}

export function Connect() {
  if (ws) {
    ws.close();
    connectPromise?.reject('connecting');
  }

  connectPromise = Promise.withResolvers();

  ws = new WebSocket('ws://localhost:8080');
  ws.binaryType = 'arraybuffer';
  ws.addEventListener('open', onOpen);
  ws.addEventListener('error', onError);
  ws.addEventListener('ping', onPing);
  ws.addEventListener('message', onMessage);

  return connectPromise.promise;
}

export function Send(type: MessageType, data?: any) {
  if (ws?.readyState != 1) {
    console.warn('[Client]', '[Send]', 'not connected');
    return false;
  }

  const payload = data ? JSON.stringify(data) : null;
  const buffer = new ArrayBuffer(1 + (payload?.length ?? 0));
  const view = new DataView(buffer);
  view.setInt8(0, type);

  if (payload) {
    textEncoder.encodeInto(payload, new Uint8Array(buffer, 1));
  }

  console.log('[Client] [Send]', type, data);
  ws.send(buffer);

  return true;
}

function onOpen() {
  console.log('[Client]', '[onOpen]');

  connectPromise?.resolve();
  connectPromise = null;
}

function onError(err: Event) {
  console.error('[Client]', '[onError]', err);
  connectPromise?.reject(err);
}

function onPing() {
  console.log('[Client]', '[onPing]]');
}

function onMessage(msg: MessageEvent<ArrayBuffer>) {
  const view = new DataView(msg.data);
  const msgType = view.getInt8(0);
  const payload = JSON.parse(textDecoder.decode(msg.data.slice(1)));

  console.log('[Client]', '[Message]', msgType, '->', payload);

  switch (msgType) {
    case MessageType.Welcome:
      userId = payload.id;

      for (const id in payload.users) {
        users[+id] = payload.users[id];
      }
      break;

    case MessageType.UserConnected:
      users[payload.id] = payload.name;
      break;

    case MessageType.UserDisconnected:
      delete users[payload.id];
      break;

    case MessageType.ChatMessage:
      const sender = users[payload.sender];
      if (sender) {
        AddChatMessage(sender, payload.message);
      }

      break;

    case MessageType.StreamRoomsConnect:
      break;

    default:
      console.warn('[Client]', '[On Message]', 'Unhandled message:', msgType, '->', payload);
      break;
  }
}
