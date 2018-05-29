'use strict'

const Config = require('../configs/App.config')

const Grabber = require('../lib/grabber')
const grabber = new Grabber(Config.MysqlConfig)

const Write = async(ctx, next)=>{
    const Data = ctx.request.body
    const res = await grabber.linsertdata(Config.Table, Data)
    ctx.res.statusCode = 200
    ctx.body = {
        status: 'OK',
    }
    await next()
}

const List = async(ctx, next)=>{
    const res = await grabber.lshowtable(Config.Table, true)
    ctx.res.statusCode = 200
    ctx.body = {
        status: 'OK',
        data: res,
    }
    await next()
}

const Delete = async(ctx, next)=>{
    const Data = ctx.request.query
    const res = await grabber.ldeletedata(Config.Table, 'name', Data.name)
    ctx.res.statusCode = 200
    ctx.body = {
        status: 'OK',
    }
    await next()
}

const Edit = async(ctx, next)=>{
    const Data = ctx.request.body
    const res = await grabber.lupdate(Config.Table, 'name', Data.name)
    ctx.res.statusCode = 200
    ctx.body = {
        status: 'OK',
    }
    await next() 
}

const GetInfo = async(ctx, next)=>{
    const Data = ctx.request.query
    const keys = Object.keys(Data)
    const res = await grabber.lgetdatabyID(Config.Table, '*', keys[0], Data[keys[0]])
    ctx.res.statusCode = 200
    ctx.body = {
        data: res,
        status: 'OK',
    }
    await next()
}

const Filter = async(ctx, next)=>{
    const Data = ctx.request.body
    const keys = Object.keys(Data)
    let _sqlO = '('
    let _numO = 0
    for(let i = 0; i < keys.length; i++){
        if(Data[keys[i]] != ''){
            _sqlO += `${_numO == 0?'' : ' OR '}${keys[i]}='${Data[keys[i]]}'`
            _numO ++
        }
    }
    _sqlO += ')'
    const _sql = `${_numO?'WHERE':''} ${_numO?_sqlO:''}`
    const res = await grabber.lgetdata(Config.Table, '*', _sql)
    ctx.res.statusCode = 200
    ctx.body = {
        data: res,
        status: 'OK',
    }
    await next()    
}

const Filterx = async(ctx, next)=>{
    const Data = ctx.request.body
    const keys = Object.keys(Data)
    let values = []
    for(let i = 0; i < keys.length; i++){
        values[i] = JSON.parse(Data[keys[i]])
    }
    let _sqlO = '('
    let _numO = 0
    let _sqlA = '('
    let _numA = 0
    for(let i = 0; i < keys.length; i++){
        if(values[i].key == 'OR'){
            _sqlO += `${_numO == 0?'' : ' OR '}${keys[i]}='${values[i].val}'`
            _numO ++
        }
        if(values[i].key == 'AND'){
            _sqlA += `${_numA == 0?'' : ' AND '}${keys[i]}='${values[i].val}'`
            _numA ++
        }
    }
    _sqlO += ')'
    _sqlA += ')'
    const _sql = `${_numO||_numA?'WHERE':''} ${_numO?_sqlO:''} ${_numO&&_numA?'AND':''} ${_numA?_sqlA:''}`
    const res = await grabber.lgetdata(Config.Table, '*', _sql)
    ctx.res.statusCode = 200
    ctx.body = {
        data: res,
        status: 'OK',
    }
    await next()    
} 
module.exports = {
    '/insert': Write,
    '/list': List,
    '/delete': Delete,
    '/edit': Edit,
    '/getinfo': GetInfo,
    '/filter': Filter,
}