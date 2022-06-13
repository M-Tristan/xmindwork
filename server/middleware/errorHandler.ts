const errorHandler = (app: { use: (arg0: (ctx: { status: number; response: { status: number; }; }, next: () => any) => Promise<void>) => void; }) => {
    app.use(async (ctx: { status: number; response: { status: number; }; }, next: () => any) => {
        let status = 0;
        let fileName = "";
        try {
            await next();
            status = ctx.status;
        } catch (err) {
            console.error(err)
            status = 500;
        }
        ctx.response.status = status;

    });
}

export default errorHandler