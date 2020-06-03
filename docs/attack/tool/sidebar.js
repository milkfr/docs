module.exports = [
    {
        title: "攻防工具",   // 必要的
        path: "/attack/tool",      // 可选的, 应该是一个绝对路径
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
            { title: "README", path: "/attack/tool/"},
            { title: "nmap", path: "/attack/tool/nmap"},
        ]
    },
]
