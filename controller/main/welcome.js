const GetIp =require("../../config/getIp");
// const Model =require("../../model");
const Os =require("os");
const path =require("path");
exports.page = async ctx => {
    //域名和端口获取
    var host = ctx.host.split(":"),
        url = host[0],
        port;
    if (host[1]) {
        port = host[1];
    }
    else {
        port = 80;
    }
    await ctx.render("welcome", {
        hostName: Os.hostname(),
        clientIp: GetIp.getClientIp(ctx.req),
        ip: GetIp.getIPAdress(),
        url: url,
        port: port,
        catalog:path.join(__dirname,"../../"),
        version:process.version,
        newTime:new Date().toLocaleString(),
        platform:Os.type(),
        cpus:Os.cpus(),
        freemem:(Os.freemem()/1024/1024).toFixed(2),
        memoryUsage:(process.memoryUsage().heapUsed/1024).toFixed(2)
    });
};