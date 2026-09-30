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
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {'level': lvl.upper(), 'nouns': [], 'verbs': [], 'adjectives': [], 'adverbs': [], 'phrases': []}

def save_level(lvl, data):
    p = f'src/data/vocab/{lvl}_vocab.json'
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ==================== N3 MASTER LIST ====================
N3_NOUNS = [
    ("aidea", "あいであ", "アイデア", "idea / concept", "Abstract"),
    ("aibou", "あいぼう", "相棒", "partner / buddy / accomplice", "Society"),
    ("aizou", "あいぞう", "愛憎", "love and hatred", "Emotions"),
    ("aizu", "あいず", "合図", "sign / signal", "Communication"),
    ("akari", "あかり", "明かり", "light / illumination", "Nature & Animals"),
    ("akaji", "あかじ", "赤字", "deficit / in the red", "Economy"),
    ("akushu", "あくしゅ", "握手", "handshake", "Society"),
    ("akuma", "あくま", "悪魔", "devil / demon", "Culture & Arts"),
    ("amagumo", "あまぐも", "雨雲", "rain cloud", "Nature & Animals"),
    ("amado", "あまど", "雨戸", "storm shutter", "Home & Daily"),
    ("amari", "あまり", "余り", "remainder / surplus", "Abstract"),
    ("anata", "あなた", "貴方", "you (polite)", "People & Family"),
    ("an'i", "あんい", "安易", "easy-going / simplistic", "Abstract"),
    ("antei", "あんてい", "安定", "stability / equilibrium", "Abstract"),
    ("anzenmen", "あんぜんめん", "安全面", "safety aspect", "Society"),
    ("arashi", "あらし", "嵐", "storm / tempest", "Nature & Animals"),
    ("arasoi", "あらそい", "争い", "dispute / strife / conflict", "Society"),
    ("aratamari", "あらたまり", "改まり", "formality / solemnity", "Society"),
    ("ashiato", "あしあと", "足跡", "footprints / tracks", "Nature & Animals"),
    ("ashikubi", "あしくび", "足首", "ankle", "Body & Health"),
    ("asobi", "あそび", "遊び", "play / game / amusement", "Culture & Arts"),
    ("atatakasa", "あたたかさ", "温かさ", "warmth / kindness", "Emotions"),
    ("atsuryoku", "あつりょく", "圧力", "pressure / stress", "Science"),
    ("awase", "あわせ", "合わせ", "combination / joint", "Abstract"),
    ("azami", "あざみ", "薊", "thistle flower", "Nature & Animals"),
    ("azukari", "あずかり", "預かり", "custody / deposit", "Society"),
    ("bamen", "ばめん", "場面", "scene / setting / occasion", "Culture & Arts"),
    ("bando", "ばんど", "バンド", "musical band / strap", "Culture & Arts"),
    ("bangumi", "ばんぐみ", "番組", "television program / show", "Culture & Arts"),
    ("banken", "ばんけん", "番犬", "watchdog / guard dog", "Nature & Animals"),
    ("bansen", "ばんせん", "番線", "platform track number", "Travel & Places"),
    ("bassui", "ばっすい", "抜粋", "extract / excerpt", "Culture & Arts"),
    ("batsu", "ばつ", "罰", "punishment / penalty", "Society"),
    ("beddo", "べっど", "ベッド", "bed", "Home & Daily"),
    ("bengo", "べんご", "弁護", "defense / advocacy", "Society"),
    ("bengoshi", "べんごし", "弁護士", "attorney / lawyer", "Work & Study"),
    ("bennin", "べんにん", "便利人", "handyman / helper", "Society"),
    ("bentou", "べんとう", "弁当", "boxed lunch (bento)", "Food & Dining"),
    ("beruto", "べると", "ベルト", "belt", "Clothing"),
    ("bideo", "びでお", "ビデオ", "video / tape", "Culture & Arts"),
    ("bin", "びん", "瓶", "glass bottle / jar", "Home & Daily"),
    ("biniiru", "びにーる", "ビニール", "vinyl / plastic", "General"),
    ("biiru", "びーる", "ビール", "beer", "Food & Dining"),
    ("boeki", "ぼうえき", "貿易", "international trade", "Economy"),
    ("bokin", "ぼきん", "募金", "fundraising / collection", "Society"),
    ("bokushi", "ぼくし", "牧師", "pastor / minister", "Society"),
    ("bousai", "ぼうさい", "防災", "disaster prevention", "Society"),
    ("boushi", "ぼうし", "防止", "prevention / check", "Society"),
    ("booru", "ぼーる", "ボール", "ball / sphere", "Culture & Arts"),
    ("bootan", "ぼたん", "ボタン", "button", "Home & Daily"),
    ("buhin", "ぶひん", "部品", "parts / accessories", "Technology"),
    ("buji", "ぶじ", "無事", "safety / peace / no incident", "Society"),
    ("bukka", "ぶっか", "物価", "commodity prices / cost of living", "Economy"),
    ("bun'ya", "ぶんや", "分野", "field / sphere / realm", "Work & Study"),
    ("bunbo", "ぶんぼ", "分母", "denominator", "Science"),
    ("bundan", "ぶんだん", "文壇", "literary circles", "Culture & Arts"),
    ("bunka", "ぶんか", "文化", "culture", "Culture & Arts"),
    ("bunkatsushiki", "ぶんかつしき", "分割式", "split system", "Technology"),
    ("bunrui", "ぶんるい", "分類", "classification / sorting", "Science"),
    ("bunseki", "ぶんせき", "分析", "analysis", "Science"),
    ("bunshi", "ぶんし", "分子", "molecule / numerator", "Science"),
    ("butai", "ぶたい", "舞台", "stage / theatrical scene", "Culture & Arts"),
    ("butsuri", "ぶつり", "物理", "physics", "Science"),
    ("byousha", "びょうしゃ", "描写", "depiction / description", "Culture & Arts"),
    ("byoushin", "びょうしん", "秒針", "second hand of clock", "Technology"),
    ("cha", "ちゃ", "茶", "tea / tea ceremony", "Food & Dining"),
    ("chakuriku", "ちゃくりく", "着陸", "landing / touchdown", "Travel & Places"),
    ("chansu", "ちゃんす", "チャンス", "chance / auspicious opportunity", "Abstract"),
    ("chanto", "ちゃんと", "確り", "properly / neatly", "Daily Life"),
    ("chawan", "ちゃわん", "茶碗", "rice bowl / teacup", "Home & Daily"),
    ("chigai", "ちがい", "違い", "difference / discrepancy", "Abstract"),
    ("chihou", "ちほう", "地方", "region / locality", "Travel & Places"),
    ("chii", "ちい", "地位", "social status / rank", "Society"),
    ("chika", "ちか", "地下", "underground / basement", "Travel & Places"),
    ("chikai", "ちかい", "誓い", "oath / vow", "Communication"),
    ("chiketto", "ちけっと", "チケット", "ticket / pass", "Travel & Places"),
    ("chiki", "ちいき", "地域", "district / area / zone", "Travel & Places"),
    ("chikyuu", "ちきゅう", "地球", "the Earth / globe", "Science"),
    ("chinou", "ちのう", "知能", "intellect / intelligence", "Science"),
    ("chirashi", "ちらし", "チラシ", "promotional flyer / leaflet", "Society"),
    ("chishiki", "ちしき", "知識", "knowledge / information", "Work & Study"),
    ("chokin", "ちょきん", "貯金", "savings / deposit", "Economy"),
    ("chokusen", "ちょくせん", "直線", "straight line", "Science"),
    ("chousa", "ちょうさ", "調査", "investigation / inquiry", "Work & Study"),
    ("chousetsu", "ちょうせつ", "調節", "regulation / tuning", "Technology"),
    ("choushi", "ちょうし", "調子", "condition / state / pitch", "Abstract"),
    ("chouten", "ちょうてん", "頂点", "vertex / apex / summit", "Science"),
    ("chouwa", "ちょうわ", "調和", "harmony / accord", "Abstract"),
    ("chuudoku", "ちゅうどく", "中毒", "poisoning / addiction", "Body & Health"),
    ("chuufuku", "ちゅうふく", "中腹", "mountainside / halfway up", "Travel & Places"),
    ("chuugen", "ちゅうげん", "中元", "Bon festival gift", "Culture & Arts"),
    ("chuujun", "ちゅうじゅん", "中旬", "middle ten days of month", "Time & Space"),
    ("chuukan", "ちゅうかん", "中間", "midway / interim", "Time & Space"),
    ("chuuko", "ちゅうこ", "中古", "used / second-hand", "Economy"),
    ("chuumoku", "ちゅうもく", "注目", "notice / attention", "Communication"),
    ("chuushi", "ちゅうし", "中止", "cancellation / suspension", "Society"),
    ("chuutoi", "ちゅうとう", "中等", "middle grade / secondary", "Work & Study"),
    ("daidokoro", "だいどころ", "台所", "kitchen", "Home & Daily"),
    ("daihyou", "だいひょう", "代表", "representative / model", "Society"),
    ("daika", "だいか", "代価", "price / cost / consideration", "Economy"),
    ("daikin", "だいきん", "代金", "charge / payment fee", "Economy"),
    ("daimei", "だいめい", "題名", "title of book or work", "Culture & Arts"),
    ("daitai", "だいたい", "大体", "outline / general idea", "Abstract"),
    ("daitouryou", "だいとうりょう", "大統領", "president (of nation)", "Society"),
    ("dan", "だん", "段", "step / flight / tier", "General"),
    ("danbou", "だんぼう", "暖房", "indoor heating", "Home & Daily"),
    ("dankai", "だんかい", "段階", "stage / grade / phase", "Abstract"),
    ("dantai", "だんたい", "団体", "group / organization", "Society"),
    ("datou", "だとう", "妥当", "validity / propriety", "Abstract"),
    ("deai", "であい", "出会い", "encounter / meeting", "Society"),
    ("deguchi", "でぐち", "出口", "exit / doorway", "Travel & Places"),
    ("deeta", "でーた", "データ", "data / information", "Technology"),
    ("demukae", "でむかえ", "出迎え", "meeting / greeting arrival", "Travel & Places"),
    ("denbu", "でんぶ", "伝票", "slip / invoice", "Economy"),
    ("dendousha", "でんどうしゃ", "電動車", "electric powered vehicle", "Technology"),
    ("dengon", "でんごん", "伝言", "spoken verbal message", "Communication"),
    ("denkyuu", "でんきゅう", "電球", "light bulb", "Home & Daily"),
    ("denpa", "でんぱ", "電波", "radio waves / cellular signal", "Technology"),
    ("densetsu", "でんせつ", "伝説", "tradition / legend / myth", "Culture & Arts"),
    ("denshi", "でんし", "電子", "electron / electronic", "Technology"),
    ("dentou", "でんとう", "伝統", "tradition / convention", "Culture & Arts"),
    ("dezain", "でざいん", "デザイン", "design / styling", "Culture & Arts"),
    ("doa", "どあ", "ドア", "western door", "Home & Daily"),
    ("dokusou", "どくそう", "独創", "originality / invention", "Culture & Arts"),
    ("dokushin", "どくしん", "独身", "single / unmarried", "Society"),
    ("dokusho", "どくしょ", "読書", "reading", "Work & Study"),
    ("dorafuto", "どらふと", "ドラフト", "draft document", "Work & Study"),
    ("dorama", "どらま", "ドラマ", "television drama", "Culture & Arts"),
    ("doryoku", "どりょく", "努力", "effort", "Abstract"),
    ("doushi", "どうし", "動詞", "verb (linguistics)", "Work & Study"),
    ("doushi_peer", "どうし", "同志", "fellow / kindred soul", "Society"),
    ("doutoku", "どうとく", "道徳", "morals / ethics", "Society"),
    ("douwa", "どうわ", "童話", "fairy tale / children's story", "Culture & Arts"),
    ("douzo", "どうぞ", "どうぞ", "please / go ahead", "Daily Life"),
    ("douzou", "どうぞう", "銅像", "bronze statue", "Culture & Arts")
]

print("N3 data loaded.")
