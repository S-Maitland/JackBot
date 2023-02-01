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
    .setName("8ball")
    .setDescription("Ask the magic 8ball a question!")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("This will be your question for the magic 8ball")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options } = interaction;

    const question = options.getString("question");
    const choice = [
      "🎱 | As I see it, yes",
      "🎱 | Ask again later",
      "🎱 | Better not tell you now",
      "🎱 | Cannot predict now",
      "🎱 | Concentrate and ask again",
      "🎱 | Don’t count on it",
      "🎱 | It is certain",
      "🎱 | It is decidedly so",
      "🎱 | Most likely",
      "🎱 | My reply is no",
      "🎱 | My sources say no",
      "🎱 | Outlook good",
      "🎱 | Outlook not so good",
      "🎱 | Reply hazy try again",
      "🎱 | Signs point to yes",
      "🎱 | Very doubtful",
      "🎱 | Without a doubt",
      "🎱 | Yes",
      "🎱 | Yes, definitely",
      "🎱 | You may rely on it"
    ];

    const ball = Math.floor(Math.random() * choice.length);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🎱 | Does the 8-ball know?")
      .addFields({ name: "Question", value: `${question}`, inline: true });

    const embed2 = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("🎱 | Does the 8-ball know?")
      .addFields({ name: "Question", value: `${question}`, inline: true })
      .addFields({ name: "Answer", value: `${choice[ball]}`, inline: true });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("button")
        .setLabel("🎱 | Roll the ball!")
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
