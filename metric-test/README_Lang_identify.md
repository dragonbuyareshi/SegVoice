# Language Identification Setup & Notes

Files: `Lang_identify.ipynb`

Setup

1. Create and activate a virtual environment:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies:

```powershell
pip install -r requirements_Lang_identify.txt
```

Notes

- Whisper language detection: the notebook uses `whisper.detect_language` which requires the `openai-whisper` models.
- Feature extraction uses `librosa` MFCC; large datasets may be slow—consider batching or caching features.
- `scikit-learn` is used for `LogisticRegression` and `SVC` — ensure `numpy`/`scipy` compatible versions are installed.

Running

- Open `Lang_identify.ipynb` and run cells in order. Ensure the `minds14_lid` dataset path is present.
