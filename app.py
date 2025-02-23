from flask import Flask, request, jsonify, render_template
import subprocess
import whisper
import os
from functools import lru_cache  # 添加缓存装饰器

app = Flask(__name__, template_folder="templates", static_folder="static")

# 使用缓存装饰器来避免重复加载模型
@lru_cache(maxsize=1)
def get_whisper_model():
    return whisper.load_model("base")

def convert_webm_to_wav(input_path, output_path):
    """使用 FFmpeg 将 WebM 转换为 WAV"""
    command = [
        "ffmpeg", "-y", "-i", input_path,
        "-ar", "16000", "-ac", "1",
        "-c:a", "pcm_s16le", output_path
    ]
    try:
        subprocess.run(command, capture_output=True, check=True)
        return True
    except subprocess.CalledProcessError:
        return False

def generate_answer_with_ollama(text):
    """调用 Ollama 运行 DeepSeek R1 生成回答"""
    if not text.strip():
        return "sorry, I didn't catch what you said."
        
    try:
        result = subprocess.run(
            ["ollama", "run", "deepseek-r1:1.5b"],
            input=text,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip() or "sorry, I can't generate an answer."
    except subprocess.CalledProcessError as e:
        return f"system error: {str(e)}"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/process_audio", methods=["POST"])
def process_audio():
    if "audio" not in request.files:
        return jsonify({"error": "no audio file received"}), 400

    try:
        audio_file = request.files["audio"]
        webm_path = os.path.join(app.static_folder, "temp_audio.webm")
        wav_path = os.path.join(app.static_folder, "temp_audio.wav")
        
        audio_file.save(webm_path)
        
        if not convert_webm_to_wav(webm_path, wav_path):
            raise Exception("audio conversion failed")

        result = get_whisper_model().transcribe(wav_path, fp16=False)
        text = result["text"].strip()
        
        if not text:
            raise Exception("speech recognition failed")

        answer = generate_answer_with_ollama(text)
        
        return jsonify({
            "question": text,
            "answer": answer
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        # 清理临时文件
        for path in [webm_path, wav_path]:
            if os.path.exists(path):
                os.remove(path)

@app.route("/process_text", methods=["POST"])
def process_text():
    data = request.get_json()
    
    if not data or "question" not in data:
        return jsonify({"error": "no question received"}), 400

    try:
        text = data["question"][:500]  # 限制文本长度
        answer = generate_answer_with_ollama(text)
        
        return jsonify({
            "question": text,
            "answer": answer
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)




