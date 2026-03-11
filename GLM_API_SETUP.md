# GLM API 配置说明

## 🎯 功能介绍

本网站集成了基于智谱GLM（大语言模型）的AI问答功能，使用简化版RAG（检索增强生成）技术，将简历信息作为系统提示词，让用户可以与简历进行交互式问答。

## ✨ 实现方案

### 简化版RAG（当前实现）

**原理**：
- 将完整简历作为系统提示词（System Prompt）
- 用户提问时，将简历上下文+用户问题一起发送给GLM API
- GLM基于提供的上下文生成准确的回答

**优势**：
- ✅ 实现简单，无需额外的向量数据库
- ✅ 响应速度快
- ✅ 成本低（仅消耗API tokens）
- ✅ 适合简历内容不长的情况

**代码实现**：参见 `script.js` 第928-978行的 `RESUME_CONTEXT` 变量

## 🔑 获取API Key

### 步骤1：注册智谱AI账号

1. 访问智谱AI开放平台：https://open.bigmodel.cn/
2. 点击右上角"注册"创建账号
3. 完成实名认证（需要上传身份证）

### 步骤2：创建API Key

1. 登录后进入控制台
2. 点击左侧菜单"API密钥"
3. 点击"创建API密钥"
4. 复制生成的API Key（格式类似：`xxxxxxxx.xxxxxxxx.xxxxxxxx`）

### 步骤3：充值（可选）

- GLM-4-Flash模型：新用户免费额度很大，足够测试
- 如需更多额度，可在控制台充值

## ⚙️ 配置API Key

### 方法1：直接修改代码（仅用于开发测试）

打开 `script.js` 文件，找到第981行：

```javascript
const GLM_API_KEY = 'YOUR_GLM_API_KEY_HERE';
```

替换为你的API Key：

```javascript
const GLM_API_KEY = '12345678.abcdef123456.1234567890';
```

**⚠️ 安全警告**：这种方式会将API Key暴露在代码中，仅用于本地测试，不要部署到公开网站！

### 方法2：环境变量（推荐，生产环境）

创建 `.env` 文件（项目根目录）：

```bash
GLM_API_KEY=你的API_Key
```

然后修改 `script.js`：

```javascript
const GLM_API_KEY = process.env.GLM_API_KEY || 'YOUR_GLM_API_KEY_HERE';
```

**注意**：这需要使用构建工具（如Webpack、Vite）或后端代理。

### 方法3：后端代理（最安全，生产环境推荐）

创建后端API服务器（Node.js示例）：

```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GLM_API_KEY}`
        },
        body: JSON.stringify({
            model: 'glm-4-flash',
            messages: messages,
            temperature: 0.7,
            max_tokens: 2000
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000);
```

前端代码改为：

```javascript
const GLM_API_URL = '/api/chat'; // 使用后端代理
```

## 💰 API费用说明

### GLM-4-Flash（当前使用）

- **价格**：¥0.1 / 1M tokens（输入），¥0.4 / 1M tokens（输出）
- **优势**：速度快，价格低，适合对话场景
- **免费额度**：新用户通常有25M tokens免费额度

### Token消耗估算

- 简历系统提示词：约1000 tokens
- 平均用户问题：约50 tokens
- 平均AI回复：约200-500 tokens
- **单次对话成本**：约¥0.0001-0.0003
- **1000次对话成本**：约¥0.1-0.3元

### 成本优化建议

1. 使用 `glm-4-flash` 而非 `glm-4`（便宜10倍+）
2. 限制 `max_tokens` 参数（当前设置为2000）
3. 定期清理 `chatHistory`（当前只保留最近10条）
4. 考虑添加缓存机制（相同问题直接返回答案）

## 📝 简历内容更新

如需更新简历信息，编辑 `script.js` 中的 `RESUME_CONTEXT` 变量：

```javascript
const RESUME_CONTEXT = `
你是葛尔康的AI助手，基于智谱GLM API。

【基本信息】
姓名：葛尔康
...

在这里修改简历内容
`;
```

## 🧪 测试API连接

刷新浏览器页面后，打开开发者工具（F12），查看Console：

- ✅ 如果看到正常输出：说明页面加载成功
- ⚠️ 如果看到警告信息：说明API Key未配置
- 📝 会显示提示：`⚠️ GLM API Key未配置`

然后在AI问答section输入问题测试：

1. 点击示例问题
2. 或在输入框输入问题并按回车
3. 观察是否有回复

## ❓ 常见问题

### 1. API返回401错误

**原因**：API Key错误或未配置

**解决**：
- 检查API Key是否正确复制
- 确认没有多余的空格或换行
- 查看控制台是否正确读取到API Key

### 2. API返回429错误

**原因**：请求过于频繁或超出额度

**解决**：
- 检查账户余额
- 降低请求频率
- 考虑升级套餐

### 3. CORS跨域错误

**原因**：浏览器安全策略限制

**解决方案**：
- 使用后端代理（推荐）
- 或在浏览器启动参数中禁用CORS（仅开发测试）

### 4. 回复内容不准确

**原因**：系统提示词需要优化

**解决**：
- 优化 `RESUME_CONTEXT` 的表达
- 调整 `temperature` 参数（0.1-1.0，越低越准确）
- 在系统提示词中添加更多约束条件

## 🚀 进阶优化建议

### 1. 添加流式响应

```javascript
// 使用SSE（Server-Sent Events）实现打字机效果
const response = await fetch(GLM_API_URL, {
    // ... 其他配置
    headers: {
        'Accept': 'text/event-stream'
    }
});
```

### 2. 添加对话历史持久化

```javascript
// 使用localStorage保存对话历史
localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
```

### 3. 添加用户反馈机制

```javascript
// 允许用户点赞/点踩，用于优化提示词
function addFeedback(messageId, isPositive) {
    // 保存反馈数据
}
```

### 4. 添加速率限制

```javascript
// 防止用户过于频繁提问
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1秒

function rateLimit() {
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
        return false;
    }
    lastRequestTime = now;
    return true;
}
```

## 📚 参考文档

- [智谱AI开放平台文档](https://open.bigmodel.cn/dev/api)
- [GLM-4模型介绍](https://open.bigmodel.cn/dev/howuse/model)
- [API定价说明](https://open.bigmodel.cn/pricing)

---

**最后更新**：2026-03-11
**维护者**：Claude Code
