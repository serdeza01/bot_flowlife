const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
  id: String,
  logChannel: { type: String, default: "1015944969279778916" },
  modChannel: { type: String, default: "1015944969279778916" },
  users: { type: [], default: [] },
  faq: { type: [], default: [] },
});

module.exports = mongoose.model("Guild", guildSchema);
