import { ref } from 'vue';
import { FetchWebpageMetadata } from '@wails/go/main/App';
import { main } from '@wails/go/models';
import { activeRoom } from '@/store/Rooms';

export type MessageGroup = {
  sender: string,
  timestamp: Date,
  messages: Array<string | FormattedMessage>,
};

export type FormattedMessage = {
  content: string,
  embeds: main.Meta[],
  hasVisualContentOnly: boolean,
};

export const users: Record<string, { color: string }> = {
  'Baz': {
    color: '#f1c410',
  },
  'ItsMrSammeh': {
    color: '#3498db',
  },
  'Aaron': {
    color: '#2ecc71',
  },
  'Tecno': {
    color: '#e74c3c',
  },
  'ricdotnet': {
    color: '#f1c410',
  },
  'Frank': {
    color: '#2ecc71',
  },
};

export const messages = ref<Record<string, Array<MessageGroup>>>({
  'Baz': [
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-24T09:17Z'),
      messages: [
        'I heard discord had a new UI update for mobile and everyone on iPhone had it.... so I bought an iPhone because I wanted to try it too <:KEKW:>',
      ],
    },
    {
      sender: 'Baz',
      timestamp: new Date('2024-04-24T09:18'),
      messages: [
        '<:Jiggle:>',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-24T09:18'),
      messages: [
        'What\'s worse - An hour after the order was confirmed, I got the update on my android <:KEKWDISCO:>',
      ],
    },
    {
      sender: 'Baz',
      timestamp: new Date('2024-04-24T09:18'),
      messages: [
        'haha',
        'that is so fucked',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-24T09:19'),
      messages: [
        'I\'m a terrible impulse buyer <:LUL:>',
      ],
    },
    {
      sender: 'Baz',
      timestamp: new Date('2024-04-24T09:20'),
      messages: [
        'you could say that one fucking hell lel',
        'just like the pc fans lel',
        'you still running the same setup for pc now ?',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-24T09:22'),
      messages: [
        'If you mean 7950x, 64GB & 4090 then yeah',
      ],
    },
    {
      sender: 'Baz',
      timestamp: new Date('2024-04-24T09:23'),
      messages: [
        'totally forgot about that build sheesh',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-24T09:23'),
      messages: [
        'Did I forget to mention the 3x 1TB m.2 + 10TB HDD 🙈',
        'But yeah, this beauty should do me for a while now',
      ],
    },
    {
      sender: 'Baz',
      timestamp: new Date('2024-04-24T09:34'),
      messages: [
        'mean see nothing wrong with it good sir',
        'i need to makes this api and website for Nex fully but i got lost on it',
        'been so long making a web app i just brain farted on design',
      ],
    },
  ],
  'ItsMrSammeh': [
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-25T09:31'),
      messages: [
        'Well shit… it’s finally happened <:PepeCrySea:>',
        'Image',
      ],
    },
    {
      sender: 'ItsMrSammeh',
      timestamp: new Date('2024-04-25T09:35'),
      messages: [
        'they blocked you? <:FeelsFeelsMan:>',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-25T09:40'),
      messages: [
        'Seems like it <:Sadge~1:>',
        'Guess I’ll finally have to pay for it myself now <:LUL:>',
      ],
    },
    {
      sender: 'ItsMrSammeh',
      timestamp: new Date('2024-04-25T09:43'),
      messages: [
        'F <:LUL:>',
      ],
    },
  ],
  'Aaron': [
    {
      sender: 'Aaron',
      timestamp: new Date('2024-04-20T17:02'),
      messages: [
        'in vc pleb',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-20T17:05'),
      messages: [
        'You telling me to turn my tunes down <:DansGame~1:>',
      ],
    },
    {
      sender: 'Aaron',
      timestamp: new Date('2024-04-20T17:05'),
      messages: [
        '<:KEKWiggle:>',
        'fucking loops mad',
        'Image',
        'Also had to fucking rewrite how i was doing 2d arrays',
        'as rider debugger don\'t support it',
      ],
    },
    {
      sender: 'Aaron',
      timestamp: new Date('2024-04-20T17:30'),
      messages: [
        'UnrealEditor-Win64-Debug_CyxJWS90DB._comp.mp4',
      ],
    },
  ],
  'General Code': [
    {
      sender: 'ricdotnet',
      timestamp: new Date('2024-04-26T03:30'),
      messages: [
        'java <:Pog:>',
        'there is a go thing like electron',
        'and there is tauri that uses rust in the backend <:aPES_Think:>',
        // [text](url)
        '[https://wails.io/](https://wails.io/)',
        '[https://tauri.app/](https://tauri.app/)',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-26T03:31'),
      messages: [
        'I ain\'t learning Rust',
      ],
    },
    {
      sender: 'ricdotnet',
      timestamp: new Date('2024-04-26T03:32'),
      messages: [
        'use wails then',
        '<:4head_100:>',
        'wails just sounds like rails said by someone who cant talk <:3Head:>',
      ],
    },
    {
      sender: 'Tecno',
      timestamp: new Date('2024-04-26T03:35'),
      messages: [
        'wails is tempting <:monkaHmm:>',
        'Finally gives me a reason to learn go',
      ],
    },
    {
      sender: 'ricdotnet',
      timestamp: new Date('2024-04-26T03:36'),
      messages: [
        'java jetbrains compose',
        '<:PauseChamp:>',
      ],
    },
    {
      sender: 'Frank',
      timestamp: new Date('2024-04-26T04:04'),
      messages: [
        'Python qt',
        '<:spopSCHEME:>',
        'There\'s also nativephp now',
      ],
    },
    {
      sender: 'ricdotnet',
      timestamp: new Date('2024-04-26T04:14'),
      messages: [
        '<:cringeasf:>',
        'Imagine nativephp running in a portable build of xampp <:KappaHD:>',
      ],
    },
  ],
});

const emoteMap: Record<string, string> = {
  'KEKW': 'https://cdn.frankerfacez.com/emoticon/381875/4',
  'KEKWDISCO': 'https://cdn.betterttv.net/emote/5e20956a88e62a5f14dc9cb2/3x.webp',
  'Jiggle': 'https://cdn.discordapp.com/emojis/977604958109180034.webp?size=96&quality=lossless',
  'LUL': 'https://cdn.discordapp.com/emojis/844611211449466880.webp?size=40&quality=lossless',
  'FeelsFeelsMan': 'https://cdn.discordapp.com/emojis/414361645100302336.webp?size=40&quality=lossless',
  'Sadge~1': 'https://cdn.discordapp.com/emojis/1142484077425987625.webp?size=40&quality=lossless',
  'PepeCrySea': 'https://cdn.discordapp.com/emojis/762346611820462161.gif?size=40&quality=lossless',
  'DansGame~1': 'https://cdn.discordapp.com/emojis/232893529632800769.webp?size=40&quality=lossless',
  'KEKWiggle': 'https://cdn.discordapp.com/emojis/1142484065455444178.gif?size=96&quality=lossless',
  'Pog': 'https://cdn.discordapp.com/emojis/1142484068559224982.webp?size=40&quality=lossless',
  'aPES_Think': 'https://cdn.discordapp.com/emojis/493353113332219924.gif?size=40&quality=lossless',
  '4head_100': 'https://cdn.discordapp.com/emojis/584637989737463828.gif?size=96&quality=lossless',
  '3Head': 'https://cdn.discordapp.com/emojis/780556783218982943.webp?size=40&quality=lossless',
  'monkaHmm': 'https://cdn.discordapp.com/emojis/553934454935257099.webp?size=40&quality=lossless',
  'PauseChamp': 'https://cdn.discordapp.com/emojis/678084483819503616.webp?size=96&quality=lossless',
  'spopSCHEME': 'https://cdn.discordapp.com/emojis/834520957334454295.webp?size=96&quality=lossless',
  'cringeasf': 'https://cdn.discordapp.com/emojis/796915481075777598.webp?size=96&quality=lossless',
  'KappaHD': 'https://cdn.discordapp.com/emojis/231212925992304641.webp?size=40&quality=lossless',
};

/*
Discord formats

Emoji: `<:${EmojiName}:${EmojiId}>` | `<a:${EmojiName}:${EmojiId}>`
Role: `<@&${roleId}>`
Channel: `<#${channelId}>`
User: `<@${userId}>`
Spoiler: `||${content}||`
Hyperlink: `[${Content}](${Url})` | `[${Content}](${string} "${Title}")`
Hyperlink (no embed): `<${url}>`
Command: `</${CommandName} ${SubcommandGroupName} ${SubcommandName}:${CommandId}>` | `</${CommandName} ${SubcommandGroupName}:${SubcommandName}>` | `</${CommandName}:${SubcommandGroupName}>`
MessageLink: `https://discord.com/channels/@me/${ChannelId}/${MessageId}` | `https://discord.com/channels/${GuildId}/${ChannelId}/${MessageId}`
Heading: ``# ${Content}` | `## ${Content}` | `### ${Content}`
Timestamp: `<t:${bigint}>` | `<t:${bigint}:${Style}>` | `<t:${Seconds}>` | `<t:${Seconds}:${Style}>`
  TimestampStyles - https://discord.com/developers/docs/reference#message-formatting-timestamp-styles
BlockQuote: `>>> ${content}`
Quote: `> ${content}`
StrikeThrough: `~~${content}~~`
Underline: `__${content}__`
Bold: `**${content}**`
Italic: `_${content}_`
InlineCode: `\`${content}\``
CodeBlock: `\`\`\`\n${Content}\n\`\`\`` | `\`\`\`${Language}\n${Content}\n\`\`\``
 */

// const LINK_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(\s|$)/g;
const LINK_REGEX = /\[(.*)]\((.*)\)/g;
const EMOTE_REGEX = /<:(.*):>/g;

for (const room in messages.value) {
  for (const group of messages.value[room]) {
    group.messages.forEach(
      (msg, i) => FormatMessage(msg).then(f => group.messages[i] = f),
    );
  }
}

export async function AddChatMessage(sender: string, message: string) {
  const roomMsgs = messages.value[activeRoom.value];
  const lastMessage = roomMsgs.at(-1);
  const insertIndex = lastMessage?.sender === sender && Date.now() - lastMessage.timestamp.getTime() < 30e3
    ? roomMsgs.length - 1
    : -1;

  const formattedMessage = await FormatMessage(message);

  if (insertIndex === -1) {
    roomMsgs.push({
      sender,
      timestamp: new Date(),
      messages: [formattedMessage],
    });
  } else {
    roomMsgs[insertIndex].messages.push(formattedMessage);
  }
}

export async function FormatMessage(message: any): Promise<FormattedMessage> {
  const rawMessageLength = message.length;
  let totalEmoteLength = 0;

  const formatted: {
    content: string,
    embeds: main.Meta[],
    hasVisualContentOnly: boolean,
  } = {
    content: message,
    embeds: [],
    hasVisualContentOnly: false,
  };

  // Parse links.
  const metaQueue = [];
  for (const embed of message.matchAll(LINK_REGEX)) {
    metaQueue.push(FetchWebpageMetadata(embed[2]).then(meta => formatted.embeds.push(meta)));

    formatted.content = formatted.content.substring(0, embed.index) +
      `<a href="${embed[1]}">${embed[2]}</a>` +
      formatted.content.substring(embed.index + embed[0].length);
  }
  await Promise.all(metaQueue);

  // Parse emotes.
  for (const emote of formatted.content.matchAll(EMOTE_REGEX)) {
    totalEmoteLength += emote[0].length;

    formatted.content = formatted.content.substring(0, emote.index) +
      `<img src="${emoteMap[emote[1]]}" alt="${emote[1]}" class="emote"/>` +
      formatted.content.substring(emote.index + emote[0].length);
  }

  formatted.hasVisualContentOnly = totalEmoteLength === rawMessageLength;

  return formatted;
}
