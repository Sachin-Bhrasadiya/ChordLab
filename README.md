# ChordLab

ChordLab turns recordings and audio files into chord sheets. It can detect
chords, beats, key and tempo; look up YouTube or Spotify track details and
LRCLIB lyrics; show lyrics in Hinglish or Tanglish; tune an instrument; separate
vocals, drums, bass and other stems(future additions); and export chord sheets as PDF or images.

The user application is a mobile-friendly React and TypeScript single-page app
built with Vite and Capacitor. Users register with email and password; account
records and sessions are stored in SQLite. Songs, settings and imported audio
remain in on-device browser storage. Chord recognition uses the optional
TensorFlow model hosted by the Python API, with on-device analysis as a fallback.
ChordMini remains available as an optional remote analysis engine.

The administrator console is a separate web application at `/admin/`. Both
frontends use the independently running Python FastAPI service; no TypeScript
server is needed at runtime. User accounts and sessions are stored in the API's
SQLite database. User sign-in persists on the device until sign-out. Admin sign-in
is separate and required on each fresh console page load.

## How It Works

1. Import an audio file or record audio from the microphone. A YouTube or Spotify
	link imports track metadata only; those services do not provide downloadable
	audio through this app.
2. ChordLab tries the locally hosted TensorFlow chord recognizer when enabled.
	If it has not been trained or is unavailable, ChordMini and then Web Audio
	analysis can provide fallbacks. ChordMini is also an optional alternative
	engine.
3. Optional API requests look up chord diagrams, track lyrics and link metadata.
	Romanization uses the configured AI provider, with an offline Tanglish
	fallback for Tamil text.
4. The result is saved locally and can be edited, transposed, viewed as a chord
	sheet, and exported. Studio stem separation runs Demucs in the Python API.

## Local Development

Requirements: Node.js 20+, npm, and Python 3.10+.

```sh
npm install
cp .env.example .env
python3 -m venv .venv
. .venv/bin/activate
pip install -r backend/requirements.txt
```

To train and use the TensorFlow chord model, install its optional dependencies
and download GuitarSet:

```sh
pip install -r backend/requirements-ml.txt
python -m backend.train_chord_model --download
```

Start the FastAPI backend in one terminal:

```sh
uvicorn backend.main:app --reload --port 8000
```

Start the user frontend in another terminal:

```sh
npm run dev
```

Start the admin frontend in a third terminal:

```sh
npm run dev:admin
```


## Backend Configuration
FastAPI loads the root `.env` file. Relevant settings:

| Variable | Purpose |
| --- | --- |
| `VITE_BACKEND_URL` | Optional API origin embedded in the frontend; unset uses relative API URLs. |
| `CAPACITOR_SERVER_URL` | Optional hosted web URL used by the native shell; otherwise bundled assets are used. |
| `CORS_ORIGINS` | Comma-separated allowed web and Capacitor origins. |
| `CHORDMINI_API_URL` | ChordMini service URL; defaults to `https://chordmini.me`. |
| `CHORDMINI_APP_CHECK_TOKEN` | Optional token for the public ChordMini service. |
| `CHORD_MODEL_PATH` | Optional path to the trained `.keras` model; the matching label file uses the same path with `.labels.json`. |
| `CHORDS_API_URL` | Chord catalog API base URL. |
| `AI_API_BASE_URL` | OpenAI-compatible API base URL for lyric romanization. |
| `AI_API_KEY` | Server-side key for the configured AI provider. |
| `AI_MODEL` | Model name; defaults to `gpt-4o-mini`. |
| `ADMIN_USERNAME` | Admin username; defaults to `jebin`. |
| `ADMIN_PASSWORD` | Password used to seed the initial administrator account. |
| `DEMUCS_PYTHON` | Python executable containing Demucs; defaults to `python3`. |
| `DEMUCS_MODEL` | Demucs model; defaults to `htdemucs`. |
# Future Enhancement STEM Analyis
Install Demucs in the Python environment used by the API to enable stem
separation, for example with
`pip install -U git+https://github.com/facebookresearch/demucs.git`. Do not
expose `AI_API_KEY` in a `VITE_` variable. In production,
deploy the frontend and FastAPI service separately, set the frontend's
`VITE_BACKEND_URL` to the public API origin, and configure the corresponding
`CORS_ORIGINS` value on FastAPI.
