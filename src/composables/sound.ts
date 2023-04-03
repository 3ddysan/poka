import type { RemovableRef } from '@vueuse/core';

const sounds = [
  'login',
  'logout',
  'select',
  'deselect',
  'results',
  'reset',
  'error',
  'toggle',
] as const;
export type Sound = (typeof sounds)[number];

const files = sounds.reduce((acc, name) => {
  acc[name] = new Audio(`/sounds/${name}.ogg`);
  return acc;
}, {} as Record<Sound, HTMLAudioElement>);

export interface SoundComposable {
  isSoundOn: RemovableRef<boolean>;
  play(name: Sound): void;
}

export function useSound(): SoundComposable {
  const isSoundOn = useLocalStorage('poka_sound', true);

  const play = (name: Sound) => {
    if (!isSoundOn.value) return;
    const audio = files[name];
    audio.currentTime = 0;
    audio.play();
  };

  return {
    isSoundOn,
    play,
  };
}
