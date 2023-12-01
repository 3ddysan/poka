import { type Preview, setup } from '@storybook/vue3';
import { useArgs } from '@storybook/preview-api';
import { action } from '@storybook/addon-actions';
import { usePlugins } from '../src/plugins';
import { withDarkMode } from './with-dark-mode.decorator';

setup((app) => {
  usePlugins(app);
});

export default {
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withDarkMode,
    (story) => ({
      name: 'StyleDecorator',
      components: { story },
      template:
        '<div style="display: flex; justify-content: center;"><story /></div>',
    }),
    (story, context) => {
      const [args, updateArgs] = useArgs();
      return {
        name: 'ActionEnhancerDecorator',
        components: { story },
        setup() {
          const events = // eslint-disable-next-line dot-notation
            (context.component['__docgenInfo']?.events || []).map(
              ({ name }: { name: string }) => {
                const eventHandlerName = `on${
                  name.charAt(0).toUpperCase() + name.slice(1)
                }`;
                const argName = name.split(':')[1];
                return {
                  eventName: name,
                  eventHandlerName,
                  argName,
                  isEventHandlerPresent: eventHandlerName in args,
                  isVModel: argName in args,
                };
              },
            );
          const eventArgs = events.reduce(
            (
              acc,
              { argName, eventHandlerName, isVModel, isEventHandlerPresent },
            ) => {
              if (!isEventHandlerPresent) {
                acc[eventHandlerName] = (...value: unknown[]) => {
                  action(eventHandlerName)(...value);
                  if (isVModel) updateArgs({ [argName]: value[0] });
                };
              }
              return acc;
            },
            {},
          );
          updateArgs(eventArgs);
          return {};
        },
        template: '<story />',
      };
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      toolbar: {
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
} satisfies Preview;
