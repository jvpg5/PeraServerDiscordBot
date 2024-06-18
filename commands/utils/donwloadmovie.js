const { SlashCommandBuilder } = require("discord.js");
const scrapeList = require("../../lib/scrapeList.js")

function movieListMaker(list){
    let str = "Lista de opções para baixar(apenas 5):\n\n";
    
    for(let i = 0; i < list.length; i++){
        if(i>=5) break;
        str += `${i+1}º opção:\n${list[i].title}\nTamanho:${list[i].size} | Seed:${list[i].seed}\n\n`
    }
    return str;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("downloadmovie")
        .setDescription("É pra fazer download no servidor o filme que o usuario escolheu")
        .addStringOption(option => 
            option.setName("movie")
                .setDescription("Nome do filme e data de lançamento")
                .setRequired(true)),
    async execute(interaction) {
        const movie = interaction.options.getString("movie");
        const lista = await scrapeList(movie);
        const movieListStr = movieListMaker(lista);
        await interaction.reply(movieListStr);
    }
}