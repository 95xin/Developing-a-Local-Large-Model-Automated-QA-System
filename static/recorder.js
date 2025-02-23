console.log("✅ recorder.js 加载完成！");

// 全局变量
const state = {
    mediaRecorder: null,
    audioChunks: [],
    isRecording: false
};

// DOM 元素
const elements = {
    startBtn: document.getElementById("start"),
    stopBtn: document.getElementById("stop"),
    textInput: document.getElementById("text-input"),
    output: document.getElementById("output"),
    generateBtn: document.getElementById("generate-text")
};

// 在现有代码的开头添加以下内容
const cursor = document.querySelector('.custom-cursor');
const emojis = ['✨', '⭐', '🌟','🎵', '🎤', '🎧','🎸'];
let lastEmoji = Date.now();
const TRAIL_INTERVAL = 100; // 每100ms创建一个新的emoji

// 创建轨迹emoji
function createTrailEmoji(x, y) {
    const emoji = document.createElement('div');
    emoji.className = 'cursor-trail';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;
    document.body.appendChild(emoji);

    // 设置初始透明度为1并开始动画
    requestAnimationFrame(() => {
        emoji.style.opacity = '1';
        emoji.style.animation = 'fadeOut 0.8s ease forwards';
    });

    // 动画结束后移除元素
    setTimeout(() => {
        document.body.removeChild(emoji);
    }, 800);
}

// 处理鼠标移动
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastEmoji >= TRAIL_INTERVAL) {
        createTrailEmoji(e.clientX, e.clientY);
        lastEmoji = now;
    }
});

// 鼠标进入可点击元素时的效果
document.querySelectorAll('button, input').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// 优化点击产生的emoji效果
function createEmoji(x, y) {
    const emoji = document.createElement('span');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // 随机生成运动方向
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    emoji.style.left = x + 'px';
    emoji.style.top = y + 'px';
    emoji.style.setProperty('--tx', `${tx}px`);
    emoji.style.setProperty('--ty', `${ty}px`);
    
    document.body.appendChild(emoji);

    emoji.addEventListener('animationend', () => {
        document.body.removeChild(emoji);
    });
}

// 优化点击效果，同时产生多个emoji
document.addEventListener('click', (e) => {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createEmoji(e.clientX, e.clientY);
        }, i * 100);
    }
});

// 更新updateUI函数，添加动画效果
const updateUI = (message) => {
    const output = elements.output;
    output.style.opacity = '0';
    setTimeout(() => {
        output.innerText = message;
        output.style.opacity = '1';
    }, 300);
};

// 在现有的toggleButtons函数中添加过渡效果
const toggleButtons = (recording) => {
    elements.startBtn.disabled = recording;
    elements.stopBtn.disabled = !recording;
    
    if (recording) {
        elements.startBtn.style.transform = 'scale(0.95)';
        elements.stopBtn.style.transform = 'scale(1.05)';
    } else {
        elements.startBtn.style.transform = 'scale(1.05)';
        elements.stopBtn.style.transform = 'scale(0.95)';
    }
};

// 录音相关函数
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        state.mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        state.audioChunks = [];
        state.isRecording = true;

        state.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                state.audioChunks.push(event.data);
            }
        };

        state.mediaRecorder.start();
        toggleButtons(true);
        updateUI("🎤 Recording...");
    } catch (error) {
        console.error("Recording failed:", error);
        updateUI("❌ Cannot access the microphone, please check the permission!");
    }
}

async function stopRecording() {
    if (!state.mediaRecorder) return;

    state.mediaRecorder.stop();
    state.isRecording = false;
    toggleButtons(false);

    state.mediaRecorder.onstop = async () => {
        try {
            updateUI("⏳ Processing the recording...");
            const audioBlob = new Blob(state.audioChunks, { type: "audio/webm" });
            await processAudio(audioBlob);
        } catch (error) {
            console.error("Process recording failed:", error);
            updateUI("❌ Process failed, please try again!");
        }
    };
}

// API 请求函数
async function processAudio(audioBlob) {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");

    const response = await fetch("/process_audio", {
        method: "POST",
        body: formData
    });

    if (!response.ok) throw new Error(response.statusText);
    
    const result = await response.json();
    updateUI(`📝 You said: ${result.question}\n\n🤖 AI answer: ${result.answer}`);
}

async function processText() {
    const text = elements.textInput.value.trim();
    if (!text) {
        updateUI("❌ Please enter a question!");
        return;
    }

    try {
        updateUI("🤖 AI is thinking...");
        const response = await fetch("/process_text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: text })
        });

        if (!response.ok) throw new Error(response.statusText);
        
        const result = await response.json();
        updateUI(`📝 Your question: ${text}\n\n🤖 AI answer: ${result.answer}`);
    } catch (error) {
        console.error("Process text failed:", error);
        updateUI("❌ Process failed, please try again!");
    }
}

// 事件监听
elements.startBtn.addEventListener("click", startRecording);
elements.stopBtn.addEventListener("click", stopRecording);
elements.generateBtn.addEventListener("click", processText);



