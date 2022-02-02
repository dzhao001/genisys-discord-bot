const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: "join",
    description: "joins the voice channel the user is in",
    async execute(message, args) {
        await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
    }
} 