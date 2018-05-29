'use strict'

const Koa = require('koa')
const koaStatic = require('koa-static')
const formidable = require('koa2-formidable')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const Routers = require('./routers/index').ADDROUTES
const API = require('./routers/index').LIST
const AppConfig = require('./configs/App.config')
const App = new Koa()

App.use(async(ctx, next)=>{
    try{
        console.log(`Processing ${ctx.request.method} ${ctx.request.url}...`)  
        let start = new Date().getTime()
        let execTime
        await next()
        execTime = new Date().getTime() - start   
        ctx.res.setHeader('X-Response-Time', `${execTime}ms`)
        ctx.res.setHeader('Access-Control-Allow-Origin', '*')
    }catch(e){
        console.log(e)
        ctx.res.statusCode = e.statusCode || e.status || 500
        ctx.body = {
            err: 'Some Error Occurs, We Will Fix It Soon'
        }
    }
})

App.use(formidable())
App.use(bodyParser())
App.use(koaStatic(AppConfig.StaticPath))
App.use(Routers(router))

App.listen(AppConfig.ListenPort,()=>{
    console.log('API')
    for(let key in API.GET)console.log(`GET  ${API.GET[key]}`)
    for(let key in API.POST)console.log(`POST ${API.POST[key]}`)
    console.log(`Port on listening: ${AppConfig.ListenPort}`)
})
