const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./ping");

async function tellJoke() {
  let response = await fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });
  let data = await response.json();
  console.log(data.joke);
  return await data.joke;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tell me a random joke"),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const jokeResponse = await tellJoke();
    await interaction.followUp({
      content: `${jokeResponse}`,
      ephemeral: true
    });
  }
};
