const koa = require('koa')

const app = new koa()

const path = require('path')

const static = require('koa-static') // 处理静态资源

const bodyparser = require('koa-bodyparser') //处理post请求传递参数

const router = require('koa-router')() // 路由

const query = require('./db/query')

app.use(router.routes())
app.use(router.allowedMethods())

app.use(bodyparser())

app.use(static(path.join(process.cwd(), 'public')))

router.get('/api/list', async ctx => {
    let data = await query('select * from userlist')
    ctx.body = data
})



app.listen(process.env.PORT || 3000, () => {
    console.log('服务启动成功')
})