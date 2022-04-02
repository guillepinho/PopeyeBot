/* eslint-disable no-unused-vars */
// Req
require('dotenv').config();
const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const roleClaim = require('./commands/role-claim');

// Criando o Client e Intenções
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.DIRECT_MESSAGES
    ],
    partials: ['CHANNEL']
});

// Login do Bot
client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
	console.log(`Sucesso no login: "${client.user.tag}" às ${Date(Date.now())}!`);
    client.user.setActivity('🏈', { type: 'WATCHING' });

    roleClaim(client);
});

// Coleção de Comandos
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// Mensagem de Entrada
client.on('guildMemberAdd', async member => {
    member.roles.add(member.guild.roles.cache.find(role => role.id === '870073931833425960'));

    const canal = member.guild.channels.cache.get('851146663719337984');

    const ola = new MessageEmbed()
    .setColor('#3498DB')
    .setTitle('BEM-VINDO AO RECIFE MARINERS!')
    .setThumbnail('https://i.imgur.com/RPVf4bj.png')
    .addFields(
        { name: 'Para se registrar', value: 'Clica aqui: <#851147334465093653> e você vai ser direcionado direto para pegar os cargos.' },
        { name: 'Tá com dúvida?', value: 'Procure um dos administradores do canal!' },
        );

    canal.send(`<@!${member.user.id}>`);
    canal.send({ embeds: [ola] });
});

// Prefixo
const prefix = '!';

// Comandos
client.on('messageCreate', (message) => {
    if (message.guild === null && !message.author.bot) {
        message.channel.send('Eu sou apenas um bot e está é uma mensagem automática. Se tiver dúvidas, favor entre em contato com os administradores.');
        return;
    }

    if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.content.includes('@here') ||
    message.content.includes('@everyone')) {
        return;
    }

    const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
    const command = args.shift().toLowerCase();

    // Comandos gerais
    if (command === 'ping') {
        client.commands.get('ping').execute(message);
    }
    // Comandos de Administração
    else if (command === 'clear') {
        client.commands.get('clear').execute(message, args);
        message.delete();
    }
    else if (command === 'fala') {
        client.commands.get('fala').execute(message, args);
    }
    else {
    // Erro Comando Desconhecido
        message.reply('Opa, não conheço esse comando...');
    }
});
