webpack v3 v4 的变化
webpack提取公共代码，核心功能optimization介绍

通过webpack打包提取公共代码
提取公共代码的必要性
网站都是由多个页面组成的，一般来说所有的页面采用的都是相同的技术栈，要么都是Vue，都是React，要么都是Angular，采用的技术是一致的，既然是一致的，就会有公共的代码，有很多代码是相同的，如果每个页面都将这些相同的公共代码包含进去，会引起一些问题。

相同的资源配重复加载，造成了资源的浪费，（最后的静态资源包会很大）
每个页面打开的时间会变长（影响用户体验）

因为第一个原因，导致了第二个原因，所以我们将公共代码抽离出来，在用户打开一个页面的时候，顺便加载了公共的文件，在打开其他页面的时候，如果其他页面也引用了这个公共文件，就不用重新加载，直接从浏览器缓存中获取，这么做解决了以上的两个问题。

从webpack4开始官方移除了commonchunk插件，改用了optimization属性进行更加灵活的配置，这也应该是从V3升级到V4的代码修改过程中最为复杂的一部分



