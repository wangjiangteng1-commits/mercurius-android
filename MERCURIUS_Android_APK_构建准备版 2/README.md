# MERCURIUS Android + iPhone 原生 App 项目（Expo / React Native）

这是真正的 React Native 手机 App **源码**，不是 HTML 网页，也不是已编译的 APK/IPA。它可分别编译为 Android 安装包和 iOS 安装包。当前环境没有 Android SDK、Xcode、Apple 签名凭证，**未实际编译、安装或在手机上验收**。

## 包含的页面
- Supabase Auth 邮箱密码登录 / 退出，持久化登录会话。
- 总看板：昨天和本期出货金额、未交数量、逾期明细数、完成产品组数。
- 订单：订单号、客户、客户PO、SKU搜索，未完成/已完成/全部筛选。
- 逾期：只显示逾期 1–100 天的未完成明细；隐藏不删除。
- 出货：出货单号、订单号、PO、产品、数量、金额、匹配状态。
- 报工：先按客户PO/订单号搜索选择产品，再选备料/加工、录入良品/不良/返工。
- 月度：按自然月的报工数量与估算产值。**此处未实现电脑版26日至25日的自定义周期，正式上线前需统一口径。**
- 中/越切换（部分字段为双语固定文案）。

## 安装与运行（电脑）
1. 安装 Node.js LTS、Git；解压此 ZIP。
2. 进入项目目录，运行 `npm install`。
3. 复制 `.env.example` 为 `.env`，填入项目 Supabase URL 与 **anon / publishable 公钥**。不要使用 `service_role`、`SYNC_TRIGGER_SECRET`、NGP API 密钥。
4. 运行 `npx expo start`，使用 Android / iOS 的 Expo Go 扫码进行开发测试。
5. 安装 `npm install -g eas-cli`，执行 `eas login`、`eas init`。EAS 项目创建后替换 `app.json` 里的占位 projectId。
6. Android APK：`eas build --platform android --profile preview`；iOS 内测：`eas build --platform ios --profile preview`（需要 Apple Developer 账号和正确签名）。
7. 正式上架：配置品牌图标、隐私政策、应用审核资料、推送权限和商店信息。

## 重要安全与业务限制
- Supabase 数据表必须通过 RLS 限制登录用户的读取/写入权限。**界面隐藏按钮不构成授权。**
- 报工目前客户端校验数量，生产环境必须通过数据库 RPC / 事务校验数量上限、角色权限、防重复提交。
- 订单号+SKU 的部分出货只在**唯一订单明细**时自动展示已出货数量；重复订单明细不会臆造分配。
- 订单与出货一次最多读取10000行、出货页面展示最近250条；大规模使用前改成服务器分页。
- 目前订单导出/逾期导出、详细月度目标、同步状态和完整电脑版全部交互尚未移植，不能视为全部功能已通过验收。
- 若遇到 RLS 权限错误，修复数据库策略，不要在手机 App 中放入 service_role 密钥。
