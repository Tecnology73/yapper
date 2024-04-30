import { ref } from 'vue';

export const rooms = ref([
  'Baz',
  'ItsMrSammeh',
  'Aaron',
  'General Code',
]);
export const activeRoom = ref(rooms.value.at(-1) as string);
