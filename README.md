# Voice & Text QA System

An intelligent Q&A system based on local large language models, supporting voice input, text input, multilingual translation, and AI-powered responses.

## Features

### Input Section (Left)
- **Voice Input** 🎤
  - Start/Stop recording buttons
  - Real-time recording status
  - Speech recognition results display

- **Text Input** ⌨️
  - Text input field
  - Answer generation button

### Output Section (Right)
- **Translation** 🌐
  - Multi-language translation support
  - Language selection dropdown
  - Translation results display

- **AI Response** 💭
  - AI-powered answers based on voice/text input
  - Intelligent Q&A results display

### Additional Features
- Clean and modern user interface
- Real-time mouse tracking animations
- Responsive layout design
- Elegant transition effects

## Tech Stack

- **Frontend**
  - HTML5
  - CSS3 (Modern layout, animations)
  - JavaScript (Vanilla)
  - Web Audio API (Voice recording)

- **Backend**
  - Python
  - Flask (Web server)
  - Ollama (Local large language model)
  - Whisper (Speech recognition)

## Requirements

- Python 3.8+
- Ollama
- FFmpeg (for audio processing)
- Modern browsers (Chrome/Firefox/Safari)

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install Python dependencies
```bash
pip install -r requirements.txt
```

3. Install and start Ollama
```bash
# Install Ollama (refer to official documentation)
# Pull required model
ollama pull deepseek-r1:1.5b
```

4. Start the application
```bash
python app.py
```

5. Access the application
```
Open http://localhost:5000 in your browser
```

## Usage Guide

1. **Voice Input**
   - Click "Start Recording" to begin
   - Speak your question
   - Click "Stop Recording" to end
   - System will automatically recognize speech and display text
   - Auto-generates Chinese translation (if input is in English)

2. **Text Input**
   - Enter your question in the text field
   - Click "Generate Answer" to get response

3. **Translation**
   - Select target language from dropdown menu
   - Click "Translate to" to translate

4. **AI Response**
   - After seeing speech recognition or text input
   - Click "Generate Answer" to get AI response

## Project Structure

```
.
├── app.py              # Backend main program
├── requirements.txt    # Python dependencies
├── templates/         
│   └── index.html     # Frontend page
└── README.md          # Project documentation
```

## Changelog

### March 2024
- Optimized user interface layout
- Separated input and output sections
- Improved translation functionality interaction
- Added real-time animation effects

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contact

For any questions or suggestions, please reach out through:

- Email: leoxin95@gmail.com

---
