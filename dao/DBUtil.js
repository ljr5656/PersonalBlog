var mysql = require("mysql");
//连接数据库
function createConnection() {
    var connection = mysql.createConnection({
        host: "192.168.0.105",
        port: "3306",
        user: "root",
        password: "l19980305",
        database: "my_blog"
    })
    return connection
}

module.exports.createConnection = createConnection;
