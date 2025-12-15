# Voice Classification Requirements — Explanation

Files added in this folder:

- `voice_classification_requirements.txt` — packages needed to run `voice_classification.ipynb`.

Install

```bash
pip install -r metric-test/voice_classification_requirements.txt
```

What each package is for

- numpy: numerical arrays and computations
- pandas: dataframes and tabular results
- librosa: audio loading and feature extraction (MFCCs)
- soundfile: audio I/O used by librosa
- pystoi: STOI intelligibility metric (audio evaluation)
- mir_eval: audio/music evaluation utilities
- plotly: interactive plotting used in notebook visualizations
- tqdm: progress bars during feature extraction
- scikit-learn: model training, preprocessing and metrics
- audmetric: additional audio evaluation utilities referenced in the notebook

Notes

- The list was derived from imports inside `metric-test/voice_classification.ipynb` and the project's existing noise reduction requirements.
- Pin versions only if you encounter compatibility issues (example: `numpy==1.25.1`).
- The file resides in `metric-test` so it clearly pairs with the notebook in the same folder.

Notebook using these deps:

- `metric-test/voice_classification.ipynb`
