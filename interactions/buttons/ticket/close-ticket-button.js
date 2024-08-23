const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "close-ticket-button",
    async runInteraction(client, interaction) {
        const embed2 = new MessageEmbed()
            .setColor('6d6ee8')
            .setDescription("Es-tu sûr de vouloir fermer le ticket ?")
        const row2 = new MessageActionRow()
            .addComponents(new MessageButton()
            .setCustomId('delete-ticket-button')
            .setLabel('Oui, j\'en suis sûr')
            .setEmoji('🗑️')
            .setStyle('DANGER')
        )
        .addComponents(new MessageButton()
        .setCustomId('no-ticket-button')
        .setLabel('Non, je ne veux plus')
        .setEmoji('❌')
        .setStyle('SECONDARY')
        )
        interaction.channel.send({
            embeds: [embed2],
            components: [row2],
        });
    },
};