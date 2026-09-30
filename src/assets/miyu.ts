import celIdle from './images/miyu_celshade_idle_1790609139116.jpg';
import celTalking from './images/miyu_celshade_talk_1790609169451.jpg';
import celPraise from './images/miyu_celshade_praise_1790609192557.jpg';
import celThinking from './images/miyu_celshade_think_1790609224765.jpg';

import miyuHoldingCard from './images/miyu_holding_card_1790610769888.jpg';
import miyuWelcomingImg from './images/miyu_welcoming_sensei_1790610703485.jpg';
import miyuKnowledgeBooks from './images/miyu_knowledge_books_1790610728517.jpg';
import miyuBreakthroughJump from './images/miyu_breakthrough_jump_1790610748378.jpg';

export const MIYU_OFFICIAL_SPRITES = {
  idle: miyuHoldingCard,
  welcoming: miyuWelcomingImg,
  talking: miyuWelcomingImg,
  knowledge: miyuKnowledgeBooks,
  praise: miyuKnowledgeBooks,
  jump: miyuBreakthroughJump,
  thinking: miyuHoldingCard,
};

export const MIYU_CELSHADE_SPRITES = {
  idle: celIdle,
  welcoming: celTalking,
  talking: celTalking,
  knowledge: celPraise,
  praise: celPraise,
  jump: celPraise,
  thinking: celThinking,
};

export const MIYU_SPRITES = {
  idle: celIdle,
  talking: celTalking,
  praise: celPraise,
  jump: miyuBreakthroughJump,
  thinking: celThinking,
  welcoming: celTalking,
  knowledge: miyuKnowledgeBooks,
  cel: MIYU_CELSHADE_SPRITES,
  classic: MIYU_OFFICIAL_SPRITES,
};

export type MiyuMood = 'idle' | 'talking' | 'praise' | 'thinking' | 'jump' | 'welcoming' | 'knowledge';
export type AnimeStyle = 'celshade' | 'classic';
