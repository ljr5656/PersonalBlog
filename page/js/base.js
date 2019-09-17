var randomTag = new Vue({
    el: '#random_tags',
    data: {
        tags:[]
    },
    computed:{
        randomColor: function () {
            return function () {
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return "rgb("+ red +","+ green +","+ blue +")";
            }
        },
        randomSize: function () {
            return function () {
                var size = (Math.random() * 20 + 12) + 'px';
                return size
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function(resp) {
            var result = [];
            for(var i = 0; i < resp.data.data.length; i++) {
                result.push({text:resp.data.data[i].tag, link:"/?tag=" + resp.data.data[i].tag});
            }
            randomTag.tags = result;
        })
    },
})


var newHot = new Vue({
    el: '#new_hot',
    data: {
        hots: []
    },
    computed: {

    },
    created: function() {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function(resp) {
            var result = [];
            for(var i = 0; i < resp.data.data.length; i++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.hots = result;
        })
    }
})


var newComment = new Vue({
    el: '#new_comments',
    data: {
        lists: []
    },
    computed: {

    },
    created: function() {
        axios({
            method: "get",
            url: "/queryNewComment"
        }).then(function(resp) {
            var result = [];
            for(var i = 0; i < resp.data.data.length; i++) {
                var temp = {};
                temp.username = resp.data.data[i].user_name || "匿名用户";
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments || "未知评论";
                result.push(temp);
            }
            newComment.lists = result;
        })
    }
})