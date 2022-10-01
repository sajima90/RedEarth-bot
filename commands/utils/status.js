const { MessageEmbed } = require("discord.js");
const Status = require("../../utils/StatusServer");

module.exports = {
    name: "status",
    category: "utils",
    permissions: ["SEND_MESSAGES"],
    ownerOnly: false,
    usage: "status",
    examples: ["status"],
    description: "La commande staus renvoie plusieurs informations sur le serveur Minecraft",
    run: async (client, message, args) => {
        let serverPing = await new Status(process.env.IP, process.env.PORT).getStatus();
        const serverStarted = new MessageEmbed()
        .setTitle("*Status des Serveurs :*")
        .addFields(
            {
                name: "__Nom du serveur Minecraft__ : ",
                value: `\`\`\`${serverPing.nameServer}\`\`\``,
                inline: true
            },
            {
                name: "Latence interne :",
                value: `\`\`\`${serverPing.ms} ms\`\`\``,
                inline: true,
            },
            {
                name: "Version :",
                value: `\`\`\`${serverPing.version}\`\`\``,
                inline: true
            },
            {
                name: "Nombre de Joueur connecté :",
                value: `\`\`\`${serverPing.playersConnect} / ${serverPing.playersMax}\`\`\``,
                inline: true
            },
            {
                name: "IP :",
                value: `\`\`\`${process.env.IP}:${process.env.PORT}\`\`\``,
                inline: true
            }
        )
        .addFields(
            {
                name: `__Nom du serveur Discord__ : `,
                    value: `\`\`\`${message.guild.name}\`\`\``,
                    inline: false
                },
                {
                    name: `Créateur : `,
                    value: `\`\`\`ID:${message.guild.ownerId}\`\`\``,
                    inline: false
                },
                {
                    name: "Nombre de Membres :",
                    value: `\`\`\`${message.guild.members.cache.size}\`\`\``,
                    inline: true
                },
                {
                    name: "Nombre de Salons :",
                    value: `\`\`\`${message.guild.channels.cache.size}\`\`\``,
                    inline: true
                },
                {
                    name: "Nombre de Rôles :",
                    value: `\`\`\`${message.guild.roles.cache.size}\`\`\``,
                    inline: true
                },
                {
                    name: "Crée le :",
                    value: `\`\`\`${message.guild.createdAt}\`\`\``,
                    inline: false
                }
            )
            .setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor("#f00020")
            .setTimestamp()
            .setFooter({
                text: message.author.username,
                iconURL: message.author.displayAvatarURL(),
            });

        message.channel.send({ content: " ", embeds: [serverStarted] });
    },
    runSlash: async (client, interaction) => {
        let serverPing = await new Status(process.env.IP, process.env.PORT).getStatus();
        const serverStarted = new MessageEmbed()
            .setTitle("*Status des Serveurs :*")
            .addFields(
                {
                    name: "__Nom du serveur Minecraft__ : ",
                    value: `\`\`\`${serverPing.nameServer}\`\`\``,
                    inline: true
                },
                {
                    name: "Latence interne :",
                    value: `\`\`\`${serverPing.ms} ms\`\`\``,
                    inline: true,
                },
                {
                    name: "Version :",
                    value: `\`\`\`${serverPing.version}\`\`\``,
                    inline: true
                },
                {
                    name: "Nombre de Joueur connecté :",
                    value: `\`\`\`${serverPing.playersConnect} / ${serverPing.playersMax}\`\`\``,
                    inline: true
                },
                {
                    name: "IP :",
                    value: `\`\`\`${process.env.IP}:${process.env.PORT}\`\`\``,
                    inline: true
                }
            )
            .addFields(
                {
                    name: `__Nom du serveur Discord__ : `,
                    value: `\`\`\`${interaction.guild.name}\`\`\``,
                    inline: false
                },
                {
                    name: `Créateur : `,
                    value: `\`\`\`ID:${interaction.guild.ownerId}\`\`\``,
                    inline: false
                },
                {
                    name: "Nombre de Membres :",
                    value: `\`\`\`${interaction.guild.members.cache.size}\`\`\``,
                    inline: true
                },
                {
                    name: "Nombre de Salons :",
                    value: `\`\`\`${interaction.guild.channels.cache.size}\`\`\``,
                    inline: true
                },
                {
                    name: "Nombre de Rôles :",
                    value: `\`\`\`${interaction.guild.roles.cache.size}\`\`\``,
                    inline: true
                },
                {
                    name: "Crée le :",
                    value: `\`\`\`${interaction.guild.createdAt}\`\`\``,
                    inline: false
                }
            )
            .setImage(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor("#f00020")
            .setTimestamp()
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            });
        interaction.reply({ content: " ", embeds: [serverStarted] });
    }
}