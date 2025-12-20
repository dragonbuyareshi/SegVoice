# ASR Setup & Notes

Files: `ASR.ipynb`

Setup

1. Create and activate a virtual environment:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies:

```powershell
pip install -r requirements_ASR.txt
```

Notes & Tips

- Whisper: notebook calls `whisper.load_model("tiny")`. `openai-whisper` will download model weights on first run.
- Vosk: download a Vosk model and set its path in the notebook (example used: `D:\Diarize\vosk-model-small-en-us-0.15`).
- `torch` should be installed according to your CPU/GPU; if you need GPU, install the matching `torch` from https://pytorch.org.
- `ffmpeg` on PATH is helpful for some audio ops (install separately if needed).

Running

- Open `ASR.ipynb` and run cells top-to-bottom. Ensure `minds14_lid` dataset path and Vosk model paths are set.
