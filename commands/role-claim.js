/* eslint-disable no-shadow */
const firstMessage = require ('./first-message');

module.exports = client => {
    const channelID = '851147334465093653';

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName);

    const emojis = {
        principal: 'Principal',
        desenvolvimento: 'Desenvolvimento',
        WR: 'WR',
        QB: 'QB',
        TE: 'TE',
        RB: 'RB',
        OL: 'OL',
        DB: 'DB',
        DL: 'DL',
        LB: 'LB',
        ST: 'ST'
    };

    const reactions = [];

    let emojiText = '**CARGOS**\nClique no símbolo ao __fim da mensagem__, correspondente com sua __posição__ e de qual __time__ você está: \n**Exemplo**: _Sou do time de desenvolvimento e jogo de QB. Devo clicar na âncora branca e no quadrado de QB._\n\n';

    for (const key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        const role = emojis[key];
        emojiText += `${emoji} > ${role}\n`;
    }

    firstMessage(client, channelID, emojiText, reactions);

const handleReaction = (reaction, user, add) => {
    if (user.id === '956183701874696192') {
        return;
    }

    const emoji = reaction._emoji.name;

    const { guild } = reaction.message;
    const roleName = emojis[emoji];
    if (!roleName) {
        return;
    }

    const role = guild.roles.cache.find(role => role.name === roleName);
    const member = guild.members.cache.find(member => member.id === user.id);

    if (add) {
        member.roles.add(role);
    }
    else {
        member.roles.remove(role);
    }
};

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, true);
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handleReaction(reaction, user, false);
        }
    });
};