import { defineConfig, presetWind } from 'unocss';
import presetWebFonts from '@unocss/preset-web-fonts';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [presetWind({ dark: 'class' }), presetWebFonts()],
  transformers: [transformerDirectives()],
});
