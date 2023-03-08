import { useSound } from '@/composables/sound';

describe('sound', () => {
  test('should play audio', () => {
    const { play, isSoundOn } = useSound();

    play('toggle');

    expect(Audio.prototype.play).toHaveBeenCalled();
    expect(isSoundOn.value).toBeTruthy();
  });

  test('should not play audio if muted', () => {
    const { play, isSoundOn } = useSound();
    isSoundOn.value = false;

    play('toggle');

    expect(Audio.prototype.play).not.toHaveBeenCalled();
    expect(isSoundOn.value).toBeFalsy();
  });
});
