var router = require('express').Router();


var routes = {
    api : {
        index: require('./api/index')
    }
}

// list of api which is being exposed to slack
router.post('/api/listtodos', routes.api.index.listtodos);
router.post('/api/addTodo', routes.api.index.addTodo);
router.post('/api/markTodo', routes.api.index.markTodo);

module.exports = router;
