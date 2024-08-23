const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "no-ticket-button",
    async runInteraction(client, interaction) {
        const embed3 = new MessageEmbed()
    .setColor('6d6ee8')
    .setDescription("Annulation de la fermeture du ticket")
      interaction.channel.send({
      embeds: [embed3],
      });
    },
};