const middleware = {}

middleware['auth'] = require('../middleware/auth.js');
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['non-auth'] = require('../middleware/non-auth.js');
middleware['non-auth'] = middleware['non-auth'].default || middleware['non-auth']

export default middleware
