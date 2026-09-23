#!/usr/bin/env python3
import os, sys, time, json
os.environ["PYTHONIOENCODING"] = "utf-8"
from pathlib import Path
from faster_whisper import WhisperModel

audio_path = r"E:\projects\hypit-claude-explainer\audio.wav"
out_json = r"E:\projects\hypit-claude-explainer\transcript.json"
out_srt = r"E:\projects\hypit-claude-explainer\transcript.srt"
model_local_path = r"C:\Users\Administrator\.cache\huggingface\hub\models--Systran--faster-whisper-base\snapshots\ebe41f70d5b6dfa9166e2c581c45c9c0cfc57b66"

print(f"[{time.strftime('%H:%M:%S')}] 从本地路径加载 faster-whisper base 模型: {model_local_path}...", flush=True)
device = "cpu"
compute_type = "int8"
try:
    import torch
    if torch.cuda.is_available():
        device = "cuda"
        compute_type = "float16"
        print("  检测到 CUDA，启用 GPU 加速！", flush=True)
except Exception:
    pass

model = WhisperModel(model_local_path, device=device, compute_type=compute_type, cpu_threads=4)
print(f"[{time.strftime('%H:%M:%S')}] 模型就绪，开始转写 (zh, word_timestamps=True)...", flush=True)

segments, info = model.transcribe(
    audio_path,
    language="zh",
    beam_size=5,
    word_timestamps=True,
    vad_filter=True
)

results = []
srt_lines = []
seg_idx = 1

def format_timestamp(seconds: float) -> str:
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int(round((seconds - int(seconds)) * 1000))
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

for seg in segments:
    words = []
    if seg.words:
        for w in seg.words:
            words.append({
                "word": w.word,
                "start": round(w.start, 3),
                "end": round(w.end, 3),
                "probability": round(w.probability, 3)
            })
    item = {
        "id": seg.id,
        "start": round(seg.start, 3),
        "end": round(seg.end, 3),
        "text": seg.text.strip(),
        "words": words
    }
    results.append(item)
    print(f"[{format_timestamp(seg.start)} -> {format_timestamp(seg.end)}] {seg.text.strip()}", flush=True)
    
    srt_lines.append(f"{seg_idx}")
    srt_lines.append(f"{format_timestamp(seg.start)} --> {format_timestamp(seg.end)}")
    srt_lines.append(seg.text.strip())
    srt_lines.append("")
    seg_idx += 1

with open(out_json, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

with open(out_srt, "w", encoding="utf-8") as f:
    f.write("\n".join(srt_lines))

print(f"[{time.strftime('%H:%M:%S')}] 转写完成！共 {len(results)} 个段落已保存", flush=True)
