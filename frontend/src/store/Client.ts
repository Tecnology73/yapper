import { AddChatMessage } from '@/store/RoomChat';

let ws: WebSocket | null, connectPromise: PromiseResolver | null;
let userId: number = -1;
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

  console.log('[Client] [Send]', type, data);
  ws.send(JSON.stringify({
    type,
    data,
  }));
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

function onMessage(msg: MessageEvent) {
  const data = JSON.parse(msg.data);

  console.log(data);
  return;

  switch (data.type) {
    case MessageType.Welcome: {
      const packet = unmarshalWelcome(msg.data);
      console.debug('[Client] [Welcome]', packet);

      userId = packet.userId;
      break;
    }
    case MessageType.UserConnected: {
      const packet = unmarshalUserConnected(msg.data);
      console.debug('[Client] [User Connected]:', packet);

      users[packet.userId] = packet.userName;
      break;
    }
    case MessageType.UserDisconnected: {
      const packet = unmarshalUserDisconnected(msg.data);
      console.debug('[Client] [User Disconnected]:', packet);
      break;
    }
    case MessageType.ChatMessage: {
      const packet = unmarshalChatMessage(msg.data);
      console.debug('[Client] [Chat Message]:', packet);

      const sender = users[packet.userId];
      if (sender) AddChatMessage(sender, packet.message);
      break;
    }
    case MessageType.StreamRoomsConnect: {
      const packet = unmarshalStreamRoomsConnect(msg.data);
      console.debug('[Client] [Stream Rooms Connect]:', packet);
      break;
    }
    default:
      console.warn('[Client]', '[Unknown Message]', msg.data);
  }
}

function unmarshalWelcome(payload: string) {
  return {
    type: MessageType.Welcome,
    userId: +payload.substring(8, 16),
  };
}

function unmarshalUserConnected(payload: string) {
  return {
    type: MessageType.UserConnected,
    userId: +payload.substring(8, 16),
    userName: payload.substring(16),
  };
}

function unmarshalUserDisconnected(payload: string) {
  return {
    type: MessageType.UserDisconnected,
    userId: +payload.substring(8, 16),
  };
}

function unmarshalChatMessage(payload: string) {
  return {
    type: MessageType.ChatMessage,
    userId: +payload.substring(8, 16),
    message: payload.substring(16),
  };
}

function unmarshalStreamRoomsConnect(payload: string) {
  return {
    type: MessageType.StreamRoomsConnect,
  };
}
