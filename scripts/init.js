import fsp from 'fs/promises';
import path from 'path';
import { createScript } from './utils/script.js';
import { isTopicExists, TOPICS_PATH } from './utils/topic.js';

const SCRIPT_PLACEHOLDER = 'echo "Error: no script specified" && exit 1';

const createPackageJson = (name) => ({
  name: `${name}.topic`,
  private: true,
  scripts: {
    start: SCRIPT_PLACEHOLDER,
    dev: SCRIPT_PLACEHOLDER,
  },
});

const script = createScript({
  name: 'init',
  handler: async ({ filteredArgv, logger }) => {
    const [topic] = filteredArgv;

    if (!topic) {
      throw new Error('Provide topic name as first argument');
    }

    if (await isTopicExists(topic)) {
      throw new Error(`Topic ${topic} is already exists`);
    }

    const topicPath = path.join(TOPICS_PATH, topic);
    await fsp.mkdir(topicPath);

    const packageJsonPath = path.join(topicPath, 'package.json');
    await fsp.writeFile(packageJsonPath, JSON.stringify(createPackageJson(topic), null, 2));

    logger.log(`Topic ${topic} successfully created`);
  },
});

script();
