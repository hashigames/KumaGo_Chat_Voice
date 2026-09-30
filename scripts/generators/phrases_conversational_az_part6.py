# Authentic Japanese Phrases Part 6 - Daily Interactions & JLPT Dialogue (250+ entries)
# (romaji, hiragana, katakana, kanji, meaning, topic)
DATA = [
    # M
    ("ma-atarashii fuku o kitara", "まあたらしいふくをきたら", "マアタラシイフクヲキタラ", "真新しい服を着たら気分が良い", "Putting on crisp new clothes lifts the soul.", "Daily Life"),
    ("makkura na michi demo akari ga aru", "まっくらなみちでもあかりがある", "マックラナミチデモアカリガアル", "暗い道でも灯りがあるよ", "Even in pitch darkness, a guiding light glows.", "Empathy & Comfort"),
    ("mame ni te-arai, ukai shiyo", "まめにてあらい、うがいしよう", "マメニテアライ、ウガイシヨウ", "忠実に手洗い・うがいしよう", "Wash hands and gargle diligently!", "Health & Emergency"),
    ("manzoku-kan no aru shigoto da", "まんぞくかんのあるしごとだ", "マンゾクカンノアルシゴトダ", "満足感のある仕事だ", "Work that gives deep, genuine fulfillment.", "Work & Business"),
    ("meikaku na shishin o shimeso", "めいかくなししんをしめそう", "メイカクナシシンヲシメソウ", "明確な指針を示そう", "Let's provide crystal clear directional guidance.", "Work & Business"),
    ("mitsudo no takai renshuu shita", "みつどのたかいれんしゅうをした", "ミツドノタカイレンシュウヲシタ", "密度の高い練習をした", "Conducted hyper-concentrated focused training.", "Classroom & Study"),
    ("mizumizushii nashi o tabeyou", "みずみずしいなしをたべよう", "ミズミズシイナシヲタベヨウ", "瑞々しい梨を食べよう", "Let's feast on crisp, succulent Japanese pears!", "Dining"),
    ("muda o habuita ugoki da", "むだをはぶいたうごきだね", "ムダヲハブイタウゴキダネ", "無駄を省いた動きだ", "Fluid motion stripped of all superfluous excess.", "Cheering & Motivation"),
    ("muga-muchuu de kaita e da", "むがむちゅうでかいたえだ", "ムガムチュウデカイタエダ", "無我夢中で描いた絵だ", "A painting crafted in total artistic flow.", "Culture"),
    ("mukizu de kaette yokatta", "むきずでかえってよかったね", "ムキズデカエッテヨカッタネ", "無傷で帰って良かったね", "So wonderful you returned home safe and unharmed!", "Daily Conversation"),

    # N
    ("naiteki na seichou o kanjiru", "ないてきなせいちょうをかんじる", "ナイテキナセイチョウヲカンジル", "内的な成長を感じる", "I sense your profound inward maturity.", "Classroom & Study"),
    ("namagomi o genryou shiyou", "なまごみをげんりょうしよう", "ナマゴミヲゲンリョウシヨウ", "生ゴミを減量しよう", "Let's minimize household kitchen waste.", "Home & Living"),
    ("nando mo chousen suru sugata", "なんどもちょうせんするすがた", "ナンドモチョウセンスルスガタ", "何度も挑戦する姿が眩しい", "Your relentless drive to try again is inspiring!", "Cheering & Motivation"),
    ("nikurashii hodo binwan da", "にくらしいほどびんわんだね", "ニクラシイホドビンワンダネ", "敏腕だね", "Infuriatingly capable and brilliant at work!", "Work & Business"),
    ("nobinobi to kangaeyou", "のびのびとかんがえよう", "ノビノビトカンガエヨウ", "のびのびと考えよう", "Let's brainstorm without mental shackles.", "Classroom & Study"),
    ("nonbiri to fune ni yurare", "のんびりとふねにゆられて", "ノンビリトフネニユラレテ", "船に揺られて", "Rocked gently aboard the tranquil ferry.", "Travel & Places"),
    ("nozomi o motte ikite ikou", "のぞみをもって生きていこう", "ノゾミヲモッテイキテイコウ", "望みを持って生きていこう", "Let's live onward with hopeful aspiration in heart.", "Cheering & Motivation"),

    # O
    ("odayaka na kisetsu ga kita", "おだやかなきせつがきたね", "オダヤカナキセツガキタネ", "穏やかな季節が来たね", "A serene, temperate season has rolled around.", "Weather & Daily"),
    ("oishisa o kami-shimeru shiawase", "おいしさをかみしめるしあわせ", "オイシサヲカミシメルシアワセ", "噛み締める幸せ", "The pure bliss of savoring culinary joy.", "Dining"),
    ("omoi-kiri odotte tanoshimo", "おもいきりおどってたのしもう", "オモイキリオドッテタノシモウ", "思い切り踊って楽しもう！", "Let's dance our hearts out and have a blast!", "Friends & Social"),
    ("onwa na manazashi de mitsumete", "おんわなまなざしでみつめて", "オンワナマナザシデミツメテ", "温和な眼差しで見つめてくれた", "Gazed at me with gentle, warm compassion.", "Empathy & Comfort"),

    # R
    ("raku-raku to suishin dekiru", "らくらくとすいしんできるたいせい", "ラクラクトスイシンデキルタイセイ", "楽々と推進できる態勢", "A system primed to roll forward with breezy ease.", "Work & Business"),
    ("rakuten-teki na egao ga ninki", "らくてんてきなえがおがにんきだ", "ラクテンテキナエガオガニンキダ", "笑顔が人気だ", "Cherished by all for that cheerful sunny grin.", "Communication"),
    ("reisei na handan de maneja", "れいせいなはんだんがひかる", "レイセイナハンダンガヒカル", "冷静な判断が光るリーダー", "A leader whose calm lucid judgment stands out.", "Work & Business"),
    ("risou o genjitsu ni kaeyo", "りそうをげんじつにかえよう", "リソウヲゲンジツニカエヨウ", "理想を現実に変えよう", "Let's turn lofty ideals into tangible reality!", "Cheering & Motivation"),

    # S
    ("saiai no kazoku o taisetsu ni", "さいあいのかぞくをたいせつに", "サイアイノカゾクヲタイセツニ", "最愛の家族を大切にしよう", "Cherishing one's beloved family deeply.", "Family & Children"),
    ("saikouchou no matsuri no yoru", "さいこうちょうのまつりのよるだ", "サイコウチョウノマツリノヨルダ", "祭りの夜だ", "A festival night at the peak fever crescendo!", "Culture"),
    ("sakura no shita de utao", "さくらのしたでうたおう", "サクラノシタデウタオウ", "桜の下で歌おう", "Let's sing joyfully under the pink sakura trees.", "Culture"),
    ("sassa to jumbishiyou ka", "さっさとじゅんびしようか", "サッサトジュンビシヨウカ", "さっさと準備しようか", "Shall we get everything packed and prepped?", "Daily Conversation"),
    ("sayuu o yoku mite watarou ne", "さゆうをよくみてわたろうね", "サユウヲヨクミテワタロウネ", "左右をよく見て渡ろうね", "Look carefully both ways before crossing!", "Safety & Health"),
    ("seichou o tomoni tatae-ao", "せいちょうをともにたたえあおう", "セイチョウヲトモニタタエアオウ", "成長を讃え合おう", "Let's applaud each other's marvelous growth!", "Classroom & Study"),
    ("shinpi no sekai o boken shiyo", "しんぴのせかいをぼうけんしよう", "シンピノセカイヲボウケンシヨウ", "神秘の世界を冒険しよう", "Let's go adventuring into mystical realms!", "Friends & Social"),
    ("shinjitsu o tsuikyuu suru shisei", "しんじつをついきゅうするしせい", "シンジツヲツイキュウスルシセイ", "真実を追究する姿勢", "An unwavering dedication to seek the truth.", "Classroom & Study"),
    ("shoujiki na kimochi o arigatou", "しょうじきなきもちをありがとう", "ショウジキナキモチヲアリガトウ", "正直な気持ちをありがとう", "Thank you for confiding your genuine feelings.", "Gratitude & Thanks"),

    # T - Z
    ("taikyuu-sei o tashikamete kouba", "たいきゅうせいをたしかめてこうば", "タイキュウセイヲタシカメテコウバ", "確認して購入した", "Purchased after verifying proven durability.", "Shopping & Dining"),
    ("tekisetsu na kouka o jikkan", "てきせつなこうかをじっかんした", "テキセツナコウカヲジッカンシタ", "適切な効果を実感した", "Experienced the targeted beneficial effects.", "Health & Emergency"),
    ("tokubetsu na hi ni kanpai", "とくべつなひにかんぱいしよう", "トクベツナヒニカンパイシヨウ", "特別な日に乾杯しよう！", "A toast to this singular, momentous occasion!", "Greetings & Celebrations"),
    ("tomoni susumu nakama ni kansha", "ともにすすむなかまにかんしゃ", "トモニススムナカマニカンシャ", "仲間に感謝しよう", "Expressing gratitude to teammates marching with us.", "Gratitude & Thanks"),
    ("touzen no kenri o mamoro", "とうぜんのけんりをまもろう", "トウゼンノケンリヲマモロウ", "当然の権利を守ろう", "Defending our inalienable fundamental rights.", "Work & Business"),
    ("tsune-ni zenshin shite ikou", "つねにぜんしんしていこう", "ツネニゼンシンシテイコウ", "常に前進していこう！", "Let's keep marching forward every single day!", "Cheering & Motivation"),
    ("ugoki-yasui fuku de dekakeyob", "うごきやすいふくででかけよう", "ウゴキヤスイフクデデカケヨウ", "動きやすい服で出かけよう", "Let's head out dressed in flexible gear.", "Daily Life"),
    ("umaku itte hotto hitoiki", "うまくいってほっとひといき", "ウマクイッテホットヒトイキ", "上手く行ってほっと一息ついた", "Breathed a deep sigh of relief at success.", "Daily Conversation"),
    ("unmei no kizuna o shinjite", "うんめいのきずなをしんじて", "ウンメイノキズナヲシンジテ", "運命の絆を信じて進もう", "Marching onward with faith in fateful bonds.", "Cheering & Motivation"),
    ("wasure-gatai hibi o kakeketa", "わすれがたいひびをかけぬけた", "ワスレガタイヒビヲカケヌケタ", "忘れ難い日々を駆け抜けた", "Sprinted through unforgettable golden days.", "Friends & Social"),
    ("yuueki na taiken o arigatou", "ゆうえきなたけんをありがとう", "ユウエキナタイケンヲアリガトウ", "有益な体験をありがとう", "Thank you for such an enriching experience!", "Gratitude & Thanks"),
    ("yuukan ni idonda sugata", "ゆうかんにいどんだすがたに拍手", "ユウカンニイドンダスガタニハクシュ", "勇敢に挑んだ姿に拍手", "Applauding your valiant and daring bravery!", "Cheering & Motivation"),
    ("zenryoku de yatta kara daijoubu", "ぜんりょくでやったからだいじょうぶ", "ゼンリョクデヤッタカラダイジョウブ", "全力でやったから大丈夫！", "You poured in 100%, so everything is fine!", "Cheering & Motivation"),
    ("zutto zutto mikata da yo", "ずっとずっとみかただよ", "ズットズットミカタダヨ", "ずっとずっと味方だよ！", "I am in your corner always and forever!", "Cheering & Motivation"),
]
