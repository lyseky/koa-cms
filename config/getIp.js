//获取客户端或者本服务IP地址
module.exports = {
    getClientIp(req) {
        return req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    },
    getIPAdress () {
        var interfaces = require("os").networkInterfaces();
        for (let devName in interfaces) {
            let iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
};