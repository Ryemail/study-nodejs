const router = require("koa-router")();

router.prefix("/users");

router.all("/", function (ctx, next) {
    console.log(ctx.query);
    ctx.body = {
        name: "阮书垚",
        age: 25,
        sex: { value: 1, text: "男" },
    };
});

router.get("/bar", function (ctx, next) {
    ctx.body = "this is a users/bar response";
});

module.exports = router;
