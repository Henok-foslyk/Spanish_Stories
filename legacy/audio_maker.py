import argparse
from gtts import gTTS
from playsound import playsound

# Set up argument parser
parser = argparse.ArgumentParser(description="Convert a Spanish story in a .txt file to speech using gTTS.")
parser.add_argument("file", help="Path to the text file (e.g., story.txt)")
parser.add_argument("-p", "--play", action="store_true", help="Play the audio after saving")

args = parser.parse_args()

# Read the text file
with open(args.file, "r", encoding="utf-8") as f:
    text = f.read()

# Convert text to speech
tts = gTTS(text=text, lang="es")
audio_file = "story.mp3"
tts.save(audio_file)
print(f"Audio saved as {audio_file}")

# Optionally play the audio
if args.play:
    print("Playing audio...")
    playsound(audio_file)
