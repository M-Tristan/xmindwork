import koaRouter from 'koa-router'
import { addBill, getBill, getCategories } from '../controller/modelController';

var router = new koaRouter();
router.get("/", function (ctx) {
    ctx.response.body = 'hello index';
});
router.get("/getbill", function (ctx) {
    ctx.response.body = getBill();
});
router.get("/getCategories", function (ctx) {
    ctx.response.body = getCategories();
});
router.post("/addBill", function (ctx) {
    var body = ctx.request.body;
    addBill({
        amount: body.amount,
        category: body.category,
        type: body.type,
    });
    ctx.response.status = 200;
});

export default router