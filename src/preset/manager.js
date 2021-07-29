import { addons, types } from "@storybook/addons";
import { ADDON_ID, PANEL_ID } from "../constants";
import PreviewCodePanel from "../components/Panel";
import React from "react";

let currentId;

// Register the addon
addons.register(ADDON_ID, (api) => {
  const channel = api.getChannel();
  let rawSources;
  function fetchSources() {
    fetch("./rawSources.json")
      .then((response) => response.json())
      .then((data) => {
        if (!rawSources || currentId !== data.id) {
          currentId = data.id;
          rawSources = data.files;
          channel.emit("code-preview/rawSources", data.files);
        }
      })
      .catch((error) => {
        console.log(`Raw sources error`, error);
      });
  }
  fetchSources();

  // Register the panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Code Preview",
    route: ({ storyId }) => `/code-preview/${storyId}`,
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => (
      <PreviewCodePanel
        channel={addons.getChannel()}
        api={api}
        active={active}
        rawSources={rawSources}
      />
    ),
  });
});
