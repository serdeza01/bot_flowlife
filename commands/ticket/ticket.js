const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const button = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('assistance-g-button')
            .setLabel('Assistance générale')
            .setStyle("SUCCESS"),
        new MessageButton()
            .setCustomId('bug-report-button')
            .setLabel('Report de bug')
            .setStyle('SECONDARY'),
        new MessageButton()
            .setCustomId('sanction-button')
            .setLabel('Sanction')
            .setStyle('DANGER'),
        new MessageButton()
            .setCustomId('haut-staff-button')
            .setLabel('Parler à un haut staff')
            .setStyle('PRIMARY')
    )
const ticketEmbed = new MessageEmbed()
        .setTitle("Ticker Flow Life")
        .setDescription("Merci de bien choisir la catégorie qui convient à votre ticket")
        .setFooter({ text : "Support Flow Life" })
        .setTimestamp()

module.exports = {
    name: "ticket",
    category: "ticket",
    permissions: ["ADMINISTRATOR"],
    ownerOnly: false,
    usage: "ticket",
    examples: ["ticket"],
    description: "Permet d'envoyer l'embed des tickets",
    async run(client, message, args) {
        await message.channel.send({ embed : [ticketEmbed], components: [button] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ embed : [ticketEmbed], components: [button] });
    },
};