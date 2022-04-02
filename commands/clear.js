module.exports = {
    name: 'clear',
    description: 'clear messages',
    async execute(message, args) {
        const numero = parseInt(args[0]);

        if (!message.member.roles.cache.has('839294177136476231')) {
            message.reply('Você não possui autorização para usar esse comando.');
            return;
            }
            else {

            if (!args[0]) {
                message.channel.send('Faltou informar quantas mensagens devo apagar');
            }
            else if (isNaN(numero)) {
                message.channel.send('A quantidade de mensagens deve ser escrita em número.');
            }
            else if (numero > 100) {
                message.channel.send('Não é possível apagar mais do que 100 mensagens por vez.');
            }
            else if (numero < 1) {
                message.channel.send('O número de mensagens deve ser pelo menos 1.');
            }
            else {
                await message.channel.messages.fetch({ limit: numero + 1 })
                .then(messages => { setTimeout(() => message.channel.bulkDelete(messages), 3000);});

                message.delete();
                message.channel.send(`_Apagando ${numero} mensagens. Essa mensagem também será apagada em 3 segundos!_`)
                .then(msg => { setTimeout(() => msg.delete(), 3000);});
            }
    }
    }
};