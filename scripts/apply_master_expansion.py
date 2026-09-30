import json
import sys
import shutil

sys.path.insert(0, 'scripts/generators')

import nouns_food_dining, nouns_home_daily, nouns_people_society, nouns_travel_places, nouns_culture_abstract, nouns_extended_az, nouns_science_economy
import verbs_actions_movement, verbs_social_communication, verbs_daily_cooking_body, verbs_mind_work_study, verbs_comprehensive_az, verbs_compound_and_jlpt, verbs_extended_advanced
import adjectives_emotions_personality, adjectives_senses_appearance, adjectives_states_qualities, adjectives_advanced_az, adjectives_compounds_and_patterns, adjectives_sino_japanese_jlpt, adjectives_extended_all_az, adjectives_more_extended
import adverbs_onomatopoeia_gitaigo, adverbs_time_frequency_speed, adverbs_degree_quantity_manner, adverbs_discourse_logic_modal, adverbs_comprehensive_az_part1, adverbs_comprehensive_az_part2, adverbs_more_az
import phrases_daily_conversation, phrases_travel_dining_shopping, phrases_business_work_school, phrases_emotions_reactions_culture, phrases_conversational_az_part1, phrases_conversational_az_part2, phrases_conversational_az_part3, phrases_conversational_az_part4, phrases_conversational_az_part5, phrases_conversational_az_part6, phrases_conversational_az_part7, phrases_conversational_az_part8

with open('src/data/vocab/n5_vocab.json', 'r', encoding='utf-8') as f:
    orig = json.load(f)

# Backup
shutil.copy('src/data/vocab/n5_vocab.json', 'src/data/vocab/n5_vocab.backup.json')

def clean_alpha(romaji):
    for ch in romaji:
        if ch.isalpha():
            return ch.upper()
    return 'A'

# 1. NOUNS
final_nouns = {}
for item in orig.get('nouns', []):
    item['alphabet'] = clean_alpha(item['romaji'])
    final_nouns[item['romaji'].lower()] = item

for mod in [nouns_food_dining, nouns_home_daily, nouns_people_society, nouns_travel_places, nouns_culture_abstract, nouns_extended_az, nouns_science_economy]:
    for e in mod.DATA:
        key = e[0].lower()
        if key not in final_nouns:
            final_nouns[key] = {
                'alphabet': clean_alpha(e[0]),
                'romaji': e[0],
                'hiragana': e[1],
                'katakana': e[2],
                'kanji': e[3],
                'meaning': e[4],
                'topic': e[5]
            }

# 2. VERBS
final_verbs = {}
for item in orig.get('verbs', []):
    item['alphabet'] = clean_alpha(item['romaji'])
    final_verbs[item['romaji'].lower()] = item

for mod in [verbs_actions_movement, verbs_social_communication, verbs_daily_cooking_body, verbs_mind_work_study, verbs_comprehensive_az, verbs_compound_and_jlpt, verbs_extended_advanced]:
    for e in mod.DATA:
        key = e[0].lower()
        if key not in final_verbs:
            final_verbs[key] = {
                'alphabet': clean_alpha(e[0]),
                'romaji': e[0],
                'hiragana': e[1],
                'katakana': e[2],
                'kanji': e[3],
                'meaning': e[4],
                'type': e[5],
                'topic': e[6]
            }

# 3. ADJECTIVES
final_adjectives = {}
for item in orig.get('adjectives', []):
    item['alphabet'] = clean_alpha(item['romaji'])
    final_adjectives[item['romaji'].lower()] = item

for mod in [adjectives_emotions_personality, adjectives_senses_appearance, adjectives_states_qualities, adjectives_advanced_az, adjectives_compounds_and_patterns, adjectives_sino_japanese_jlpt, adjectives_extended_all_az, adjectives_more_extended]:
    for e in mod.DATA:
        key = e[0].lower()
        if key not in final_adjectives:
            final_adjectives[key] = {
                'alphabet': clean_alpha(e[0]),
                'romaji': e[0],
                'hiragana': e[1],
                'katakana': e[2],
                'kanji': e[3],
                'meaning': e[4],
                'type': e[5],
                'topic': e[6]
            }

# 4. ADVERBS
final_adverbs = {}
for item in orig.get('adverbs', []):
    item['alphabet'] = clean_alpha(item['romaji'])
    final_adverbs[item['romaji'].lower()] = item

for mod in [adverbs_onomatopoeia_gitaigo, adverbs_time_frequency_speed, adverbs_degree_quantity_manner, adverbs_discourse_logic_modal, adverbs_comprehensive_az_part1, adverbs_comprehensive_az_part2, adverbs_more_az]:
    for e in mod.DATA:
        key = e[0].lower()
        if key not in final_adverbs:
            final_adverbs[key] = {
                'alphabet': clean_alpha(e[0]),
                'romaji': e[0],
                'hiragana': e[1],
                'katakana': e[2],
                'kanji': e[3],
                'meaning': e[4],
                'topic': e[5]
            }

# 5. PHRASES
final_phrases = {}
for item in orig.get('phrases', []):
    item['alphabet'] = clean_alpha(item['romaji'])
    final_phrases[item['romaji'].lower()] = item

for mod in [phrases_daily_conversation, phrases_travel_dining_shopping, phrases_business_work_school, phrases_emotions_reactions_culture, phrases_conversational_az_part1, phrases_conversational_az_part2, phrases_conversational_az_part3, phrases_conversational_az_part4, phrases_conversational_az_part5, phrases_conversational_az_part6, phrases_conversational_az_part7, phrases_conversational_az_part8]:
    for e in mod.DATA:
        key = e[0].lower()
        if key not in final_phrases:
            final_phrases[key] = {
                'alphabet': clean_alpha(e[0]),
                'romaji': e[0],
                'hiragana': e[1],
                'katakana': e[2],
                'kanji': e[3],
                'meaning': e[4],
                'topic': e[5]
            }

# Sort all categories alphabetically by romaji
sorted_nouns = sorted(final_nouns.values(), key=lambda x: x['romaji'].lower())
sorted_verbs = sorted(final_verbs.values(), key=lambda x: x['romaji'].lower())
sorted_adjectives = sorted(final_adjectives.values(), key=lambda x: x['romaji'].lower())
sorted_adverbs = sorted(final_adverbs.values(), key=lambda x: x['romaji'].lower())
sorted_phrases = sorted(final_phrases.values(), key=lambda x: x['romaji'].lower())

updated_data = {
    'level': orig.get('level', 'N5'),
    'nouns': sorted_nouns,
    'verbs': sorted_verbs,
    'adjectives': sorted_adjectives,
    'adverbs': sorted_adverbs,
    'phrases': sorted_phrases
}

with open('src/data/vocab/n5_vocab.json', 'w', encoding='utf-8') as f:
    json.dump(updated_data, f, ensure_ascii=False, indent=2)

print("SUCCESSFULLY APPLIED EXPANSION TO src/data/vocab/n5_vocab.json")
print(f"Nouns count: {len(sorted_nouns)}")
print(f"Verbs count: {len(sorted_verbs)}")
print(f"Adjectives count: {len(sorted_adjectives)}")
print(f"Adverbs count: {len(sorted_adverbs)}")
print(f"Phrases count: {len(sorted_phrases)}")
print(f"Grand Total Vocabulary: {len(sorted_nouns) + len(sorted_verbs) + len(sorted_adjectives) + len(sorted_adverbs) + len(sorted_phrases)}")
