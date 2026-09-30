# Authentic Japanese Conversational Expressions & Situational Phrases Part 4 (350+ entries)
# (romaji, hiragana, katakana, kanji, meaning, topic)
DATA = [
    # M
    ("ma-atarashii ki de taterareta", "まあたらしいきでたてられた", "マアタラシイキデタセラレタ", "真新しい木で建てられた", "Built from fresh, fragrant new timber.", "Home & Living"),
    ("makkura na yomichi wa ki o tsukete", "まっくらなよみちはきをつけて", "マックラナヨミチワキヲツケテ", "真っ暗な夜道は気をつけて", "Be careful walking on pitch-black roads!", "Safety & Health"),
    ("mame ni te o araou ne", "まめにてをあらおうね", "マメニテヲアラオウネ", "忠実に手を洗おうね", "Remember to wash hands thoroughly!", "Family & Children"),
    ("manzoku-kan o motte owareta", "まんぞくかんをもっておわれた", "マンゾクカンヲモッテオワレタ", "満足感を持って終えられた", "Concluded with deep, happy fulfillment.", "Daily Conversation"),
    ("meikaku na bijon o egakou", "めいかくなびじょんをえがこう", "メイカクナビジョンヲエガコウ", "明確なビジョンを描こう", "Let's sketch a crystal-clear vision.", "Work & Business"),
    ("mitsudo no takai hanashiai da", "みつどのたかいはなしあいだった", "ミツドノタカイハナシアイダッタ", "密度の高い話し合いだった", "That was a high-density, productive dialogue.", "Work & Business"),
    ("mizumizushii ringo o douzo", "みずみずしいりんごをどうぞ", "ミズミズシイリンゴヲドウゾ", "瑞々しい林檎をどうぞ", "Please enjoy this juicy crisp apple!", "Dining"),
    ("muda o sukkari habuita sekkei", "むだをすっかりはぶいたせっけい", "ムダヲスッカリハブイタセッケイ", "無駄を省いた設計", "A lean streamlined blueprint free of waste.", "Work & Business"),
    ("muga-muchuu de yonda hon", "むがむちゅうでよんだほんだ", "ムガムチュウデヨンダホンダ", "無我夢中で読んだ本だ", "A book read in totally spellbound absorption.", "Culture"),
    ("mukizu de kaette kite anshin", "むきずでかえってきてあんしんした", "ムキズデカエッテキテアンシンシタ", "無傷で帰ってきて安心した", "So relieved you returned home without a scratch!", "Family & Children"),

    # N
    ("naiteki na tsuyosa o migako", "ないてきなつよさをみがこう", "ナイテキナツヨサヲミガコウ", "内的な強さを磨こう", "Let's hone our inner spiritual resilience.", "Cheering & Motivation"),
    ("namagomi no shori o onegai", "なまごみのしょりをおねがい", "ナマゴミノショリヲオネガイ", "生ゴミの処理をお願い", "Could you take care of the kitchen scraps?", "Home & Living"),
    ("nando mo kurikaeshi renshuu", "なんどもくりかえしれんしゅうしよう", "ナンドモクリカエシレンシュウシヨウ", "何度も繰り返し練習しよう", "Let's practice repeatedly until flawless.", "Classroom & Study"),
    ("nikurashii kedo nikumenai", "にくらしいけどにくめないやつだ", "ニクラシイケドニクメナイヤツダ", "憎らしいけど憎めない奴だ", "Cheeky as can be, but impossible to dislike!", "Daily Conversation"),
    ("nobinobi to katsudou dekiru", "のびのびとかつどうできるばしょだ", "ノビノビトカツドウデキルバショダ", "のびのびと活動できる場所だ", "A wonderful space to express oneself freely.", "Classroom & Study"),
    ("nonbiri to yu-ami o tanoshimo", "のんびりとゆあみをたのしもう", "ノンビリトユアミヲタノシモウ", "のんびりと湯浴みを楽しもう", "Let's enjoy a relaxing soak in the baths.", "Travel & Hotel"),
    ("nozomi wa kanarazu kanau yo", "のぞみはかならずかなうよ", "ノゾミワカナラズカナウヨ", "望みは必ず叶うよ", "Your heart's wish will surely come true!", "Cheering & Motivation"),

    # O
    ("odayaka na nichijou ga modotta", "おだやかなにちじょうがもどった", "オダヤカナニチジョウガモドッタ", "穏やかな日常が戻った", "Tranquil peace has returned to daily life.", "Daily Life"),
    ("oishisa ni egao ga koboreta", "おいしさにえがおがこぼれた", "オイシサニエガオガコボレタ", "美味しさに笑顔がこぼれた", "Smiles naturally spilled over at the flavor.", "Dining"),
    ("omoi-kiri kakedashi-mashou", "おもいきりかけだしましょう", "オモイキリカケダシマショウ", "思い切り駆け出しましょう", "Let's sprint forward with joyful abandon!", "Cheering & Motivation"),
    ("onwa na hito to hanasu to yasashiku", "おんわなひととはなすとやさしくなる", "オンワナヒトトハナストヤサシクナル", "心優しくなる", "Speaking with gentle souls brings deep warmth.", "Communication"),

    # R
    ("raku-raku to toberu you ni natta", "らくらくととべるようになった", "ラクラクトトベルヨウニナッタ", "楽々と跳べるようになった", "Learned to leap over hurdles with breezy ease.", "Cheering & Motivation"),
    ("rakuten-teki na shisen de zenshin", "らくてんてきなしせんでぜんしん", "ラクテンテキナシセンデゼンシン", "楽天的な視点で前進しよう", "Marching forward with sunny optimism!", "Cheering & Motivation"),
    ("reisei na bunseki o kokorogakeyo", "れいせいなぶんせきをこころがけよう", "レイセイナブンセキヲココロガケヨウ", "冷静な分析を心がけよう", "Let's aim for cool, level-headed analysis.", "Work & Business"),
    ("risou o mezashite fumidasou", "りそうをめざしてふみだそう", "リソウヲメザシテフミダソウ", "理想を目指して踏み出そう", "Step boldly forward toward your ideals!", "Cheering & Motivation"),

    # S
    ("saiai no kazoku to kanpai", "さいあいのかぞくとかんぱいしよう", "サイアイノカゾクトカンパイシヨウ", "最愛の家族と乾杯しよう", "Let's raise a celebratory glass with family!", "Family & Children"),
    ("saikouchou no yorokobi o wakachiao", "さいこうちょうのよろこびをわかちあおう", "サイコウチョウノヨロコビヲワカチアオウ", "喜びを分かち合おう", "Let's share this peak triumph together!", "Greetings & Celebrations"),
    ("sakura no shita de shashin o", "さくらのしたでしゃしんをとろう", "サクラノシタデシャシンヲトロウ", "桜の下で写真を撮ろう", "Let's take photos under the blooming sakura.", "Culture"),
    ("sassa to ikou ka", "さっさといこうか", "サッサトイコウカ", "さっさと行こうか", "Shall we get rolling without dawdling?", "Daily Conversation"),
    ("sayuu o yoku mite watatte ne", "さゆうをよくみてわたってね", "サユウヲヨクミテワタッテネ", "左右をよく見て渡ってね", "Be sure to look both ways before crossing!", "Safety & Health"),
    ("seichou o mitodokeru yorokobi", "せいちょうをみとどけるよろこびだ", "セイチョウヲミトドケルヨロコビダ", "成長を見届ける喜びだ", "The sublime joy of watching loved ones grow.", "Family & Children"),
    ("shinpi no fuchi ni tatta", "しんぴのふちにたった", "シンピノフチニタッタ", "神秘の淵に立った", "Stood at the threshold of timeless mystery.", "Culture"),
    ("shinjitsu o kokoro ni kizamo", "しんじつをこころにきざもう", "シンジツヲココロニキザモウ", "真実を心に刻もう", "Let's etch historical truth onto our hearts.", "Classroom & Study"),
    ("shoujiki na anata ga daisuki", "しょうじきなあなたがだいすきだ", "ショウジキナアナタガダイスキダ", "正直なあなたが大好きだ", "I truly cherish your candid honesty!", "Communication"),

    # T - Z
    ("taikyuu-sei no takai kigu da", "たいきゅうせいのたかいきぐだ", "タイキュウセイノタカイキグダ", "耐久性の高い器具だ", "A dependable, heavy-duty piece of equipment.", "Shopping & Dining"),
    ("tekisetsu na taiou o arigatou", "てきせつなたいおうをありがとう", "テキセツナタイオウヲアリガトウ", "適切な対応をありがとう", "Thank you for handling this with perfect tact!", "Gratitude & Thanks"),
    ("tokubetsu na kinenbi da ne", "とくべつなきねんびだね", "トクベツナキネンビダネ", "特別な記念日だね", "This is an unforgettable milestone day!", "Greetings & Celebrations"),
    ("tomoni susumu koto ga hokori", "ともにすすむことがほこりだ", "トモニススムコトガホコリダ", "共に進むことが誇りだ", "Marching by your side is my highest pride.", "Friends & Social"),
    ("touzen no houshuu o uketotte", "とうぜんのほうしゅうをうけとって", "トウゼンノホウシュウヲウケトッテ", "当然の報酬を受け取って", "Please accept this well-deserved reward!", "Work & Business"),
    ("tsune-ni yume o katarou", "つねにゆめをかたろう", "ツネニユメヲカタロウ", "常に夢を語ろう", "Let's always speak passionately of our dreams!", "Cheering & Motivation"),
    ("ugoki-yasui fuku de sanpo", "うごきやすいふくでさんぽしよう", "ウゴキヤスイフクデサンポシヨウ", "動きやすい服で散歩しよう", "Let's stroll in comfortable athletic wear.", "Daily Life"),
    ("umaku susunde anshin shita", "うまくすすんであんしんした", "ウマクススンデアンシンシタ", "上手く進んで安心した", "Deeply relieved that all is sailing smooth.", "Daily Conversation"),
    ("unmei o shinjite tobikomou", "うんめいをしんじてとびこもう", "ウンメイヲシンジテトビコムウ", "運命を信じて飛び込もう", "Trust in destiny and take the bold leap!", "Cheering & Motivation"),
    ("wasure-gatai toki o arigatou", "わすれがたいときをありがとう", "ワスレガタイトキヲアリガトウ", "忘れ難い時をありがとう", "Thank you for these unforgettable hours!", "Gratitude & Thanks"),
    ("yuueki na deai ni kansha", "ゆうえきなであいにかんしゃしよう", "ユウエキナデアイニカンシャシヨウ", "有益な出会いに感謝しよう", "Grateful for this deeply enriching encounter.", "Gratitude & Thanks"),
    ("yuukan na yuuki ni hakushu", "ゆうかんなゆうきにはくしゅをおくる", "ユウカンナユウキニハクシュヲオクル", "勇敢な勇気に拍手を送る", "Applauding your magnificent brave courage!", "Cheering & Motivation"),
    ("zenryoku de yatta kara kuikomu nashi", "ぜんりょくでやったからくいはない", "ゼンリョクデヤッタカラクイワナイ", "全力でやったから悔いはない！", "Gave 100%, so I hold not a single regret!", "Cheering & Motivation"),
    ("zutto zutto応援 shite iru yo", "ずっとずっとおうえんしているよ", "ズットズットオウエンシテイルヨ", "ずっとずっと応援しているよ！", "Rooting for you always and forever!", "Cheering & Motivation"),
]
