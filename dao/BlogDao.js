var dbutil = require("./DBUtil");

function addViews (id, success) {
    var querySql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
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

function queryHotBlog(size, success) {
    var querySql = "select * from blog order by views desc limit ?;";
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

function queryAllBlog (success) {
    var querySql = "select * from blog order by id desc;";
    var params = [];
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

function insertBlog (title, content, views, tags, ctime, utime, success) {
    var insertSql = "insert into blog (`title`, `content`, `views`, `tags`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    var params = [title, content, views, tags, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, result) {
        // console.log(err,result)
        if (err == null) {
            success(result);
        }else {
            console.log(err)
        }
    });
    connection.end();
}

function queryBlogByPage (page, pageSize, success) {
    // console.log(page,pageSize);
    var insertSql = "select * from blog order by id desc limit ?,?;";
    var params = [page * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(err, result) {
        // console.log(err,result)
        if (err == null) {
            success(result);
        }else {
            console.log(err);
        }
    });
    connection.end();
}

function queryBlogById (id,success) {
    var querySql = "select * from blog where id = ?;";
    var params = [id];
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

function queryBlogCount (success) {
    // console.log(page,pageSize);
    var querySql = "select count(1) as count from blog";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(err, result) {
        // console.log(err,result)
        if (err == null) {
            success(result);
        }else {
            console.log(err);
        }
    });
    connection.end();
}



module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById =  queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
