"""
Master script to double the vocabulary in kumaGO across JLPT N4, N3, N2, N1 and N5.
Generates comprehensive authentic vocabulary decks for every level.
"""
import json
import os
import sys

def clean_alpha(romaji):
    for ch in romaji:
        if ch.isalpha():
            return ch.upper()
    return 'A'

def to_dict(entry, category):
    # entry is (romaji, hiragana, katakana, kanji, meaning, [type], topic)
    alpha = clean_alpha(entry[0])
    if category in ['verbs', 'adjectives']:
        return {
            'alphabet': alpha,
            'romaji': entry[0],
            'hiragana': entry[1],
            'katakana': entry[2],
            'kanji': entry[3],
            'meaning': entry[4],
            'type': entry[5],
            'topic': entry[6]
        }
    elif category == 'phrases':
        return {
            'alphabet': alpha,
            'romaji': entry[0],
            'hiragana': entry[1],
            'katakana': entry[2],
            'kanji': entry[3],
            'meaning': entry[4],
            'topic': entry[5]
        }
    else: # nouns, adverbs
        topic = entry[5] if len(entry) > 5 else "General"
        return {
            'alphabet': alpha,
            'romaji': entry[0],
            'hiragana': entry[1],
            'katakana': entry[2],
            'kanji': entry[3],
            'meaning': entry[4],
            'topic': topic
        }

print("Base helper defined.")
