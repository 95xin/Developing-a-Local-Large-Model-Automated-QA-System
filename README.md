# Voice & Text Question-Answering System

一个基于Flask的智能语音/文本问答系统，支持语音输入和文本输入，集成了语音识别、自动翻译和AI问答功能，使用Whisper进行语音识别，本地部署的DeepSeek-R1大模型生成回答。

## 功能特点

- 🎤 **语音输入**: 支持实时语音录制和识别
- 🔄 **自动翻译**: 支持中英文双向翻译
  - 中文输入自动翻译为英文
  - 英文输入自动翻译为中文
- ⌨️ **文本输入**: 支持直接文本输入提问
- 🤖 **AI回答**: 使用DeepSeek-R1模型生成智能回答
- 🎨 **现代化UI**: 简洁大方的界面设计，支持动态emoji特效
- 🔄 **实时反馈**: 提供录音和处理状态的实时反馈
- ✨ **交互特效**: 鼠标移动时显示可爱的emoji动画效果

## 技术栈

- **后端**: Flask
- **前端**: HTML, CSS, JavaScript
- **语音识别**: OpenAI Whisper
- **AI模型**: DeepSeek-R1 (通过Ollama运行)
- **音频处理**: FFmpeg
- **翻译功能**: DeepSeek-R1

## 系统要求

- Python 3.x
- FFmpeg (用于音频转换)
- Ollama (已安装DeepSeek-R1模型)
- 现代浏览器 (支持MediaRecorder API)
- 麦克风设备 (用于语音输入)

## 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/95xin/Developing-a-Local-Large-Model-Automated-QA-System.git
cd Developing-a-Local-Large-Model-Automated-QA-System
```

2. 安装Python依赖
```bash
pip install flask whisper torch
```

3. 安装Ollama并下载DeepSeek-R1模型
```bash
# 安装Ollama (根据你的操作系统选择适当的安装方法)
# macOS
brew install ollama

# 下载模型
ollama pull deepseek-r1:1.5b
```

4. 安装FFmpeg (如果尚未安装)
```bash
# macOS
brew install ffmpeg

# Ubuntu
sudo apt-get install ffmpeg
```

5. 运行应用
```bash
python app.py
```

6. 访问应用
打开浏览器访问 `http://localhost:5000`

## 使用说明

1. **语音输入模式**:
   - 点击"Start Recording"开始录音
   - 说出你的问题（支持中文或英文）
   - 点击"Stop Recording"结束录音
   - 系统会自动：
     - 识别你的语音内容
     - 提供对应的翻译（中译英或英译中）
     - 生成AI回答

2. **文本输入模式**:
   - 在文本框中输入你的问题
   - 点击"Generate Answer"生成回答
   - 系统会生成AI回答

## 项目结构
```
├── app.py              # Flask应用主文件
├── static/             # 静态资源目录
│   └── temp_audio.*    # 临时音频文件
├── templates/          # 模板目录
│   └── index.html      # 前端页面模板
└── README.md          # 项目文档
```

## 特别说明

- 语音识别使用Whisper的base模型，支持多语言识别
- 翻译和问答功能使用DeepSeek-R1模型，支持中英文双向翻译
- 所有AI处理都在本地完成，不需要联网
- 界面支持实时动态特效，提供良好的用户体验

## 更新日志

### 2024-02-23
- 添加中英文自动翻译功能
- 优化UI界面，添加动态emoji特效
- 改进错误处理和用户反馈
- 优化AI回答的展示效果

## 贡献指南

欢迎提交Issue和Pull Request来帮助改进项目。在提交PR之前，请确保：
1. 代码符合项目的编码规范
2. 新功能有适当的测试
3. 更新了相关文档

## 许可证

MIT License
