/**
 * A decorator is a way to wrap a story in extra “rendering” functionality. Many addons define decorators
 * in order to augment stories:
 * - with extra rendering
 * - gather details about how a story is rendered
 *
 * When writing stories, decorators are typically used to wrap stories with extra markup or context mocking.
 *
 * https://storybook.js.org/docs/react/writing-stories/decorators#gatsby-focus-wrapper
 */
import addons, { makeDecorator } from "@storybook/addons";

export const decorators = [
  makeDecorator({
    name: "withCodePreview",
    parameterName: "code-preview",
    wrapper: (getStory, context) => {
      const channel = addons.getChannel();
      channel.emit("code-preview/selectedStory", context.parameters.fileName);
      return getStory(context);
    },
  }),
];
