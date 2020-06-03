module.exports = [
    {
        title: "基础知识",   // 必要的
        path: "/java/basic",      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
            { title: "知识图谱", path: "/java/basic/"},
            { title: "面向对象", path: "/java/basic/oop"},
            { title: "数据类型", path: "/java/basic/datatype"},
            { title: "关键字", path: "/java/basic/key"},
            { title: "异常", path: "/java/basic/exception"},
            { title: "反射", path: "/java/basic/reflection"},
            { title: "泛型", path: "/java/basic/genericity"},
            { title: "注解", path: "/java/basic/annotation"},
        ]
    },
]
