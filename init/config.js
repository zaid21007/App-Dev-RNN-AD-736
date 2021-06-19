const config = require('config');
module.exports = function () {
  if (!config.get('jwtKey'))
    throw new Error(
      'Enviornment Variable Error: Enviornment Variables not Set'
    );
};
