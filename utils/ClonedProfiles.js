const axios = require("axios");
const Logger = require("./Logger");

function getClonedReadMe() {
  if(!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set in .env file");
  return axios.get("https://api.github.com/search/code?q=%3Ca+href%3D%22https%3A%2F%2Fgithub.com%2Fabyo%22%3E", { headers: { Authorization: `Token ${process.env.GITHUB_TOKEN}` } })
    .then((res) => res.data.items.filter((x) => x.repository.owner.login !== "abyo").map(x => x.repository.owner.login))
    .catch((err) => {
      console.log(err);
    });
}

function listAutomodRulesForGuild(guildId) {
  return axios.get(`https://discord.com/api/guilds/${guildId}/auto-moderation/rules`, { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` } });
}

function createAutomodRuleForGuild(guildId, rule) {
  return axios.post(`https://discord.com/api/guilds/${guildId}/auto-moderation/rules`, rule, { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}`, "Content-Type": "application/json" } });
}

function modifyAutomodRuleForGuild(guildId, ruleId, rule) {
  return axios.patch(`https://discord.com/api/guilds/${guildId}/auto-moderation/rules/${ruleId}`, rule, { headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` } });
}

module.exports = (client) => {
  client.updateBlockedUsers = async () => {
    try {
      const blockedUsers = await getClonedReadMe();
      const blockRegex = `github.com/(${blockedUsers.join("|")})\\S*`;
      const blockClonedProfilesRule = {
        name: "block-cloned-profiles",
        event_type: 1, // Emit on message
        trigger_type: 1, // Check keywords
        trigger_metadata: {
          regex_patterns: [blockRegex] //use custom regex to ban github link of stolen accounts
        },
        actions: [{
          type: 1,  // Block message
        }, {
          type: 2,  // Send alert to #hangout
          metadata: {
            channel_id: process.env.HANGOUT_CHANNEL
          }
        }],
        enabled: true,
        exempt_roles: [process.env.HELPER_ROLE, process.env.MODO_ROLE], // exempt helpers and mods
      };
      const automodRules = await listAutomodRulesForGuild(process.env.GUILD_ID);
      const existingRule = automodRules.data.find(x => x.name === blockClonedProfilesRule.name && x.creator_id === client.user.id);
      if (!existingRule) {
        Logger.info("Updating Automod rule");
        modifyAutomodRuleForGuild(process.env.GUILD_ID, existingRule.id, { trigger_metadata: { regex_patterns: [blockRegex] } });
      } else {
        Logger.info("Creating Automod rule");
        createAutomodRuleForGuild(process.env.GUILD_ID, JSON.stringify(blockClonedProfilesRule));
      }
    } catch (err) {
      Logger.error(err);
    }
  };
};
