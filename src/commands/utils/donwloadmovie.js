const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const scrapeList = require("../../lib/limeScrape/scrapeList.js");
const scrapeMagnet = require("../../lib/limeScrape/scrapeMagnet.js");
const login = require("../../lib/qBitTorrent/login.js");
const addTorrent = require("../../lib/qBitTorrent/addTorrent.js");

const emojiNumbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

function movieListMaker(list, more) {
  //more é um numero que indica quantas vezes o usuario clicou em ver mais
  let str = `Lista de opções para baixar(${more + 1} de 7):\n\n`;
  const startMovie = more * 5;
  for (let i = startMovie; i < list.length; i++) {
    if (i >= 5 + startMovie) break;
    str += `${emojiNumbers[i - startMovie]}º opção:\n${
      list[i].title
    }\nTamanho:${list[i].size} | Seed:${list[i].seed}\n\n`;
  }
  return str;
}

const options = [
  new StringSelectMenuOptionBuilder()
    .setLabel("Primeira opção")
    .setValue("1")
    .setEmoji(emojiNumbers[0]),
  new StringSelectMenuOptionBuilder()
    .setLabel("Segunda opção")
    .setValue("2")
    .setEmoji(emojiNumbers[1]),
  new StringSelectMenuOptionBuilder()
    .setLabel("Terceira Opção")
    .setValue("3")
    .setEmoji(emojiNumbers[2]),
  new StringSelectMenuOptionBuilder()
    .setLabel("Quarta Opção")
    .setValue("4")
    .setEmoji(emojiNumbers[3]),
  new StringSelectMenuOptionBuilder()
    .setLabel("Quinta Opção")
    .setValue("5")
    .setEmoji(emojiNumbers[4]),
  new StringSelectMenuOptionBuilder()
    .setLabel("Ver mais opções")
    .setValue("more")
    .setDescription(
      "Ver mais 5 opções de download(Pode Fazer isso apenas 8 vezes"
    )
    .setEmoji("🔎"),
  new StringSelectMenuOptionBuilder()
    .setLabel("Cancelar")
    .setValue("cancel")
    .setDescription("Cancelar e parar")
    .setEmoji("❌"),
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("downloadmovie")
    .setDescription(
      "É pra fazer download no servidor o filme que o usuario escolheu"
    )
    .addStringOption((option) =>
      option
        .setName("movie")
        .setDescription("Nome do filme e data de lançamento")
        .setRequired(true)
    ),
  async execute(interaction) {
    const movie = interaction.options.getString("movie");
    const lista = await scrapeList(movie);
    const select = new StringSelectMenuBuilder()
      .setCustomId("chooseMovie")
      .setPlaceholder("Escolha uma opção de donwload")
      .addOptions(...options);
    const row = new ActionRowBuilder().addComponents(select);
    let more = 0;
    let movieListStr = movieListMaker(lista, more);

    let response = await interaction.reply({
      content: movieListStr,
      components: [row],
    });

    let movieIsChosen = false;
    let cancel = false
    let movieNum;

    let optionChosen;
    do {
      if (more > 7) {
        await response.edit({
          content: "Você já viu todas as opções",
          components: [],
        });
        break;
      }
      movieListStr = movieListMaker(lista, more);
      if (more > 0) {
        await optionChosen.update({
          content: movieListStr,
          components: [row],
        });
      }

      optionChosen = await response.awaitMessageComponent();

      if (optionChosen.customId === "chooseMovie") {
        if (optionChosen.values[0] === "more") {
          more++;
        } else if (optionChosen.values[0] === "cancel") {
          await optionChosen.update({
            content: "Operação cancelada",
            components: [],
          });
          cancel = true;
        } else {
          await optionChosen.reply({
            content: `Será feito o download do filme escolhido, ${
              lista[more * 5 + parseInt(optionChosen.values[0]) - 1].title
            }`,
            components: [],
          });
          movieNum = parseInt(optionChosen.values[0]);
          movieIsChosen = true;
        }
      }
    } while (!movieIsChosen && !cancel);
    if (movieIsChosen) {
      const magnet = await scrapeMagnet(lista[more * 5 + movieNum - 1].href);
      const cookies = await login();
      const responseTorrent = await addTorrent(cookies, magnet);

      if (responseTorrent.status === 200) {
        await interaction.followUp({
          content: "Download começou com sucesso!",
        });
      } else {
        await interaction.followUp({
          content: "Erro ao fazer download!",
        });
      }
    }
  },
};

//Deus me perdoe por essa bagunça de codigo e projeto que fiz, meu orgulho está divido entre o projeto funcionar e a vergonha de como ele está feito