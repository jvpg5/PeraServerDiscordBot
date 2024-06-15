const { hyperlink, SlashCommandBuilder } = require("discord.js");
const RetornaIp = require("../../lib/getip.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverip")
        .setDescription("Responde com o Ip do server"),
    async execute(interaction) {
        const ipAddress = await RetornaIp();
        const jellyfin = hyperlink("JellyFinn", `http://${ipAddress}:8096`);
        const alist = hyperlink("AList", `http://${ipAddress}:5244`);
        const filebrowser = hyperlink("AList", `http://${ipAddress}:10180`);
        await interaction.reply(`O IP do servidor é ${ipAddress}\n 🎬 - Para Filmes use o ${jellyfin}\n 💾 - Para os arquivos use ${alist} ou ${filebrowser}`);
    }
}