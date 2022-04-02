module.exports = {
    name: 'fala',
    description: 'bot papagaio',
    async execute(message) {
        if (!message.member.roles.cache.has('839294177136476231')) {
            message.reply('Você não possui autorização para usar esse comando.');
            return;
        }
        else {
            const prefix = '!fala';
            const papagaio = message.content.slice(prefix.length).trim();
            await message.channel.send(papagaio);
        }
    }
};