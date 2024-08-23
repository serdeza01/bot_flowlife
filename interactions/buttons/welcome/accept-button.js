module.exports = {
  name: "accept-button",
  async runInteraction(client, interaction) {
    await interaction.member.roles.add("861235368216887326");
    await interaction.member.roles.remove("880585325406195774");
    await interaction.reply({ content: "Vous avez accepté les règles! Vous pouvez maintenant accéder au serveur", ephemeral: true });
  }
};
