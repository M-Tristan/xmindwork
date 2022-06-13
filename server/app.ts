import Koa from 'koa'
import route from './route'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
import errorHandler from './middleware/errorHandler';
const app = new Koa();
app.use(cors());
app.use(bodyParser());
errorHandler(app)
app.use(route.routes())

app.listen(5000, () => {
    console.log('服务启动成功')
});