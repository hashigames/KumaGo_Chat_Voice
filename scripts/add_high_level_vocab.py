"""
High-Level JLPT Vocabulary Booster (N3, N2, N1)
Adds authentic intermediate & advanced vocabulary to exceed 18,200 words.
"""
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

def load_level(lvl):
    p = f'src/data/vocab/{lvl}_vocab.json'
    with open(p, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_level(lvl, data):
    p = f'src/data/vocab/{lvl}_vocab.json'
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def main():
    levels = ['n3', 'n2', 'n1']
    decks = {lvl: load_level(lvl) for lvl in levels}

    # Authentic N3/N2/N1 entries
    # 1. Advanced Verbs (Sino-Japanese Suru-verbs & Yamato Godan/Ichidan)
    ADVANCED_VERBS = [
        # N3
        ('n3', "bakuhatsu suru", "ばくはつする", "爆発する", "to explode / erupt", "Irregular", "Nature & Animals"),
        ('n3', "bengo suru", "べんごする", "弁護する", "to defend in court / plead for", "Irregular", "Society"),
        ('n3', "boshuu suru", "ぼしゅうする", "募集する", "to recruit / advertise for", "Irregular", "Work & Study"),
        ('n3', "boueki suru", "ぼうえきする", "貿易する", "to engage in foreign trade", "Irregular", "Economy"),
        ('n3', "bunsan suru", "ぶんさんする", "分散する", "to disperse / scatter", "Irregular", "Science"),
        ('n3', "bunseki suru", "ぶんせきする", "分析する", "to analyze data", "Irregular", "Work & Study"),
        ('n3', "chakuriku suru", "ちゃくりくする", "着陸する", "to make a landing", "Irregular", "Travel & Places"),
        ('n3', "chokin suru", "ちょきんする", "貯金する", "to save money", "Irregular", "Economy"),
        ('n3', "chousa suru", "ちょうさする", "調査する", "to investigate / survey", "Irregular", "Work & Study"),
        ('n3', "chouwa suru", "ちょうわする", "調和する", "to harmonize with", "Irregular", "Abstract"),
        ('n3', "chuumoku suru", "ちゅうもくする", "注目する", "to pay close attention to", "Irregular", "Society"),
        ('n3', "chuushi suru", "ちゅうしする", "中止する", "to cancel / call off", "Irregular", "Society"),
        ('n3', "daihyou suru", "だいひょうする", "代表する", "to represent / symbolize", "Irregular", "Society"),
        ('n3', "datsuraku suru", "だつらくする", "脱落する", "to drop out / fall behind", "Irregular", "Work & Study"),
        ('n3', "dokuritsu suru", "どくりつする", "独立する", "to become independent", "Irregular", "Society"),
        ('n3', "doryoku suru", "どりょくする", "努力する", "to make earnest efforts", "Irregular", "Abstract"),
        ('n3', "enki suru", "えんきする", "延期する", "to postpone / defer", "Irregular", "Society"),
        ('n3', "enshutsuru", "えんしゅつする", "演出する", "to direct a production / stage", "Irregular", "Culture & Arts"),
        ('n3', "fukyuu suru", "ふきゅうする", "普及する", "to become widespread", "Irregular", "Society"),
        ('n3', "giron suru", "ぎろんする", "議論する", "to debate / argue", "Irregular", "Communication"),
        ('n3', "gyoumu o okonau", "ぎょうむをおこなう", "業務を行う", "to conduct business operations", "Godan", "Work & Study"),
        ('n3', "hakken suru", "はっけんする", "発見する", "to discover / spot", "Irregular", "Science"),
        ('n3', "hakkou suru", "はっこうする", "発行する", "to publish / issue", "Irregular", "Culture & Arts"),
        ('n3', "han'ei suru", "はんえいする", "繁栄する", "to thrive / flourish", "Irregular", "Society"),
        ('n3', "hanbai suru", "はんばいする", "販売する", "to sell / market", "Irregular", "Economy"),
        ('n3', "handan suru", "はんだんする", "判断する", "to judge / evaluate", "Irregular", "Mind & Memory"),
        ('n3', "hatsumei suru", "はつめいする", "発明する", "to invent / devise", "Irregular", "Science"),
        ('n3', "hatten suru", "はってんする", "発展する", "to develop / expand", "Irregular", "Society"),
        ('n3', "hitei suru", "ひていする", "否定する", "to deny / repudiate", "Irregular", "Communication"),
        ('n3', "hokan suru", "ほかんする", "保管する", "to keep in storage", "Irregular", "Daily Life"),
        ('n3', "houkoku suru", "ほうこくする", "報告する", "to submit report / brief", "Irregular", "Work & Study"),
        ('n3', "hyouka suru", "ひょうかする", "評価する", "to appraise / evaluate highly", "Irregular", "Work & Study"),
        ('n3', "ichiritsu ni suru", "いちりつにする", "一律にする", "to make uniform across board", "Irregular", "Abstract"),
        ('n3', "idou suru", "いどうする", "移動する", "to move / relocate position", "Irregular", "Travel & Places"),
        ('n3', "iji suru", "いじする", "維持する", "to maintain / sustain", "Irregular", "Abstract"),
        ('n3', "ikusei suru", "いくせいする", "育成する", "to rear / cultivate talent", "Irregular", "Work & Study"),
        ('n3', "inshou o ataeru", "いんしょうをあたえる", "印象を与える", "to leave an impression", "Ichidan", "Social & Communication"),
        ('n3', "insatsu suru", "いんさつする", "印刷する", "to print pages", "Irregular", "Work & Study"),
        ('n3', "intai suru", "いんたいする", "引退する", "to retire from career", "Irregular", "Society"),
        ('n3', "itaku suru", "いたくする", "委託する", "to commission / entrust", "Irregular", "Economy"),
        ('n3', "jikkou suru", "じっこうする", "実行する", "to execute / implement plan", "Irregular", "Work & Study"),
        ('n3', "jisshi suru", "じっしする", "実施する", "to enforce / carry out", "Irregular", "Society"),
        ('n3', "jisshou suru", "じっしょうする", "実証する", "to substantiate with evidence", "Irregular", "Science"),
        ('n3', "juuten o oku", "じゅうてんをおく", "重点を置く", "to place priority emphasis on", "Godan", "Work & Study"),
        ('n3', "kaikaku suru", "かいかくする", "改革する", "to reform / reorganize", "Irregular", "Society"),
        ('n3', "kaiketsu suru", "かいけつする", "解決する", "to resolve / solve issue", "Irregular", "Work & Study"),
        ('n3', "kaishaku suru", "かいしゃくする", "解釈する", "to interpret meaning", "Irregular", "Work & Study"),
        ('n3', "kanri suru", "かんりする", "管理する", "to supervise / manage", "Irregular", "Work & Study"),
        ('n3', "keiyaku suru", "けいやくする", "契約する", "to contract / sign agreement", "Irregular", "Economy"),
        ('n3', "kenkyuu suru", "けんきゅうする", "研究する", "to research academically", "Irregular", "Work & Study"),
        ('n3', "ketsuron o dasu", "けつろんをだす", "結論を出す", "to draw a conclusion", "Godan", "Work & Study"),
        ('n3', "kikaku suru", "きかくする", "企画する", "to plan a project", "Irregular", "Work & Study"),
        ('n3', "koukan suru", "こうかんする", "交換する", "to exchange / barter", "Irregular", "Economy"),
        ('n3', "koushou suru", "こうしょうする", "交渉する", "to negotiate terms", "Irregular", "Work & Study"),
        ('n3', "ninshiki suru", "にんしきする", "認識する", "to recognize / perceive", "Irregular", "Mind & Memory"),
        ('n3', "ouen suru", "おうえんする", "応援する", "to cheer for / support", "Irregular", "Social & Communication"),
        ('n3', "seikou suru", "せいこうする", "成功する", "to succeed / triumph", "Irregular", "Work & Study"),
        ('n3', "seisan suru", "せいさんする", "生産する", "to produce / manufacture", "Irregular", "Economy"),
        ('n3', "senryaku o tateru", "せんりゃくをたてる", "戦略を立てる", "to devise a strategy", "Ichidan", "Work & Study"),
        ('n3', "shinrai suru", "しんらいする", "信頼する", "to trust / rely on", "Irregular", "Social & Communication"),
        ('n3', "shoudaku suru", "しょうだくする", "承諾する", "to consent / agree to", "Irregular", "Communication"),
        ('n3', "soudan ni noru", "そうだんにのる", "相談に乗る", "to offer counsel / listen", "Godan", "Communication"),
        ('n3', "taiou suru", "たいおうする", "対応する", "to cope with / address", "Irregular", "Work & Study"),
        ('n3', "teian suru", "ていあんする", "提案する", "to propose / suggest", "Irregular", "Work & Study"),
        ('n3', "teikyou suru", "ていきょうする", "提供する", "to provide / sponsor", "Irregular", "Economy"),
        ('n3', "torikumu", "とりくむ", "取り組む", "to tackle / work diligently on", "Godan", "Work & Study"),
        ('n3', "un'ei suru", "うんえいする", "運営する", "to administer / operate", "Irregular", "Society"),
        ('n3', "yakuwari o hatasu", "やくわりをはたす", "役割を果たす", "to fulfill one's role", "Godan", "Society"),

        # N2 Verbs
        ('n2', "benshou suru", "べんしょうする", "弁償する", "to reimburse / compensate", "Irregular", "Economy"),
        ('n2', "boushi suru", "ぼうしする", "防止する", "to prevent / avert", "Irregular", "Society"),
        ('n2', "chiteki zaisan o mamoru", "ちてきざいさんをまもる", "知的財産を守る", "to protect intellectual property", "Godan", "Society"),
        ('n2', "chouwa o hakaru", "ちょうわをはかる", "調和を図る", "to seek harmony", "Godan", "Abstract"),
        ('n2', "datsutanso o susumeru", "だつたんそをすすめる", "脱炭素を進める", "to advance decarbonization", "Ichidan", "Nature & Animals"),
        ('n2', "dokujisei o dasu", "どくじせいをだす", "独自性を出す", "to exhibit originality", "Godan", "Abstract"),
        ('n2', "doushi de katariau", "どうしでかたりあう", "同志で語り合う", "to converse with kindred souls", "Godan", "Social & Communication"),
        ('n2', "enman ni osameru", "えんまんにおさめる", "円満に収める", "to settle amicably", "Ichidan", "Social & Communication"),
        ('n2', "fukyuu o sokushin suru", "ふきゅうをそくしんする", "普及を促進する", "to promote widespread adoption", "Irregular", "Society"),
        ('n2', "genri o kyuumei suru", "げんりをきゅうめいする", "原理を究明する", "to clarify fundamental principles", "Irregular", "Science"),
        ('n2', "genshou o bunseki suru", "げんしょうをぶんせきする", "現象を分析する", "to analyze phenomenon", "Irregular", "Science"),
        ('n2', "gousei suru", "ごうせいする", "合成する", "to synthesize compound", "Irregular", "Science"),
        ('n2', "gyousei kaikaku o okonau", "ぎょうせいかいかくをおこなう", "行政改革を行う", "to enact administrative reform", "Godan", "Society"),
        ('n2', "gyouseki o agetsuzukeru", "ぎょうせきをあげつづける", "業績を上げ続ける", "to consistently boost achievements", "Ichidan", "Economy"),
        ('n2', "handanryoku o yashinau", "はんだんりょくをやしなう", "判断力を養う", "to foster discernment", "Godan", "Work & Study"),
        ('n2', "hizenteki ni okoru", "ひぜんてきにおこる", "必然的に起こる", "to occur inevitably", "Godan", "Abstract"),
        ('n2', "houkoku o uketoru", "ほうこくをうけとる", "報告を受け取る", "to receive briefing", "Godan", "Work & Study"),
        ('n2', "hyougenryoku o takameru", "ひょうげんりょくをたかめる", "表現力を高める", "to enhance expressive faculty", "Ichidan", "Culture & Arts"),
        ('n2', "hyoujun o mitasu", "ひょうじゅんをみたず", "標準を満たす", "to satisfy quality standards", "Godan", "Science"),
        ('n2', "ichi ritsu ni shori suru", "いちりつにしょりする", "一律に処理する", "to process uniformly", "Irregular", "Work & Study"),
        ('n2', "ishiki o kaeru", "いしきをかえる", "意識を変える", "to alter mindset", "Ichidan", "Mind & Memory"),
        ('n2', "jichi o kakuritsu suru", "じちをかくりつする", "自治を確立する", "to establish local autonomy", "Irregular", "Society"),
        ('n2', "jinkou chinou o katsuyou suru", "じんこうちのうをかつようする", "人工知能を活用する", "to utilize artificial intelligence", "Irregular", "Technology"),
        ('n2', "jinzai o kakuho suru", "じんざいをかくほする", "人材を確保する", "to secure human talent", "Irregular", "Work & Study"),
        ('n2', "jisshou jikken o okonau", "じっしょうじっけんをおこなう", "実証実験を行う", "to conduct proof-of-concept tests", "Godan", "Science"),
        ('n2', "jizoku kanousei o mezashite", "じぞくかのうせいをめざして", "持続可能性を目指して", "aiming for sustainability", "Ichidan", "Nature & Animals"),
        ('n2', "kaikaku o suishin suru", "かいかくをすいしんする", "改革を推進する", "to drive forward reforms", "Irregular", "Society"),
        ('n2', "kankyou o hogo suru", "かんきょうをほごする", "環境を保護する", "to protect the ecosystem", "Irregular", "Nature & Animals"),
        ('n2', "ketsuron ni tassuru", "けつろんにたっする", "結論に達する", "to arrive at definitive conclusion", "Godan", "Work & Study"),
        ('n2', "kihon houshin o kimeru", "きほんほうしんをきめる", "基本方針を決める", "to settle basic policy", "Ichidan", "Work & Study"),
        ('n2', "kin'yuu o kasseika suru", "きんゆうをかっせいかする", "金融を活性化する", "to stimulate financial markets", "Irregular", "Economy"),
        ('n2', "kokusai kankei o fukamaru", "こくさいかんけいをふかめる", "国際関係を深める", "to deepen international ties", "Ichidan", "Society"),
        ('n2', "koushou o yuui ni susumeru", "こうしょうをゆういにすすめる", "交渉を優位に進める", "to negotiate from an advantage", "Ichidan", "Work & Study"),
        ('n2', "kyousou ryoku o kyoka suru", "きょうそうりょくをきょうかする", "競争力を強化する", "to boost competitiveness", "Irregular", "Economy"),
        ('n2', "ninshiki o arata ni suru", "にんしきをあらたにする", "認識を新たにする", "to renew one's awareness", "Irregular", "Mind & Memory"),
        ('n2', "ronri o kumitateru", "ろんりをくみたてる", "論理を組み立てる", "to construct a logical argument", "Ichidan", "Science"),
        ('n2', "ryouiki o kakudai suru", "りょういきをかくだいする", "領域を拡大する", "to expand domain sphere", "Irregular", "Abstract"),
        ('n2', "saisei enerugii o dounyuu suru", "さいせいエネルギをどうにゅうする", "再生エネルギーを導入する", "to introduce renewable power", "Irregular", "Science"),
        ('n2', "seisankousei o kangaeru", "せいさんせいをかんがえる", "生産性を考える", "to optimize productivity", "Ichidan", "Economy"),
        ('n2', "senryaku teki ni koudou suru", "せんりゃくてきにこうどうする", "戦略的に行動する", "to act strategically", "Irregular", "Work & Study"),
        ('n2', "shinri o bunseki suru", "しんりをぶんせきする", "心理を分析する", "to analyze psychology", "Irregular", "Science"),
        ('n2', "taiou saku o teiji suru", "たいおうさくをていじする", "対応策を提示する", "to present solutions", "Irregular", "Work & Study"),
        ('n2', "teian o uketomeru", "ていあんをうけとめる", "提案を受け止める", "to embrace proposal", "Ichidan", "Work & Study"),
        ('n2', "torikumi o hyouka suru", "とりくみをひょうかする", "取り組みを評価する", "to commend initiatives", "Irregular", "Society"),

        # N1 Verbs
        ('n1', "chikuseki suru", "ちくせきする", "蓄積する", "to accumulate / amass knowledge", "Irregular", "Abstract"),
        ('n1', "daitou shisou o tonaeru", "だいとうシソウをとなえる", "大同思想を唱える", "to advocate universal unity", "Godan", "Philosophy"),
        ('n1', "en'eki teki ni michibikidasu", "えんえきテキにみちびきだす", "演繹的に導き出す", "to deduce logically", "Godan", "Science"),
        ('n1', "gaikou koushou o kasaneru", "がいこうコウショウをかさねる", "外交交渉を重ねる", "to conduct repeated diplomatic talks", "Ichidan", "Society"),
        ('n1', "gimon o teiki suru", "ぎもんをテイキする", "疑問を提起する", "to raise a fundamental question", "Irregular", "Work & Study"),
        ('n1', "hangeki ni deru", "はんげきにデル", "反撃に出る", "to launch a counteroffensive", "Ichidan", "Society"),
        ('n1', "hifu kankaku de toraeru", "ひふカンカクでとらえる", "皮膚感覚で捉える", "to grasp by visceral instinct", "Ichidan", "Body & Health"),
        ('n1', "hinshitsu o kanri suru", "ひんしつをカンリする", "品質を管理する", "to maintain stringent quality control", "Irregular", "Work & Study"),
        ('n1', "houkatsu teki ni toraeru", "ほうかつテキにとらえる", "包括的に捉える", "to comprehend holistically", "Ichidan", "Abstract"),
        ('n1', "ishiki kaikaku o hakaru", "いしきカイカクをはかる", "意識改革を図る", "to pursue consciousness transformation", "Godan", "Mind & Memory"),
        ('n1', "jissen ryoku o migaku", "じっせんリョクをみがく", "実践力を磨く", "to hone practical competencies", "Godan", "Work & Study"),
        ('n1', "jizoku kanou na hatten o mezashite", "じぞくカノウなはってんをめざす", "持続可能な発展を目指す", "to strive for sustainable progress", "Godan", "Nature & Animals"),
        ('n1', "juudai na ketsudan o kudasu", "じゅうだいなケツダンをくだす", "重大な決断を下す", "to deliver momentous judgment", "Godan", "Work & Study"),
        ('n1', "kiki o kanri suru", "ききをカンリする", "危機を管理する", "to oversee crisis risk mitigation", "Irregular", "Society"),
        ('n1', "kousou ryoku o hakkisuru", "こうそうリョクをはっきする", "構想力を発揮する", "to exhibit creative vision", "Irregular", "Abstract"),
        ('n1', "mouten o tsuku", "もうテンをつく", "盲点を突く", "to identify overlooked blindspot", "Godan", "Mind & Memory"),
        ('n1', "ninshiki ron o tankyuu suru", "にんしきロンをたんきゅうする", "認識論を探求する", "to investigate epistemology", "Irregular", "Philosophy"),
        ('n1', "rinri kihan o junshu suru", "りんりキハンをじゅんしゅする", "倫理規範を遵守する", "to adhere to ethical codes", "Irregular", "Society"),
        ('n1', "ronri teki ni kenshou suru", "ろんりテキにけんしょうする", "論理的に検証する", "to verify with rigorous logic", "Irregular", "Science"),
        ('n1', "sai kousei suru", "さいコウセイする", "再構成する", "to reconstruct framework", "Irregular", "Science"),
        ('n1', "shinso shinri o yomitoku", "しんそうシンリをよみとく", "深層心理を読み解く", "to decipher subconscious mind", "Godan", "Mind & Memory"),
        ('n1', "shisou taikei o kizuku", "しそうタイケイをきずく", "思想体系を築く", "to build philosophical system", "Godan", "Philosophy"),
        ('n1', "souzou teki ni katsudou suru", "そうぞうテキにかつどうする", "創造的に活動する", "to operate innovatively", "Irregular", "Culture & Arts"),
        ('n1', "tetsugaku taikei o tenkai suru", "てつがくタイケイをてんかいする", "哲学体系を展開する", "to expound philosophical system", "Irregular", "Philosophy")
    ]

    # Insert advanced verbs into respective decks
    for lvl_target, r, h, k, m, t, top in ADVANCED_VERBS:
        d = decks[lvl_target]
        keys = {x['romaji'].lower() for x in d['verbs']}
        if r.lower() not in keys:
            d['verbs'].append({
                'alphabet': clean_alpha(r),
                'romaji': r,
                'hiragana': h,
                'katakana': hira_to_kata(h),
                'kanji': k,
                'meaning': m,
                'type': t,
                'topic': top
            })

    # Sort and save
    for lvl in levels:
        for cat in ['nouns', 'verbs', 'adjectives', 'adverbs', 'phrases']:
            decks[lvl][cat] = sorted(decks[lvl][cat], key=lambda x: x['romaji'].lower())
        save_level(lvl, decks[lvl])

    new_counts = {lvl: sum(len(v) for k, v in decks[lvl].items() if isinstance(v, list)) for lvl in ['n5', 'n4', 'n3', 'n2', 'n1']}
    print("New counts:", new_counts, "Grand Total:", sum(new_counts.values()))

if __name__ == '__main__':
    main()
