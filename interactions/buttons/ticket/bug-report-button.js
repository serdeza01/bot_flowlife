const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "bug-report-button",
    async runInteraction(client, interaction) {
        await interaction.guild.channels.create("Report bug " + interaction.user, {
            parent: (process.env.PARENT_OPENED),
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ["VIEW_CHANNEL"]
          },
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL"]
          },
          {
            id: (process.env.ROLE_SUPPORT),
            allow: ["VIEW_CHANNEL"]
          }
        ]
      }).then(async channel => {
        const embed = new MessageEmbed()
          .setTitle('**Support Flow Life**')
          .setColor('6d6ee8')
          .setDescription(`Bonjour ${interaction.user} - ceci est une réponse automatique :\nMerci de nous communiquer de la manière la plus précise et complète possible votre plainte, problème ou question.\n\n• Explique nous ton problème en donnant **le plus de détails possible.**\n\n**COMMENT FORMULER UN TICKET PRÉCIS ?**\n• Expliquez de manière détaillée le problème rencontré.\n• Attachez un screenshot/vidéo si nécessaire.\n\nVous pouvez clôturer votre ticket à tout moment en cliquant sur le bouton 🔒\n\nMerci de patienter le temps qu'un membre de l'équipe soit en mesure de vous aider.`)
          .setFooter('Support Flow Life')
          .setTimestamp()
        const row = new MessageActionRow()
        .addComponents(new MessageButton()
          .setCustomId('close-ticket')
          .setLabel('Fermer le ticket')
          .setEmoji('🔒')
          .setStyle('DANGER')
        );
      const ping = channel.send(`${interaction.user}`)
      channel.send({
       components: [row], embeds: [embed]
      });
        });
        await interaction.reply({ content: `Ticket créé ! <#${channel.id}>`, ephemeral : true });
    },
};