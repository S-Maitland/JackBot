const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./ping");

// const jokeResponse = async () =>
//   fetch("https://icanhazdadjoke.com/", {
//     method: "GET",
//     headers: {
//       Accept: "application/json"
//     }
//   })
//     .then(function (response) {
//       if (response.ok) {
//         return response.json();
//       }

//       return Promise.reject(response);
//     })
//     .then(function (data) {
//       console.log(data.joke);
//       return data.joke;
//     })
//     .catch(function (err) {
//       console.warn("Something went wrong.", err);
//     });

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

const jokeResponse = tellJoke();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Tell me a random joke"),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.followUp({
      content: `${jokeResponse}`,
      ephemeral: true
    });
  }
};
