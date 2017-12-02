var mongoConnectionString = process.env.MONGODB_URI;

var agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'user' } });

// or override the default collection name:
// var agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName'}});

// or pass additional connection options:
// var agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});

// or pass in an existing mongodb-native MongoClient instance
// var agenda = new Agenda({mongo: myMongoClient});

agenda.define('send subscription', function (job, done) {

    findUser = () => {
        var date = new Date();
        var current_hour = date.getHours();
        var current_minute = date.getMinutes();
        var receive_time = current_hour + ":" + current_minute
        return User.findOne({ receive_time })
            .then(data => data)
            .catch(err => {
                throw err;
            });
    };

    var bingsearch = (subscription) => {
        var options = {
            method: 'GET',
            json: true,
            headers: { "Content-Type": "application/json", "Ocp-Apim-Subscription-Key": constant.BING_COGNITIVE_KEYv5 },
            url: `https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=${subscription}&count=1`
        };
        //console.log(options);
        return request(options).then(res => {
            searchresult = randomarray(res.data.value);
            console.log(searchresult);
            paramObject.contentUrl = searchresult.contentUrl
            paramObject.title = searchresult.name
            paramObject.thumbnail = searchresult.thumbnailUrl
        }).catch(err => { throw err });
    }
    sendnews = (news) =>{

    }
    async function main() {
        try {
            const f = await findUser();
            if (f) {
               const g = await getnews(f.subscription[0]);
               const f = await sendnews(g);
                res.send(200, { data: f });
            } else {
                res.send(NOT_FOUND);
            }
        } catch (e) {
            res.send(SERVER_ERROR);
        }
    }
    main();
});

agenda.on('ready', function () {
    agenda.every('*/1 * * * *', 'send subscription');

    agenda.start();
});