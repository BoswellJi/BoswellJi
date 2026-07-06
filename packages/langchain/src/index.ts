import { ChatDeepSeek } from '@langchain/deepseek';

const model = new ChatDeepSeek({
  model: 'deepseek-v4-flash',
  apiKey: 'sk-tp-pJx7nPPpry0uLDtgzUNvTkRK8nIMyKT57ajBCzmanPL1pHty',
});

const aiMsg = await model.invoke([
  [
    'system',
    'You are a helpful assistant that translates English to French. Translate the user sentence.',
  ],
  ['human', 'I love programming.'],
]);

console.log(aiMsg.content);
