from googletrans import Translator

translator = Translator()
text = "hello, what is you name"
src_lang=translator.detect(text)
print(src_lang.lang)
dest_lang = 'en'
if src_lang.lang!=dest_lang:
    translation = translator.translate(text, src=src_lang.lang, dest=dest_lang)
    print(translation.text)
else:
    print(text)