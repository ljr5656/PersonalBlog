var dbutil = require("./DBUtil");

function insertComment (blogId, parent, parentName, userName, comments, email, ctime, utime, success) {
    var insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `comments`, `email`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [blogId, parent, parentName, userName, comments, email, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, result) {
        if (err == null) {
            success(result);
        }else {
            console.log(err)
        }
    });
    connection.end();
}

function queryComment (blogId, success) {
    var querySql = "select * from comments where blog_id = ?;";
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, result) {
        if (err == null) {
            success(result);
        }else {
            console.log(err)
        }
    });
    connection.end();
}

function queryNewComment(size, success) {
    var querySql = "select * from comments order by id desc limit ?;";
    var params = [size];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, result) {
        if (err == null) {
            success(result);
        }else {
            console.log(err);
        }
    });
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryComment = queryComment;
module.exports.queryNewComment = queryNewComment;