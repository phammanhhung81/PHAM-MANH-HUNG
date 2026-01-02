import { Vocabulary } from '../types';
import { hsk1Vocab } from './vocab_hsk1';
import { hsk2Vocab } from './vocab_hsk2';
import { hsk3Vocab } from './vocab_hsk3';
import { hsk3_2Vocab } from './vocab_hsk3_2';
import { hsk4Vocab } from './vocab_hsk4';
import { hsk4_2Vocab } from './vocab_hsk4_2';
import { hsk79Vocab } from './vocab_hsk79';

// Base list with extra words (HSK 5, 6 etc)
const baseList: Vocabulary[] = [
  {
    id: 'hsk5-1300',
    char: '成果',
    pinyin: 'chéng guǒ',
    meaning: 'thành quả',
    example: '我们取得了很好的成果。',
    examplePinyin: 'Wǒmen qǔdéle hěn hǎo de chéngguǒ.',
    exampleMeaning: 'Chúng tôi đã đạt được thành quả rất tốt.',
    level: 'HSK 5'
  }
];

export const vocabularyList: Vocabulary[] = [
  ...hsk1Vocab,
  ...hsk2Vocab,
  ...hsk3Vocab,
  ...hsk3_2Vocab,
  ...hsk4Vocab,
  ...hsk4_2Vocab,
  ...hsk79Vocab,
  ...baseList
];
