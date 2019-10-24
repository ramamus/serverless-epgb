const db = require('./db_connect');

module.exports.getAllPlayers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll('player')
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Players: ' + e
      });
    });
};

module.exports.createPlayer = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.insert('player', data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not create Player ' + e
      });
    });
};

module.exports.deletePlayer = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  db.deleteById('player', event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: 'Player Deleted!'
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not delete Player ' + e
      });
    });
};

module.exports.updatePlayer = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  db.updateById('player', event.pathParameters.id, data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not update Player ' + e
      });
    });
};

module.exports.getPlayer = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getById('player', event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not find Player: ' + e
      });
    });
};
