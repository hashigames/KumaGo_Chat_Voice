"""
Comprehensive Multi-Level JLPT Vocabulary Engine
Expands N5, N4, N3, N2, and N1 vocabulary to surpass 18,500 words.
"""
import json
import os
import sys

sys.path.insert(0, 'scripts/generators')

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

def load_level(lvl):
    p = f'src/data/vocab/{lvl}_vocab.json'
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {'level': lvl.upper(), 'nouns': [], 'verbs': [], 'adjectives': [], 'adverbs': [], 'phrases': []}

def save_level(lvl, data):
    p = f'src/data/vocab/{lvl}_vocab.json'
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def main():
    levels = ['n5', 'n4', 'n3', 'n2', 'n1']
    decks = {lvl: load_level(lvl) for lvl in levels}
    
    # Check current counts
    before_counts = {lvl: sum(len(v) for k, v in decks[lvl].items() if isinstance(v, list)) for lvl in levels}
    print("Before counts:", before_counts, "Total:", sum(before_counts.values()))

    # Import modules from generators
    import nouns_food_dining, nouns_home_daily, nouns_people_society, nouns_travel_places
    import nouns_culture_abstract, nouns_extended_az, nouns_science_economy
    import verbs_actions_movement, verbs_social_communication, verbs_daily_cooking_body
    import verbs_mind_work_study, verbs_comprehensive_az, verbs_compound_and_jlpt, verbs_extended_advanced
    import adjectives_emotions_personality, adjectives_senses_appearance, adjectives_states_qualities
    import adjectives_advanced_az, adjectives_compounds_and_patterns, adjectives_sino_japanese_jlpt
    import adjectives_extended_all_az, adjectives_more_extended
    import adverbs_onomatopoeia_gitaigo, adverbs_time_frequency_speed, adverbs_degree_quantity_manner
    import adverbs_discourse_logic_modal, adverbs_comprehensive_az_part1, adverbs_comprehensive_az_part2, adverbs_more_az
    import phrases_daily_conversation, phrases_travel_dining_shopping, phrases_business_work_school
    import phrases_emotions_reactions_culture, phrases_conversational_az_part1, phrases_conversational_az_part2
    import phrases_conversational_az_part3, phrases_conversational_az_part4, phrases_conversational_az_part5
    import phrases_conversational_az_part6, phrases_conversational_az_part7, phrases_conversational_az_part8

    # Partition generator items across levels systematically
    # Level N4 pool:
    n4_nouns_src = [nouns_food_dining.DATA, nouns_home_daily.DATA, nouns_travel_places.DATA]
    n4_verbs_src = [verbs_actions_movement.DATA, verbs_daily_cooking_body.DATA, verbs_social_communication.DATA]
    n4_adj_src = [adjectives_senses_appearance.DATA, adjectives_emotions_personality.DATA, adjectives_states_qualities.DATA]
    n4_adv_src = [adverbs_time_frequency_speed.DATA, adverbs_degree_quantity_manner.DATA]
    n4_phrases_src = [phrases_daily_conversation.DATA, phrases_travel_dining_shopping.DATA]

    # Level N3 pool:
    n3_nouns_src = [nouns_people_society.DATA, nouns_culture_abstract.DATA, nouns_extended_az.DATA[:180]]
    n3_verbs_src = [verbs_mind_work_study.DATA, verbs_compound_and_jlpt.DATA[:150], verbs_comprehensive_az.DATA]
    n3_adj_src = [adjectives_compounds_and_patterns.DATA, adjectives_sino_japanese_jlpt.DATA[:90], adjectives_extended_all_az.DATA[:130]]
    n3_adv_src = [adverbs_discourse_logic_modal.DATA, adverbs_onomatopoeia_gitaigo.DATA[:100]]
    n3_phrases_src = [phrases_business_work_school.DATA, phrases_emotions_reactions_culture.DATA, phrases_conversational_az_part1.DATA]

    # Level N2 pool:
    n2_nouns_src = [nouns_science_economy.DATA[:200], nouns_extended_az.DATA[180:]]
    n2_verbs_src = [verbs_compound_and_jlpt.DATA[150:], verbs_extended_advanced.DATA[:170]]
    n2_adj_src = [adjectives_sino_japanese_jlpt.DATA[90:], adjectives_advanced_az.DATA[:110], adjectives_more_extended.DATA[:110]]
    n2_adv_src = [adverbs_comprehensive_az_part1.DATA, adverbs_more_az.DATA[:130]]
    n2_phrases_src = [phrases_conversational_az_part2.DATA, phrases_conversational_az_part3.DATA, phrases_conversational_az_part4.DATA]

    # Level N1 pool:
    n1_nouns_src = [nouns_science_economy.DATA[200:]]
    n1_verbs_src = [verbs_extended_advanced.DATA[170:]]
    n1_adj_src = [adjectives_advanced_az.DATA[110:], adjectives_more_extended.DATA[110:]]
    n1_adv_src = [adverbs_comprehensive_az_part2.DATA, adverbs_more_az.DATA[130:]]
    n1_phrases_src = [phrases_conversational_az_part5.DATA, phrases_conversational_az_part6.DATA, phrases_conversational_az_part7.DATA, phrases_conversational_az_part8.DATA]

    def populate(lvl, n_src, v_src, adj_src, adv_src, ph_src):
        d = decks[lvl]
        maps = {cat: {x['romaji'].lower(): x for x in d.get(cat, [])} for cat in ['nouns', 'verbs', 'adjectives', 'adverbs', 'phrases']}
        
        for pool in n_src:
            for e in pool:
                k = e[0].lower()
                if k not in maps['nouns']:
                    maps['nouns'][k] = {'alphabet': clean_alpha(e[0]), 'romaji': e[0], 'hiragana': e[1], 'katakana': e[2], 'kanji': e[3], 'meaning': e[4], 'topic': e[5]}
                    
        for pool in v_src:
            for e in pool:
                k = e[0].lower()
                if k not in maps['verbs']:
                    maps['verbs'][k] = {'alphabet': clean_alpha(e[0]), 'romaji': e[0], 'hiragana': e[1], 'katakana': e[2], 'kanji': e[3], 'meaning': e[4], 'type': e[5], 'topic': e[6]}

        for pool in adj_src:
            for e in pool:
                k = e[0].lower()
                if k not in maps['adjectives']:
                    maps['adjectives'][k] = {'alphabet': clean_alpha(e[0]), 'romaji': e[0], 'hiragana': e[1], 'katakana': e[2], 'kanji': e[3], 'meaning': e[4], 'type': e[5], 'topic': e[6]}

        for pool in adv_src:
            for e in pool:
                k = e[0].lower()
                if k not in maps['adverbs']:
                    maps['adverbs'][k] = {'alphabet': clean_alpha(e[0]), 'romaji': e[0], 'hiragana': e[1], 'katakana': e[2], 'kanji': e[3], 'meaning': e[4], 'topic': e[5]}

        for pool in ph_src:
            for e in pool:
                k = e[0].lower()
                if k not in maps['phrases']:
                    maps['phrases'][k] = {'alphabet': clean_alpha(e[0]), 'romaji': e[0], 'hiragana': e[1], 'katakana': e[2], 'kanji': e[3], 'meaning': e[4], 'topic': e[5]}

        for cat in ['nouns', 'verbs', 'adjectives', 'adverbs', 'phrases']:
            d[cat] = sorted(list(maps[cat].values()), key=lambda x: x['romaji'].lower())

    populate('n4', n4_nouns_src, n4_verbs_src, n4_adj_src, n4_adv_src, n4_phrases_src)
    populate('n3', n3_nouns_src, n3_verbs_src, n3_adj_src, n3_adv_src, n3_phrases_src)
    populate('n2', n2_nouns_src, n2_verbs_src, n2_adj_src, n2_adv_src, n2_phrases_src)
    populate('n1', n1_nouns_src, n1_verbs_src, n1_adj_src, n1_adv_src, n1_phrases_src)

    # Save all levels
    for lvl in levels:
        save_level(lvl, decks[lvl])

    after_counts = {lvl: sum(len(v) for k, v in decks[lvl].items() if isinstance(v, list)) for lvl in levels}
    print("After counts:", after_counts, "Total words in kumaGO:", sum(after_counts.values()))

if __name__ == '__main__':
    main()
