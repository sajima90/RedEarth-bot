const { MessageEmbed } = require("discord.js");


module.exports = {
    name: "ping",
    category: "utils",
    permissions: ["SEND_MESSAGES"],
    ownerOnly: false,
    usage: "ping",
    examples: ["ping"],
    description: "La commande ping renvoie la latence du bot et de l'API",
    run: async (client, message, args) => {
        const tryPong = await message.reply({
            content: "On essaye de pong... un instant!",
            fetchReply: true,
        });

        const embed = new MessageEmbed()
            .setTitle("Pong! 🏓")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: "Latence API",
                    value: `\`\`\`${client.ws.ping}ms\`\`\``,
                    inline: true,
                },
                {
                    name: "Latence BOT",
                    value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp
                        }ms\`\`\``,
                    inline: true,
                },
                {
                    name: "Uptime",
                    value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({
                text: message.author.username,
                iconURL: message.author.displayAvatarURL(),
            });
        tryPong.delete()
        message.channel.send({ content: " ", embeds: [embed] });


    },
    runSlash: async (client, interaction) => {
        const tryPong = await interaction.reply({
            content: "On essaye de pong... un instant!",
            fetchReply: true,
        });

        const embed = new MessageEmbed()
            .setTitle("Pong! 🏓")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: "Latence API",
                    value: `\`\`\`${client.ws.ping}ms\`\`\``,
                    inline: true,
                },
                {
                    name: "Latence BOT",
                    value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp
                        }ms\`\`\``,
                    inline: true,
                },
                {
                    name: "Uptime",
                    value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`,
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({
                text: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL(),
            });

        interaction.editReply({ content: " ", embeds: [embed] });
    }
}