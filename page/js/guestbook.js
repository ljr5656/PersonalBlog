var sendComment = new Vue({
    el: "#send_comment",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                })
            }
        },
        sendComment: function () {
            var code = document.getElementById("comment_code").value;
            if (code.toLowerCase() != sendComment.rightCode.toLowerCase()) {
                alert("验证码错误！！！");
                return function () {
                    console.log("验证码错误")
                };
            }
            alert("评论成功！！！");
            return function () {
                var bid = -2;
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var content = document.getElementById("comment_content").value;
                var email = document.getElementById("comment_email").value;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&parentName=" + replyName + "&userName=" + name + "&email=" + email + "&content=" + content
                }).then(function (resp) {
                    console.log(resp);
                })
            }

        }
    },
    created: function () {
        this.changeCode();
    }
})

var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 100,
        comments: []
    },
    computed: {
        reply: function() {
            return function(commentId, userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        } 
    },
    created: function () {
        var bid = -2;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(function (resp){
            console.log(resp)
            blogComments.comments = resp.data.data;
            blogComments.total = resp.data.data.length;
            for (var i = 0; i < blogComments.comments.length; i++) {
                if (blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        })
    }
})