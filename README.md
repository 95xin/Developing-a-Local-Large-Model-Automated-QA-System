# Voice & Text Question-Answering System

一个基于Flask的语音/文本问答系统，支持语音输入和文本输入，使用Whisper进行语音识别，本地部署的DeepSeek-R1大模型生成回答。

## 功能特点

- 🎤 **语音输入**: 支持实时语音录制和识别
- ⌨️ **文本输入**: 支持直接文本输入提问
- 🤖 **AI回答**: 使用DeepSeek-R1模型生成回答
- 🎨 **现代化UI**: 简洁大方的界面设计，支持动态emoji特效
- 🔄 **实时反馈**: 提供录音和处理状态的实时反馈

## 技术栈

- **后端**: Flask
- **前端**: HTML, CSS, JavaScript
- **语音识别**: OpenAI Whisper
- **AI模型**: DeepSeek-R1 (通过Ollama运行)
- **音频处理**: FFmpeg

## 安装要求

- Python 3.x
- FFmpeg
- Ollama (已安装DeepSeek-R1模型)

## 安装步骤

1. 克隆仓库
```bash
git clone [你的仓库URL]
cd [仓库名]
```

2. 安装依赖
```bash
pip install flask whisper
```

3. 安装Ollama并下载DeepSeek-R1模型
```bash
ollama pull deepseek-r1:1.5b
```

4. 运行应用
```bash
python app.py
```

5. 访问应用
打开浏览器访问 `http://localhost:5000`

## 使用说明

1. **语音输入**:
   - 点击"Start Recording"开始录音
   - 说出你的问题
   - 点击"Stop Recording"结束录音
   - 等待AI生成回答

2. **文本输入**:
   - 在文本框中输入你的问题
   - 点击"Generate Answer"生成回答

## 项目结构
├── app.py # Flask应用主文件
├── static/
│ └── recorder.js # 前端录音和交互逻辑
├── templates/
│ └── index.html # 前端页面模板
└── README.md
