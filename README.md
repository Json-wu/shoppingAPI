# shoppingAPI
### 功能需求

1. 使用 Node.js 开发一个Api接口将附件  csv 模板中的商品导入到 Shopify 店铺
2. Shopify 可以免费注册，请自行注册一个测试店铺，完成后请用所有导入的商品单独创建一个 Collection（可以手工建），并将链接发给我们，如果店铺有访问密码请同时提供（Shopify admin / Online Store / Preferences 页面可以看到默认密码）。
3. 可以不用提交所有字段，但以下信息必须要有：
    - 标题 (对应Title)
    - 描述 (对应 Body (HTML))
    - 图片 (对应Image Src)
    - 价格 (对应 Variant Price)
    - 尺码等Option信息 (Shopify 支持最多 3个Options，对应 Excel 中的 Option[X] Name / Option[X] Value，如颜色，则对应的 Option Name 为 Color, Option Value 为 Black, Blud 之类)
    - 注：Excel 每行一个 Variant，一个商品会存在多个 Variant (每个Variant 可能对应不同的Color、Size、图片等不同规格参数)，在 Excel 中用 handle 来区分是不是一个商品。
### 技术需求

1. 使用 TypeScript 开发；
2. Api 框架使用Express 框架；
3. Api 输入输出符合RESTful 规范；
4. 调用 Shopify Api 可以使用 Restful api 或 GraphQL api, 具体可以参考Shopify 文档，以下是相关文档链接，请仔细查看 Shopify Product 及对应的 Image / Option / Variant 定义以及他们之间的关系：
    - Rest api [https://shopify.dev/api/admin-rest](https://shopify.dev/api/admin-rest)
    - GraphQL api: [https://shopify.dev/api/admin-graphql](https://shopify.dev/api/admin-graphql)
    - Shopify Product 定义 [https://shopify.dev/api/admin-rest/2021-10/resources/product](https://shopify.dev/api/admin-rest/2021-10/resources/product#top)
1. Excel 解析使用 [https://www.npmjs.com/package/exceljs](https://www.npmjs.com/package/exceljs)；
2. 使用mocha做单元测试；


