const authRouter = require('./routers/auth')
const cityRouter = require('./routers/city')
const articleRouter = require('./routers/article')

module.exports = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/city', cityRouter)
    app.use('/api/article', articleRouter)

    app.get('*', (req, res) => {
        res.status(404).send({
            message: 'Not Found!'
        })
    })
}
