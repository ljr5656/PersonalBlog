var CommentDao = require("../dao/CommentDao");
var timeUtil = require("../util/timeUtil");
var respUtil = require("../util/respUtil");
var url = require("url");
var captcha = require("svg-captcha");

var path = new Map();


function queryNewComment(request, response ) {
    CommentDao.queryNewComment(5, function(result) {
        response.writeHead("200");
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}
path.set("/queryNewComment", queryNewComment);

function addComment(request, response) {
    var params = url.parse(request.url, true).query; 
    CommentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.content, params.email, timeUtil.getNow(), timeUtil.getNow(), function(result) {
        response.writeHead("200");
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    })
} 
path.set("/addComment", addComment);

function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead("200");
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
}

path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query; 
    CommentDao.queryComment(parseInt(params.bid), function(result) {
        response.writeHead("200");
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId);


module.exports.path = path;