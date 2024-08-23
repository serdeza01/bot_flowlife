const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const button = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('accept-button')
            .setLabel('Accepter')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('refuse-button')
            .setLabel('Refuser')
            .setStyle('DANGER')
    )
const welcomeEmbed = new MessageEmbed()
        .setTitle("Règlement du serveur")
        .setDescription("REGLEMENT DISCORD FLOW LIFE\n\n1 : Pseudonyme :\n\nVotre pseudonyme et votre avatar sur Discord :\n\n- Ne doit pas avoir de caractère pornographique.\n\n- Ne doit pas pouvoir être confondu/ressemblant avec/à celui d'un membre du staff.\n\n- Ne doit pas contenir de propos racistes, homophobes, sexistes ou faire référence à la drogue.\n\n2 : Règles de vivre ensemble :\n\n- Ne pas insulter.\n\n- Être respectueux, courtois, poli envers les utilisateurs et le staff. <Bonjour>, <Merci>, <Au revoir> ne mangent pas de pain, vous pouvez être plus familier également, on est pas au travail non plus.\n\n- Ne dévoilez sous aucun prétexte vos informations de compte, même à un membre du staff ! \n\nLa confiance c'est bien mais nous ne savons pas quel bestiaux regorge Internet\n\n3 : Sanctions :\n\nLes sanctions peuvent varier selon la gravité de la faute.\n\n- Un ticket ouvert pour rien sera puni par un warn\n\n- Les insultes sont punies par un ban temporaire ou définitif.\n\n- Les pseudonymes <non-conventionnels> sont changé par <Nom et Prénom RP ?> et doivent changer dans la semainequi suit et se joindre aux conformités du serveur. Après 1 semaine kick ou ban (si il y a eu récidive)\n\n- L'usurpation d'identité d'un membre du staff, avec ou sans intention de nuire, se verra immédiatement sanctionnée d'un ban de 7 jours du Discord.\n\n- En cas de récidive des sanctions, le staff se réserve le droit d'alourdir les sanctions.\n\nPing\n\nVous n'avez le droit de ping le staff ou haut staff seulement si c'est urgent, autrement il est interdit de faire cela sous peine de se prendre un warn.\n\nLe force ping\n\nLe force ping est le fait de ping une personne ou un groupe de personne plusieurs fois et effacer les ping afin d'en avoir qu'un seul. Cette acte est formellement interdit et sera passable d'un ban de 2j du discord si il ya plus de deux ping.\n\nBon jeu à tous et veillez à  respecter ces règles pour la bienséance de tout le monde")
        .setFooter({ text : "Bienvenue sur le serveur Flow Life !" })
        .setTimestamp()
module.exports = {
    name: "welcome",
    category: "utils",
    permissions: ["SEND_MESSAGES"],
    ownerOnly: false,
    usage: "welcome",
    examples: ["welcome"],
    description: "Permet d'envoyer l'embed des règles",
    async run(client, message, args) {
        await message.channel.send({ embeds : [welcomeEmbed], components: [button] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({ embeds : [welcomeEmbed], components: [button] });
    },
};