var TagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var url = require("url");
var blogDao = require("../dao/BlogDao");
var respUtil = require("../util/respUtil");

var path = new Map();


function queryRandomTags(request, response) {
    TagsDao.queryAllTags(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead("200");
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}
path.set("/queryRandomTags", queryRandomTags);

function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    TagsDao.queryTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead("200");
            response.write(respUtil.writeResult("success", "添加成功", result));
            response.end();
        } else {
            tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {
                var blogList = [];
                for (var i = 0; i < result.length; i++) {
                    blogDao.queryBlogById(result[i].blog_id, function(result) {
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList, result.length, response);
            });
        } 
    });
}
path.set("/queryByTag", queryByTag);

function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    TagsDao.queryTag(params.tag, function (result) {
        tagBlogMappingDao.queryByTagCount(result[0].id, function(result) {
            response.writeHead("200");
            response.write(respUtil.writeResult("success", "添加成功", result));
            response.end();
        })
    });
}
path.set("/queryByTagCount", queryByTagCount);

function getResult(blogList, len, response) {
    if(blogList.length < len) {
        setTimeout(function() {
            getResult(blogList, len, response)
        }, 10);
    } else {
        for (var i = 0; i < blogList.length; i ++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/g, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,20}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead("200");
        response.write(respUtil.writeResult("success", "添加成功", blogList));
        response.end();
    }
}

module.exports.path = path;