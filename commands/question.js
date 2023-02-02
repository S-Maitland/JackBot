const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");
const { execute } = require("./ping");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("question")
    .setDescription("Confide in Father Jack")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("This will be your question to Father Jack")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;

    const question = options.getString("question");
    const choice = [
      "DRINK!",
      "FECK!",
      "FECK OFF!",
      "ARSE!",
      "SHOWER OF BASTARDS!",
      "WHAT!",
      "KNICKERS!",
      "GOBSHITE!",
      "I LOVE MY BRICK!"
    ];

    const randomValue = Math.floor(Math.random() * choice.length);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🥃 Father Jack 🥃")
      .addFields({ name: "Question", value: `${question}`, inline: true });

    const embed2 = new EmbedBuilder()
      .setColor("Red")
      .setTitle("🥃 Father Jack 🥃")
      .addFields({ name: "Question", value: `${question}`, inline: true })
      .addFields({
        name: "Answer",
        value: `${choice[randomValue]}`,
        inline: true
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("button")
        .setLabel("Ask Father Jack!")
        .setStyle(ButtonStyle.Primary)
    );

    const msg = await interaction.reply({
      embeds: [embed],
      components: [button]
    });

    const collector = msg.createMessageComponentCollector();

    collector.on("collect", async (i) => {
      if (i.customId == "button") {
        i.update({ embeds: [embed2], components: [] });
      }
    });
  }
};
