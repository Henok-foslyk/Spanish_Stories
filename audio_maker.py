from gtts import gTTS
from playsound import playsound

# Spanish story text
story_text = """
Ana es una niña de ocho años.
Vive en una casa pequeña con su mamá.
Hoy es sábado y hace sol.
Ana juega en el jardín con su gato, Nube.
Nube es blanco y muy travieso.
De repente, Ana ve una caja en la puerta.
"¿Qué es esto?" pregunta.
Ella llama a su mamá.
Su mamá sonríe y dice: "Es para ti".
Ana abre la caja con cuidado.
Dentro hay una bicicleta roja.
"¡Gracias, mamá!" grita Ana feliz.
Ella se sube a la bicicleta.
Nube corre detrás de ella.
¡Es un día perfecto para Ana!
"""

# Convert text to speech
tts = gTTS(text=story_text, lang='es')

# Save audio file
tts.save("ana_story.mp3")

# Play the audio file
playsound("ana_story.mp3")
