const { ButtonInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');


module.exports = {
    name: "delete-ticket-button",
    async runInteraction(client, interaction) {
        const guild = client.guilds.cache.get(interaction.guildId);
            const chan = guild.channels.cache.get(interaction.channelId);
        
            chan.edit({
              permissionOverwrites: [
                {
                  id: (process.env.ROLE_SUPPORT),
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: interaction.guild.id,
                  deny: ['VIEW_CHANNEL'],
                },
              ],
            })
              interaction.reply({
                content: 'Sauvegarde des messages...'
              });
        
              chan.messages.fetch().then(async (messages) => {
                let a = messages.filter(m => m.author.bot !== true).map(m =>
                  `${new Date(m.createdTimestamp).toLocaleString('fr-FR')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
                ).reverse().join('\n');
                if (a.length < 1) a = "Nothing"
                var paste = new PrivateBinClient("https://privatebin.net/");
                var result = await paste.uploadContent(a, {uploadFormat: 'markdown'})
                    const embed = new MessageEmbed()
                      .setAuthor({name: 'Logs Ticket'})
                      .setDescription(`:id: Ticket ID : \n \`${chan.id}\` \n| :open_file_folder: Logs: \n [**Cliquez ici pour voir les logs**](${getPasteUrl(result)})`)
                      .setColor('2f3136')
                      .setFooter({text: "Les logs de ce ticket seront supprimé dans 6 jours !"})
                      .setTimestamp();
        
                    const embed2 = new MessageEmbed()
                      .setAuthor({name: 'Logs Ticket', iconURL: 'https://cdn.discordapp.com/attachments/922138253170204683/1021110103790866502/logo_black.png'})
                      .setDescription(`📰 Logs du ticket \`${chan.id}\`: [**Cliquez ici pour voir les logs**](${getPasteUrl(result)})`)
                      .setColor('2f3136')
                      .setFooter({text: "Les logs de ce ticket seront supprimé dans 6 jours !"})
                      .setTimestamp();
        
                    client.channels.cache.get(process.env.LOGS_TICKET).send({
                      embeds: [embed]
                    }).catch(() => console.log("Le salon log ticket n'as pas été trouvé."));
                    chan.send('Suppression du salon...');
        
                    setTimeout(() => {
                      chan.delete();
                    }, 5000);
                });
    },
};