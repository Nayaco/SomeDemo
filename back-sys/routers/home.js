'use strict'

const Home = async(ctx, next)=>{
    ctx.setStaus(302)
    ctx.redirect('/index.html')
    await next()
}

module.exports = {
    '/': Home,
}