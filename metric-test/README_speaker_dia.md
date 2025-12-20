# Speaker Diarization Setup & Notes

Files: `speaker_dia.ipynb`

Setup

1. Create and activate a virtual environment:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies:

```powershell
pip install -r requirements_speaker_dia.txt
```

Notes & Tips

- `pyannote` packages may require a Hugging Face token and special installation. See https://github.com/pyannote/pyannote-audio for details.
- `torchaudio` and `torch` must match your platform and CUDA setup—install from https://pytorch.org if GPU is desired.
- The notebook downloads LibriSpeech via `torchaudio.datasets.LIBRISPEECH` which requires internet access.

Running

- Open `speaker_dia.ipynb` and run cells sequentially. Expect heavy CPU/memory usage when processing many audio files.
