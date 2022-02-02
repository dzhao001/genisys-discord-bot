const { Client, VoiceChannel, Intents } = require("discord.js");
const fs = require('fs');
const play = require("play-dl")
const ytSearch = require("yt-search");
const { joinVoiceChannel, createAudioPlayer, AudioPlayer, getVoiceConnection, createAudioResource, StreamType, PlayerSubscription, generateDependencyReport, NoSubscriberBehavior } = require('@discordjs/voice');
module.exports = {
    name: "play",
    description: "join and play video from user source",
    async execute(message, args) {
        if (!args.length) {
            return message.channel.send("No source provided!");
        }
        const audioplayer = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            }
        });
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if (video) {
            const stream = await play.stream(video.url);
            const resource = createAudioResource(stream.stream, {
                inputType: StreamType.Arbitrary,
           });
            audioplayer.play(resource);
            await message.reply(`Now Playing ***${video.title}***`);
        } else {
            message.channel.send("No results found");
        }
        connection.subscribe(audioplayer);
    }
} 