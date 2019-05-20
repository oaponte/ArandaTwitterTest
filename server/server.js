// librerias de terceros node para integracion con api twitter
const express = require('express');
const Twitter = require('twit');
const app = express();

// key y access de la app en twitter (la nombre oaponteArandaTest, con url falsa) 
const client = new Twitter({
  consumer_key: 'gs1iFhOKXM2S6aq4SpCURS0h9',
  consumer_secret: 'ODZWSezpLRToA3DBKn8aFTwCGQeDEN0lPT7ab9a4nicV1S9ma2',
  access_token: '125836171-aFJjE6aw6WuaoqV7fuHzwwFKdrQrbzUbsw3qZfWu',
  access_token_secret: 'wHjlSpwqfIASv4I0bUBVTS20iDlCF6siUC7QEUDDB8o8S'
});

app.use(require('cors')());
app.use(require('body-parser').json());

// authenticacion de usuario (sesion activa en twitter)
app.get('/api/user', (req, res) => {
  client
    .get('account/verify_credentials')
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});

// consulta de twits
app.get('/api/home/:searchByWord', (req, res) => {
    const params = { tweet_mode: 'extended', count: 20 };
    if (req.query.since) {
        params.since_id = req.query.since;
    }
  
    let searchByWord = req.params.searchByWord;
    let search = "'"+ searchByWord +" since:2018-01-01'";
  
    client
    .get(`search/tweets`, { q: ' "' + search + '" ', count: 20 }, function(err, data, response){
      res.send(data);
    })
    .catch(error => res.send(error));
  });

// test api
app.get('/api/test', (req, res) => {
      const params = { tweet_mode: 'extended', count: 20 };
      if (req.query.since) {
        params.since_id = req.query.since;
      }
      client
        .get(`search/tweets`, { q: 'deportes tolima since:2018-01-01', count: 20 })
        .then(timeline => {
          res.send(timeline);
        })
        .catch(error => res.send(error));
});


// like a twit
app.post('/api/favorite/:id', (req, res) => {
  const path = req.body.state ? 'create' : 'destroy';
  client
    .post(`favorites/${path}`, { id: req.params.id })
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.listen(3000, () => console.log('Server running!'));
