# SegVoice

SegVoice is a collection of evaluation notebooks and scripts for voice-processing tasks and metrics. The repository contains example notebooks and requirement files to run evaluation or metric tests for several audio tasks such as automatic speech recognition (ASR), language identification, noise reduction, speaker diarization, and voice classification.

This README replaces the previous "Vocalign" placeholder and summarizes the repository layout and how to run the provided metric-test notebooks.

## Features / Contents
- metric-test/ : Jupyter notebooks and supporting requirement files for metric experiments
  - ASR.ipynb — Automatic Speech Recognition evaluation notebook
  - Lang_identify.ipynb — Language identification evaluation notebook
  - Noise_reduction.ipynb — Noise reduction experiment notebook
  - speaker_dia.ipynb — Speaker diarization metric notebook
  - voice_classification.ipynb — Voice classification notebook
  - README_ASR.md, README_Lang_identify.md, README_speaker_dia.md — per-task readme guides
  - requirements_*.txt — Python requirements for each task
  - noise_red_requirements.txt — requirements for the noise reduction notebook
  - voice_classification_requirements_explanation.md — explanation of voice-classification dependencies

## Quick start

1. Clone the repository
   ```
   git clone https://github.com/dragonbuyareshi/SegVoice.git
   cd SegVoice
   ```

2. Create a virtual environment (recommended)
   - Linux / macOS:
     ```
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Windows (PowerShell):
     ```
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```

3. Install dependencies for the task you want to run. Example — ASR:
   ```
   pip install -r metric-test/requirements_ASR.txt
   ```
   Replace `requirements_ASR.txt` with:
   - metric-test/requirements_Lang_identify.txt (language id)
   - metric-test/noise_red_requirements.txt (noise reduction)
   - metric-test/requirements_speaker_dia.txt (speaker diarization)
   - metric-test/voice_classification_requirements.txt (voice classification)

4. Run notebooks
   - Open the project in Jupyter Notebook / JupyterLab:
     ```
     jupyter lab
     ```
   - Or upload the notebooks to Google Colab (recommended for GPU/heavy memory notebooks).

Notes:
- The noise reduction notebook (metric-test/Noise_reduction.ipynb) can be large and may require Colab or a machine with sufficient memory.
- Each notebook has a corresponding README_* file with task-specific instructions and expected inputs/outputs. See the metric-test folder for details.

## Usage examples
- See metric-test/README_ASR.md for example inputs and how to run the ASR evaluation.
- For speaker diarization tests, consult metric-test/README_speaker_dia.md (it describes expected annotation formats and scoring procedure).

## Repository structure
- metric-test/
  - ASR.ipynb
  - Lang_identify.ipynb
  - Noise_reduction.ipynb
  - speaker_dia.ipynb
  - voice_classification.ipynb
  - README_ASR.md
  - README_Lang_identify.md
  - README_speaker_dia.md
  - requirements_*.txt
- LICENSE
- README.md (this file)

## Contributing
Contributions are welcome. Suggested flow:
1. Create an issue describing the change or feature.
2. Create a branch: `git checkout -b feat/my-change`
3. Make your changes and include tests or updated notebooks where appropriate.
4. Open a pull request and describe your changes.

Please keep notebooks reproducible: specify package versions in the requirements files and include any sample data or data access instructions.

## License
This repository includes a LICENSE file in the root. Please refer to it for licensing details.

## Contact
If you have questions or need help running any notebook, open an issue on the repository or contact the maintainer.
