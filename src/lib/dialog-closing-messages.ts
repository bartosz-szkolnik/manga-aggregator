const commonClosingMessages = [
  `80% of manga readers quit a boring manga before it gets good.`,
  'Are you sure about that? You will make your Onee-san sad.',
  'Are you sure about that? You will make your little Imouto cry.',
  `Don't quit now! Baka.`,
  'So finally letting go of those yandere tendencies huh?',
];

const followDialogClosingMessages = [
  `Do you really want to stop following? I've heard the next chapter is going to be amazing.`,
  `Do you really want to stop following? I've heard the next chapter is going to be peak.`,
  `Do you really want to stop following? I've heard the next chapter is going to be awesome.`,
  `Do you really want to stop following? I've heard they really start cooking next chapter.`,
  `What about all the memories you've made with it? All of the characters? Don't make the main heroine cry.`,
];

export function getRandomCommonClosingMessage() {
  const index = Math.floor(Math.random() * commonClosingMessages.length);
  return commonClosingMessages.at(index);
}

export function getRandomFollowDialogClosingMessage() {
  const index = Math.floor(Math.random() * (commonClosingMessages.length + followDialogClosingMessages.length));
  return [...commonClosingMessages, ...followDialogClosingMessages].at(index);
}
