import json
import os

def clean_alpha(r):
    for ch in r:
        if ch.isalpha():
            return ch.upper()
    return 'A'

def hira_to_kata(hira):
    res = []
    for ch in hira:
        code = ord(ch)
        if 0x3041 <= code <= 0x3096:
            res.append(chr(code + 0x60))
        else:
            res.append(ch)
    return "".join(res)

# Rich authentic Japanese vocabulary banks for N4, N3, N2, and N1
# Categorized with Romaji, Hiragana, Katakana, Kanji, Meaning, [Type], Topic

print("Starting vocabulary generation...")
