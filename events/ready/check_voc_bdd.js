const {MessageEmbed} = require('discord.js')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        client.database.query('SELECT * FROM ' + client.config.MySQL.tables.VocalChannel, function(err,rslt){
    
            rslt.forEach(voc => {
                if(client.channels.resolve(voc.id_channel)){
                    let channel = client.channels.resolve(voc.id_channel)
                    if(channel.members.size === 0 ){
                        const name_chan = channel.name
                        channel.delete()
                            .then(client.database.query('DELETE FROM ' + client.config.MySQL.tables.VocalChannel + ' WHERE id_channel = ?', [voc.id_channel]), 
                            console.log(`${client.Func.LogDate()}Le salon ${name_chan} a été supprimé`.cyan))
                            const channel_logs = client.channels.cache.find(x => x.id == client.config.Discord.IDSalonServer.Logs)
                            const Embed = new MessageEmbed()
                                .setColor('#00FFFF')
                                .setTitle('Vocals Manager')
                                .setDescription(`Le salon ${name_chan} a été supprimé`)
                                .setTimestamp()
                            channel_logs.send({embeds: [Embed]})
                    }
                }
            })
        })
        console.log(`${client.Func.LogDate()}Vérification des channels vocaux terminée !`.inverse)
	},
};    
    
