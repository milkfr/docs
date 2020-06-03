module.exports = [
    {
        title: "刷题",   // 必要的
        path: "/problem/",      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
            { title: "leetcode", path: "/problem/leetcode/" },
            { title: "ctf", path: "/problem/ctf/" },
            { title: "oscp", path: "/problem/oscp/" },
        ]
    },
]
