import { ChannelType, Client } from "discord.js";

console.log("Starting Capybotta 2...");

const IRRELEVANT_ID = "1230977045132214292";
const CHANNEL_NAME = "music";

const client = new Client({ intents: ["Guilds"] });
client.on("ready", () => {
  console.log("Logged in as ", client.user?.tag);
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
  if (
    oldChannel.type !== ChannelType.GuildText ||
    newChannel.type !== ChannelType.GuildText
  )
    return;
  if (oldChannel.name !== CHANNEL_NAME || newChannel.name !== CHANNEL_NAME)
    return;
  if (
    oldChannel.parentId === IRRELEVANT_ID &&
    newChannel.parentId !== IRRELEVANT_ID
  ) {
    console.log("Channel moved..., will remove in 2 seconds");
    setTimeout(async () => {
      await newChannel.setParent(IRRELEVANT_ID);
    }, 2000);
  }
});

client.login(process.env.TOKEN);
