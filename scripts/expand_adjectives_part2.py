import json

raw_adjectives_part2 = [
    # M
    ("mabushii", "まぶしい", "マブシイ", "眩しい", "dazzling / glaring / radiant", "i-adjective", "Appearance & Style"),
    ("majime", "まじめ", "マジメ", "真面目", "diligent / earnest / solemn", "na-adjective", "Character & Personality"),
    ("mazui", "まずい", "マズイ", "不味い", "unpalatable / unappetizing / awful", "i-adjective", "Food & Taste"),
    ("marui", "まるい", "マルイ", "丸い", "circular / round / spherical", "i-adjective", "Shapes & Measures"),
    ("masshiro", "まっしろ", "マッシロ", "真っ白", "pure snow-white", "na-adjective", "Colors & Styles"),
    ("massugu", "まっすぐ", "マッスグ", "真っ直ぐ", "straight / forthright / direct", "na-adjective", "Shapes & Measures"),
    ("mattaku", "まったく", "マッタク", "全く", "entirely / truly", "na-adjective", "Degree & Intensity"),
    ("mayoigachi", "まよいがち", "マヨイガチ", "迷いがち", "prone to hesitation", "na-adjective", "Character & Personality"),
    ("me-atarashii", "めあたらしい", "メアタラシイ", "目新しい", "novel / innovative", "i-adjective", "Praise & Quality"),
    ("meikaku", "めいかく", "メイカク", "明確", "crystal-clear / explicit", "na-adjective", "Character & Clarity"),
    ("meiryou", "めいりょう", "メイリョウ", "明瞭", "articulate / distinct", "na-adjective", "Character & Clarity"),
    ("mendou", "めんどう", "メンドウ", "面倒", "cumbersome / troublesome / nuisance", "na-adjective", "Conditions & States"),
    ("mendoukusai", "めんどうくさい", "メンドウクサイ", "面倒くさい", "bothersome / tiresome", "i-adjective", "Emotions & Mind"),
    ("mezurashii", "めずらしい", "メズラシイ", "珍しい", "rare / precious / uncommon", "i-adjective", "Praise & Quality"),
    ("mijikai", "みじかい", "ミジカイ", "短い", "short in duration or length", "i-adjective", "Shapes & Measures"),
    ("migoto", "みごと", "ミゴト", "見事", "magnificent / admirable / stellar", "na-adjective", "Praise & Quality"),
    ("minikui", "みにくい", "ミニクイ", "醜い", "ugly / unseemly", "i-adjective", "Appearance & Style"),
    ("miren", "みれん", "ミレン", "未練", "lingering attachment", "na-adjective", "Emotions & Mind"),
    ("miryoku-teki", "みりょくてき", "ミリョクテキ", "魅力的", "fascinating / magnetic / alluring", "na-adjective", "Praise & Quality"),
    ("mitsuna", "みつ", "ミツ", "密", "dense / closely packed / crowded", "na-adjective", "Conditions & States"),
    ("mizumizushii", "みずみずしい", "ミズミズシイ", "瑞々しい", "fresh and juicy / lustrous", "i-adjective", "Food & Taste"),
    ("modokashii", "もどかしい", "モドカシイ", "もどかしい", "tantalizing / frustratingly slow", "i-adjective", "Emotions & Mind"),
    ("monodarinai", "ものたりない", "モノタリナイ", "物足りない", "leaving something to be desired", "i-adjective", "Emotions & Mind"),
    ("mottainai", "もったいない", "モッタイナイ", "勿体無い", "wasteful / too good for", "i-adjective", "Emotions & Mind"),
    ("muda", "むだ", "ムダ", "無駄", "futile / wasteful / point-less", "na-adjective", "Conditions & States"),
    ("mugon", "むごん", "ムゴン", "無言", "wordless / mute / silent", "na-adjective", "Social & Communication"),
    ("mujaki", "むじゃき", "ムジャキ", "無邪気", "innocent / naive / childlike", "na-adjective", "Character & Personality"),
    ("muri", "むり", "ムリ", "無理", "unreasonable / impossible / forced", "na-adjective", "Conditions & States"),
    ("muzukashii", "むずかしい", "ムズカシイ", "難しい", "hard / difficult / daunting", "i-adjective", "Conditions & States"),

    # N
    ("nagai", "ながい", "ナガイ", "長い", "long (distance / time)", "i-adjective", "Shapes & Measures"),
    ("nagabiku", "ながびく", "ナガビク", "長引く", "prolonged / dragging on", "na-adjective", "Speed & Time"),
    ("nagayaka", "なごやか", "ナゴヤカ", "和やか", "harmonious / peaceful / amicable", "na-adjective", "Emotions & Mind"),
    ("nama", "なま", "ナマ", "生", "raw / fresh / unpasteurized", "na-adjective", "Food & Taste"),
    ("nameraka", "なめらか", "ナメラカ", "滑らか", "silky smooth / fluid", "na-adjective", "Conditions & States"),
    ("namagusai", "なまぐさい", "ナマグサイ", "生臭い", "fishy-smelling / pungent", "i-adjective", "Food & Taste"),
    ("nanboku", "なんぼく", "ナンボク", "南北", "north-south", "na-adjective", "Places & Spatial"),
    ("nan-dome", "なんどめ", "ナンドメ", "何度目", "for the several-th time", "na-adjective", "Speed & Time"),
    ("nao", "なお", "ナオ", "尚", "still / further / even more", "na-adjective", "Degree & Intensity"),
    ("narekko", "なれっこ", "ナレッコ", "慣れっこ", "accustomed to / hardened to", "na-adjective", "Conditions & States"),
    ("nasakenai", "なさけない", "ナサケナイ", "情けない", "miserable / wretched / shameful", "i-adjective", "Emotions & Mind"),
    ("nashi", "なし", "ナシ", "無し", "without / devoid of", "na-adjective", "Conditions & States"),
    ("natsukashii", "なつかしい", "ナツカシイ", "懐かしい", "nostalgic / fondly remembered", "i-adjective", "Emotions & Mind"),
    ("nebukai", "ねぶかい", "ネブカイ", "根深い", "deep-seated / ingrained", "i-adjective", "Conditions & States"),
    ("nemui", "ねむい", "ネムイ", "眠い", "drowsy / sleepy", "i-adjective", "Safety & Health"),
    ("nen-iri", "ねんいり", "ネンイリ", "念入り", "scrupulous / meticulous", "na-adjective", "Character & Personality"),
    ("nesshin", "ねっしん", "ネッシン", "熱心", "ardent / enthusiastic / zealous", "na-adjective", "Character & Personality"),
    ("netamashii", "ねたましい", "ネタマシイ", "妬ましい", "enviable / jealous-inducing", "i-adjective", "Emotions & Mind"),
    ("nibui", "にぶい", "ニブイ", "鈍い", "dull / sluggish / blunt", "i-adjective", "Speed & Time"),
    ("nigai", "にがい", "ニガイ", "苦い", "bitter to taste", "i-adjective", "Food & Taste"),
    ("nigiyaka", "にぎやか", "ニギヤカ", "賑やか", "lively / bustly / festive", "na-adjective", "Conditions & States"),
    ("nikui", "にくい", "ニクイ", "憎い", "odious / abominable / hateful", "i-adjective", "Emotions & Mind"),
    ("nikurashii", "にくらしい", "ニクラシイ", "憎らしい", "provoking resentment / cheeky", "i-adjective", "Character & Personality"),
    ("niramu yona", "にらむような", "ニラムヨウナ", "睨むような", "glaring / fierce-eyed", "na-adjective", "Appearance & Style"),
    ("nobiyaka", "のびやか", "ノビヤカ", "伸びやか", "carefree / relaxed / expansive", "na-adjective", "Emotions & Mind"),
    ("nodoka", "のどか", "ノドカ", "長閑", "placid / idyllic / tranquil", "na-adjective", "Weather & Climate"),
    ("nonbiri", "のんびり", "ノンビリ", "のんびり", "laid-back / carefree", "na-adjective", "Emotions & Mind"),
    ("noro-noro", "のろのろ", "ノロノロ", "のろのろ", "sluggish / crawl-paced", "na-adjective", "Speed & Time"),
    ("noroi", "のろい", "ノロイ", "遅い", "slow / sluggish / dull", "i-adjective", "Speed & Time"),
    ("nukumori", "ぬくもり", "ヌクモリ", "温もり", "warm-hearted / cozy", "na-adjective", "Emotions & Mind"),
    ("nurui", "ぬるい", "ヌルイ", "温い", "lukewarm / tepid / lax", "i-adjective", "Food & Taste"),

    # O
    ("oishii", "おいしい", "オイシイ", "美味しい", "delicious / flavorful / savory", "i-adjective", "Food & Taste"),
    ("okashii", "おかしい", "オカシイ", "可笑しい", "amusing / comical / peculiar", "i-adjective", "Emotions & Mind"),
    ("odayaka", "おだやか", "オダヤカ", "穏やか", "calm / serene / temperate", "na-adjective", "Character & Personality"),
    ("odorokubeki", "おどろくべき", "オドロクベキ", "驚くべき", "astonishing / wondrous", "na-adjective", "Praise & Quality"),
    ("oi (many)", "おおい", "オオイ", "多い", "abundant / numerous / many", "i-adjective", "Shapes & Measures"),
    ("ookii", "おおきい", "オオキイ", "大きい", "large / big / grand", "i-adjective", "Shapes & Measures"),
    ("oogata", "おおがた", "オオガタ", "大型", "large-scale / jumbo", "na-adjective", "Shapes & Measures"),
    ("ooshiki", "おおしき", "オオシキ", "大式", "formal / elaborate", "na-adjective", "Conditions & States"),
    ("osoi", "おそい", "オソイ", "遅い", "slow-moving / late in night", "i-adjective", "Speed & Time"),
    ("osoroshii", "おそろしい", "オソロシイ", "恐ろしい", "dreadful / terrifying / terrible", "i-adjective", "Emotions & Mind"),
    ("otonashii", "おとなしい", "オトナシイ", "大人しい", "gentle / meek / quiet-mannered", "i-adjective", "Character & Personality"),
    ("otona-ppoi", "おとなっぽい", "オトナッポイ", "大人っぽい", "grown-up / mature-looking", "i-adjective", "Appearance & Style"),
    ("owarinai", "おわりのない", "オワリノナイ", "終わりのない", "never-ending / ceaseless", "na-adjective", "Speed & Time"),

    # R
    ("raku", "らく", "ラク", "楽", "effortless / painless / comfortable", "na-adjective", "Conditions & States"),
    ("rakuten-teki", "らくてんてき", "ラクテンテキ", "楽天的", "optimistic / cheerful", "na-adjective", "Character & Personality"),
    ("rashii", "らしい", "ラシイ", "らしい", "fitting / quintessential", "i-adjective", "Conditions & States"),
    ("reigi-tadashii", "れいぎただしい", "レイギタダシイ", "礼儀正しい", "courteous / well-mannered", "i-adjective", "Character & Personality"),
    ("reikoku", "れいこく", "レイコク", "冷酷", "callous / stone-hearted", "na-adjective", "Character & Personality"),
    ("reisei", "れいせい", "レイセイ", "冷静", "collected / cool-headed / calm", "na-adjective", "Character & Personality"),
    ("rippa", "りっぱ", "リッパ", "立派", "admirable / splendid / imposing", "na-adjective", "Praise & Quality"),
    ("risou-teki", "りそうてき", "リソウテキ", "理想的", "ideal / dream-like / perfect", "na-adjective", "Praise & Quality"),
    ("ronri-teki", "ろんりてき", "ロンリテキ", "論理的", "logical / coherent", "na-adjective", "Character & Clarity"),
    ("ryoukou", "りょうこう", "リョウコウ", "良好", "satisfactory / favorable", "na-adjective", "Conditions & States"),

    # S
    ("sabishii", "さびしい", "サビシイ", "淋しい", "lonely / desolate / solitary", "i-adjective", "Emotions & Mind"),
    ("saikou", "さいこう", "サイコウ", "最高", "supreme / superlative / the greatest", "na-adjective", "Praise & Quality"),
    ("saiwai", "さいわい", "サイワイ", "幸い", "blessed / fortunate / lucky", "na-adjective", "Praise & Quality"),
    ("sakan", "さかん", "サカン", "盛ん", "thriving / prosperous / vigorous", "na-adjective", "Conditions & States"),
    ("samui", "さむい", "サムイ", "寒い", "cold (wintry air)", "i-adjective", "Weather & Climate"),
    ("sappari", "さっぱり", "サッパリ", "さっぱり", "crisp / refreshing / frank", "na-adjective", "Food & Taste"),
    ("sasai", "ささい", "ササイ", "些細", "trivial / petty / minuscule", "na-adjective", "Shapes & Measures"),
    ("sasuga", "さすが", "サスガ", "流石", "as expected of / marvelous", "na-adjective", "Praise & Quality"),
    ("sawagashii", "さわがしい", "サワガシイ", "騒がしい", "noisy / clamorous / turbulent", "i-adjective", "Conditions & States"),
    ("sawayaka", "さわやか", "サワヤカ", "爽やか", "refreshing / breezy / pleasant", "na-adjective", "Weather & Climate"),
    ("seikaku", "せいかく", "セイカク", "正確", "accurate / precise / punctilious", "na-adjective", "Character & Clarity"),
    ("seiketsu", "せいけつ", "セイケツ", "清潔", "cleanly / spotless / sanitary", "na-adjective", "Safety & Health"),
    ("seishiki", "せいしき", "セイシキ", "正式", "official / ceremonious / legitimate", "na-adjective", "Conditions & States"),
    ("semushi", "せまい", "セマイ", "狭い", "narrow / confined / cramped", "i-adjective", "Shapes & Measures"),
    ("sensai", "せんさい", "センサイ", "繊細", "delicate / refined / sensitive", "na-adjective", "Character & Personality"),
    ("shiawase", "しあわせ", "シアワセ", "幸せ", "happy / blessed / joyful", "na-adjective", "Emotions & Mind"),
    ("shikatanai", "しかたない", "シカタナイ", "仕方ない", "unavoidable / inevitable", "i-adjective", "Conditions & States"),
    ("shinsen", "しんせん", "シンセン", "新鮮", "fresh / crisp / unwilted", "na-adjective", "Food & Taste"),
    ("shinsetsu", "しんせつ", "シンセツ", "親切", "kind / hospitable / considerate", "na-adjective", "Character & Personality"),
    ("shinpai", "しんぱい", "シンパイ", "心配", "anxious / concerning", "na-adjective", "Emotions & Mind"),
    ("shizuka", "しずか", "シズカ", "静か", "quiet / peaceful / tranquil", "na-adjective", "Conditions & States"),
    ("shitsurei", "しつれい", "シツレイ", "失礼", "discourteous / rude", "na-adjective", "Character & Personality"),
    ("shoujiki", "しょうじき", "ショウジキ", "正直", "honest / candid / sincere", "na-adjective", "Character & Personality"),
    ("subarashii", "すばらしい", "スバラシイ", "素晴らしい", "magnificent / wonderful", "i-adjective", "Praise & Quality"),
    ("sugoi", "すごい", "スゴイ", "凄い", "awesome / staggering / great", "i-adjective", "Praise & Quality"),
    ("sukoshi no", "すこしの", "スコシノ", "少しの", "a scant / small bit of", "na-adjective", "Shapes & Measures"),
    ("suki", "すき", "スキ", "好き", "liked / fondness / favorite", "na-adjective", "Emotions & Mind"),
    ("sukusuku", "すくすく", "スクスク", "すくすく", "growing vigorously / healthy", "na-adjective", "Safety & Health"),
    ("sukunai", "すくない", "スクナイ", "少ない", "few / scarce / meager", "i-adjective", "Shapes & Measures"),
    ("suzushii", "すずしい", "スズシイ", "涼しい", "pleasantly cool (breeze)", "i-adjective", "Weather & Climate"),

    # T
    ("tadashii", "ただしい", "タダシイ", "正しい", "righteous / correct / proper", "i-adjective", "Character & Clarity"),
    ("taihen", "たいへん", "タイヘン", "大変", "grave / terrible / arduous", "na-adjective", "Conditions & States"),
    ("taisetsu", "たいせつ", "タイセツ", "大切", "precious / cherished / crucial", "na-adjective", "Praise & Quality"),
    ("taikutsu", "たいくつ", "タイクツ", "退屈", "boring / tedious / dull", "na-adjective", "Emotions & Mind"),
    ("takai (high)", "たかい", "タカイ", "高い", "tall / lofty in stature", "i-adjective", "Shapes & Measures"),
    ("takai (price)", "たかい", "タカイ", "高い", "expensive / costly", "i-adjective", "Conditions & States"),
    ("takusan", "たくさん", "タクサン", "沢山", "abundant / plenty", "na-adjective", "Shapes & Measures"),
    ("tanonoshii", "たのしい", "タノシイ", "楽しい", "delightful / enjoyable / cheerful", "i-adjective", "Emotions & Mind"),
    ("tashika", "たしか", "タシカ", "確か", "definite / reliable / certain", "na-adjective", "Character & Clarity"),
    ("tayori ni naru", "たよりになる", "タヨリニナル", "頼りになる", "trustworthy / reliable", "i-adjective", "Character & Personality"),
    ("tekisetsu", "てきせつ", "テキセツ", "適切", "fitting / appropriate / apt", "na-adjective", "Character & Clarity"),
    ("teinei", "ていねい", "テイネイ", "丁寧", "polite / thorough / courteous", "na-adjective", "Character & Personality"),
    ("tokubetsu", "とくべつ", "トクベツ", "特別", "special / extraordinary / bespoke", "na-adjective", "Praise & Quality"),
    ("tokui", "とくい", "トクイ", "得意", "one's forte / proud of skill", "na-adjective", "Praise & Quality"),
    ("tooi", "とおい", "トオイ", "遠い", "far away / remote", "i-adjective", "Shapes & Measures"),
    ("tsuyoi", "つよい", "ツヨイ", "強い", "strong / sturdy / potent", "i-adjective", "Praise & Quality"),
    ("tsumetai", "つめたい", "ツメタイ", "冷たい", "cold to the touch / chilly manner", "i-adjective", "Weather & Climate"),
    ("tsumaranai", "つまらない", "ツマラナイ", "詰まらない", "boring / trivial / uninspiring", "i-adjective", "Emotions & Mind"),
    ("tsurai", "つらい", "ツライ", "辛い", "painful / heartbreaking / tough", "i-adjective", "Emotions & Mind"),

    # U
    ("umai", "うまい", "ウマイ", "旨い", "delicious / skillful / proficient", "i-adjective", "Food & Taste"),
    ("ureshii", "うれしい", "ウレシイ", "嬉しい", "gleeful / delighted / ecstatic", "i-adjective", "Emotions & Mind"),
    ("utsukushii", "うつくしい", "ウツクシイ", "美しい", "gorgeous / beautiful / scenic", "i-adjective", "Appearance & Style"),
    ("usui", "うすい", "ウスイ", "薄い", "thin / pale / diluted flavor", "i-adjective", "Shapes & Measures"),
    ("urayamashii", "うらやましい", "ウラヤマシイ", "羨ましい", "enviable / fortunate", "i-adjective", "Emotions & Mind"),
    ("urusai", "うるさい", "ウルサイ", "煩い", "noisy / clamorous / pestering", "i-adjective", "Conditions & States"),

    # W
    ("wakai", "わかい", "ワカイ", "若い", "youthful / green", "i-adjective", "People & Family"),
    ("warui", "わるい", "ワルイ", "悪い", "bad / evil / inferior", "i-adjective", "Character & Personality"),
    ("wazuka", "わずか", "ワズカ", "僅か", "scant / negligible / mere", "na-adjective", "Shapes & Measures"),

    # Y
    ("yasashii (kind)", "やさしい", "ヤサシイ", "優しい", "tender / kindhearted / benevolent", "i-adjective", "Character & Personality"),
    ("yasashii (easy)", "やさしい", "ヤサシイ", "易しい", "facile / simple / easy", "i-adjective", "Conditions & States"),
    ("yasui", "やすい", "ヤスイ", "安い", "inexpensive / budget-friendly", "i-adjective", "Conditions & States"),
    ("yawarakai", "やわらかい", "ヤワラカイ", "柔らかい", "tender / pliable / soft", "i-adjective", "Conditions & States"),
    ("yoi", "よい", "ヨイ", "良い", "fine / good / upright", "i-adjective", "Praise & Quality"),
    ("yowai", "よわい", "ヨワイ", "弱い", "feeble / fragile / weak", "i-adjective", "Safety & Health"),
    ("yutaka", "ゆたか", "ユタカ", "豊か", "affluent / abundant / fertile", "na-adjective", "Praise & Quality"),
    ("yuumei", "ゆうめい", "ユウメイ", "有名", "renowned / illustrious / famous", "na-adjective", "Praise & Quality"),

    # Z
    ("zankoku", "ざんこく", "ザンコク", "残酷", "cruel / merciless / ruthless", "na-adjective", "Character & Personality"),
    ("zannen", "ざんねん", "ザンネン", "残念", "regrettable / disappointing", "na-adjective", "Emotions & Mind"),
    ("zeitaku", "ぜいたく", "ゼイタク", "贅沢", "luxurious / extravagant", "na-adjective", "Praise & Quality"),
    ("zenryoku", "ぜんりょく", "ゼンリョク", "全力", "full-power / wholehearted", "na-adjective", "Character & Personality"),
    ("zettai", "ぜったい", "ゼッタイ", "絶対", "absolute / unconditional", "na-adjective", "Conditions & States")
]

import sys
sys.path.append('scripts')
import expand_adjectives

all_adj = dict(expand_adjectives.existing)

for item in raw_adjectives_part2:
    key = item[0].lower()
    if key not in all_adj:
        all_adj[key] = {
            "alphabet": item[0][0].upper(),
            "romaji": item[0],
            "hiragana": item[1],
            "katakana": item[2],
            "kanji": item[3],
            "meaning": item[4],
            "type": item[5],
            "topic": item[6]
        }

final_adjectives = list(all_adj.values())
final_adjectives.sort(key=lambda x: x['romaji'].lower())

with open('src/data/vocab/n5_vocab.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['adjectives'] = final_adjectives

with open('src/data/vocab/n5_vocab.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Total Adjectives now saved in n5_vocab.json: {len(data['adjectives'])}")
