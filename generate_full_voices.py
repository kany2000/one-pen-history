import os, sys, json, time
import win32com.client
from pathlib import Path

work_dir = Path(r"E:\projects\hypit-claude-explainer")
chapters_path = work_dir / "chapters.json"
voice_dir = work_dir / "full_voices"
voice_dir.mkdir(parents=True, exist_ok=True)

with open(chapters_path, "r", encoding="utf-8") as f:
    chapters = json.load(f)

print(f"[{time.strftime('%H:%M:%S')}] 开始批量生成 19 篇章的独立语音文件...")

speaker = win32com.client.Dispatch('SAPI.SpVoice')

timeline = []
current_time = 0.0

for idx, ch in enumerate(chapters):
    filename = f"part_{idx:02d}.wav"
    filepath = voice_dir / filename
    text = ch["desc"]
    
    # SAPI 录制到文件
    filestream = win32com.client.Dispatch('SAPI.SpFileStream')
    filestream.Open(str(filepath), 3, False)
    speaker.AudioOutputStream = filestream
    speaker.Speak(text)
    filestream.Close()
    
    # 探测时长
    from subprocess import check_output
    cmd = f'ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "{filepath}"'
    duration = float(check_output(cmd, shell=True).decode().strip())
    
    # 增加段落间自然的 0.4s 呼吸留白
    padded_duration = round(duration + 0.4, 2)
    
    item = {
        "index": idx,
        "era": ch["era"],
        "title": ch["title"],
        "desc": text,
        "audio_file": str(filepath),
        "duration": duration,
        "padded_duration": padded_duration,
        "start": round(current_time, 2),
        "end": round(current_time + padded_duration, 2)
    }
    timeline.append(item)
    print(f"  [{item['start']}s -> {item['end']}s] 第 {idx+1:02d} 篇: {ch['title']} ({duration:.1f}s)")
    current_time += padded_duration

out_timeline_path = work_dir / "full_timeline.json"
with open(out_timeline_path, "w", encoding="utf-8") as f:
    json.dump(timeline, f, ensure_ascii=False, indent=2)

print(f"[{time.strftime('%H:%M:%S')}] 19 篇章语音生成完毕！总时长: {current_time:.2f} 秒 (约 {current_time/60:.1f} 分钟)")
