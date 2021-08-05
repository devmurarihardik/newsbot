const Bot = require('node-stockly');
const bot = new Bot.Client();
bot.login('E6vSf0mCVXaWk6x0PYpeQyYbdwFQ5D83', '870265213501302141');
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c30d74aad3i9gms5ocrg"
const finnhubClient = new finnhub.DefaultApi()



bot.on('open', () => {
    console.log('Bot connected to the server');
  });

bot.on('error', (error) => {
    console.log(error);
  });

bot.on('command', (command) => {
    const array = command.message.split(' ');
    if(array[1] === 'help'){
       bot.sendMessage('**Market new** \n \n EX - "m g/f/c/m" \n g-> general \n f-> forex \n c-> crypto \n m-> merger \n --------- **Compnay News** \n \n c [symbol]')
    }else if(array[1] === 'm' && array[2]){
        const type = array[2] === 'g' ? 'general' : array[2] === 'f' ? 'forex' : array[2] === 'c' ? 'crypto' : 'merger';
        finnhubClient.marketNews(type, {}, (error, data, response) => {
            if(data && data.length > 0){
                bot.sendMessage(`
                Category : ${data[0].category} \n Headline : ${data[0].headline} \n Summary  : ${data[0].summary}
                `)
                bot.sendMessage(`
                Category : ${data[1].category} \n Headline : ${data[1].headline} \n Summary  : ${data[1].summary}
                `)
            }
          });
    }
    else if(array[1] === 'c' && array[2] ){
        finnhubClient.companyNews("AAPL","2020-01-01", "2020-05-01", (error, data, response) => {
            console.log(data,'****')
            console.log(error,'****')
        });
    }else{
        bot.sendMessage('Invalid Command')
    }
  })    