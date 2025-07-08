import sys
from gtts import gTTS

text = sys.argv[1]
filename = sys.argv[2]

tts = gTTS(text, lang='es')
tts.save(filename)

