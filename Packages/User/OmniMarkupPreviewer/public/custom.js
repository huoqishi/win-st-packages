$(function() {
    $.mytree = function() {
        // 生成目录数组
        var menuList = [] // 保存生成的目录结构数组
        var num = 1   // 表示h1, h2,h3...
        var count = 0 ; //
        // menuList
        function getMenu(menuList, $hs, num, nowIndex) {
            if (num > 6) {
                return
            }
            $hs.each(function(index, h) {
                var dataset_id = nowIndex + '.' + (index + 1)
                if(nowIndex === 0){dataset_id = 1}
                h.dataset.id = dataset_id
                var name = dataset_id + '.' + h.innerHTML
                h.innerHTML = '<span style="color:#FEA39D">'+ dataset_id +'. </span> '+ h.innerHTML
                var obj = { name: name, open: true, domid: dataset_id, children: [] }
                menuList.push(obj)
                    // 寻找下级标题，直到遇到大于等于当前标题的标签时停止寻找
                var selector = []
                for (var i = 0; i < num; i++) {
                    selector.push('h' + (i + 1))
                }
                var $hns = $(h).nextUntil(selector.join(','), 'h' + (num + 1))
                getMenu(obj.children, $hns, num + 1, dataset_id)
            })
        }
        getMenu(menuList, $('h1'), 1, 0)
        // 根据menuList生成 dom树
        // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
        var setting = {
            callback:{
                onClick: function (event,treeId,treeNode,clickFlag) {
                    console.log(treeNode)
                    document.querySelector('[data-id="'+treeNode.domid+'"]').scrollIntoView()
                }
            }};
        var zNodes = []
        // 这里为何要多此一举，哈哈~
        zNodes = JSON.parse(JSON.stringify(menuList))
            // zNodes = [{"name":"node 第二天","dom":{},"children":[{"name":"系统模块","dom":{},"children":[{"name":"os","dom":{},"children":[]},{"name":"path","dom":{},"children":[]},{"name":"fs","dom":{},"children":[]}]},{"name":"文件模块","dom":{},"children":[{"name":"用户模块","dom":{},"children":[]},{"name":"第三方模块","dom":{},"children":[]}]},{"name":"npm","dom":{},"children":[]},{"name":"http服务","dom":{},"children":[{"name":"域名端口前后端交互","dom":{},"children":[]},{"name":"搭建服务器","dom":{},"children":[]},{"name":"处理响应","dom":{},"children":[]},{"name":"处理请求","dom":{},"children":[{"name":"获取get请求参数","dom":{},"children":[]},{"name":"获取post请求的参数","dom":{},"children":[]}]}]}]},{"name":"测试","dom":{},"children":[{"name":"静态网站","dom":{},"children":[{"name":"关于路径","dom":{},"children":[]}]},{"name":"动态网站","dom":{},"children":[{"name":"路由","dom":{},"children":[]},{"name":"模板引擎","dom":{},"children":[]}]}]}]
        $.fn.zTree.init($("#menu"), setting, zNodes);
        // console.log()
        // console.log(zNodes)
    }
    $.mytree()
})
