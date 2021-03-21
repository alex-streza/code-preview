import path from "path";
import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "./SyntaxHighlighter";
import PanelControls from "./PanelControls";

const Panel = (props) => {
  const { channel, rawSources: rawSourcesFromProps } = props;
  const [fileState, setFileState] = useState({ history: [], idx: 0 });
  const filePath = fileState.history[fileState.idx] || "";
  const [rawSources, setRawSources] = useState(rawSourcesFromProps);

  const handleFileChange = (path, rs) => {
    if (rs) {
      const actualPath = matchPathToSource(path, rs);
      if (actualPath && actualPath !== filePath) {
        const newHistory = fileState.history
          .slice(0, fileState.idx + 1)
          .concat(actualPath);
        const newIdx = newHistory.length - 1;
        setFileState({ history: newHistory, idx: newIdx });
      } else {
        console.warn(
          "WARNING! Selected source path not found among rawSources",
          path
        );
      }
    }
  };

  const handleLinkClick = (p) => {
    const rel = path.join(filePath.replace(/\/[^/]*$/, "/"), p);
    const found = [
      "/index.jsx",
      "/index.js",
      "/index.tsx",
      "/index.ts",
      ".jsx",
      ".js",
      ".css",
      ".tsx",
      ".ts",
      "",
    ]
      .map((suff) => rel + suff)
      .find((p) => !!rawSources[p]);
    if (found) {
      handleFileChange(found, rawSources);
    } else {
      console.warn("WARNING - could not find corresponding file in list", rel);
    }
  };

  useEffect(() => {
    channel.on("code-preview/rawSources", (newRawSources) => {
      channel.removeListener("code-preview/rawSources");
      setRawSources(newRawSources);
      if (filePath) {
        handleFileChange(filePath, newRawSources);
      }
    });
    return () => channel.removeListener("code-preview/rawSources");
  }, [setRawSources]);

  useEffect(() => {
    channel.on("code-preview/selectedStory", (p) => {
      if (rawSources) {
        var path = p.substring(p.lastIndexOf("/") + 1);
        handleFileChange(path, rawSources);
      }
    });
    return () => channel.removeListener("code-preview/selectedStory");
  }, [rawSources]);

  if (!props.active) return null;
  if (!rawSources) return <span>...loading...</span>;

  const files = Object.keys(rawSources).sort();
  return (
    <div style={{ padding: "5px" }} className="sourcePanel">
      <PanelControls
        filePath={filePath}
        fileState={fileState}
        setFileState={setFileState}
        files={files}
        handleFileChange={(i) => handleFileChange(i, rawSources)}
      />
      <SyntaxHighlighter
        language={filePath.match(/.css$/) ? "css" : "javascript"}
        code={(rawSources[filePath] || {})["raw"] || ""}
        onLinkClick={handleLinkClick}
      />
    </div>
  );
};

export default Panel;

function matchPathToSource(path, rawSources) {
  const files = Object.keys(rawSources);
  return files.find((file) => file.includes(path) || path.includes(file));
}
