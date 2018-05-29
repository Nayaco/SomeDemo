'use strict'
const Home = require('./home')
const DH = require('./DataHandler')

const AppGet = (router)=>{
    router.get('/', Home['/'])
    router.get('/list', DH['/list'])
    router.get('/delete', DH['/delete'])
    router.get('/getinfo', DH['/getinfo'])
}

const AppPost = (router)=>{
    router.post('/insert', DH['/insert'])
    router.post('/edit', DH['/edit'])
    router.post('/filter', DH['/filter'])
}


module.exports = {
    ADDROUTES: (router)=>{
        AppGet(router)
        AppPost(router)
        return router.routes()
    },
    LIST: {
        GET: {
            Home: '/',
            List: '/list',
            Delete: '/delete',
            GetInfo: '/getinfo',
        },
        POST: {
            Insert: '/insert',
            Edit: '/edit',
            Filter: '/filter',
        },
    },
}

