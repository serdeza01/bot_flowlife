module.exports = {
  name: "refuse-button",
  async runInteraction(client, interaction) {
    try {
      await interaction.member.send("Tu n'as pas accepté les règles, du coup je t'ai kick! Voici le lien du serveur :\n\n https://discord.gg/tcJPA4rD8z");
    } catch(e) {
      await interaction.reply(`Le membre ${interaction.member.displayName} n'a pas accepté les règles, je l'ai kick!`);
    }

    await interaction.member.kick("Il n'a pas accepté les règles!");
  }
};
