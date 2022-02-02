const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: "leave",
    description: "causes the bot to leave the voice channel",
    async execute(message, args) {
        const voiceChannel = getVoiceConnection(message.guild.id);

        await voiceChannel.destroy();
    }
} 