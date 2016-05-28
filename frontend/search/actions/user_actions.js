const Reflux = require('reflux');


var UserActions = Reflux.createActions([
  "AddBookmark",
  "DeleteBookmark",
  "Trigger"
]);

module.exports = UserActions;
