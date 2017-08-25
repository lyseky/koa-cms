exports.page = async ctx => {
    await ctx.render("index", {
        userName: ctx.session.name
    });
};