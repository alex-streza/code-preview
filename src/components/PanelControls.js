import React, { useState, useCallback } from "react";
import { styled, themes, convert } from "@storybook/theming";

import {
  MenuItem,
  Icon,
  ControlGroup,
  Button as BButton,
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const Container = styled.div({
  display: "flex",
  padding: "8px",
});

const Button = styled.button({
  height: "32px",
  color: "white",
  backgroundColor: `${convert(themes.light).color.primary}`,
  borderRadius: "8px",
  border: "none",
  marginRight: "12px",
  padding: "4px",
  "&:hover": {
    background: convert(themes.light).background.hoverable,
  },
});

console.log(`themes.light`, themes.light);
const PanelControls = (props) => {
  const {
    filePath,
    fileState,
    setFileState,
    files,
    handleToggleCompiled,
    handleFileChange,
    showCompiled,
  } = props;

  const [query, setQuery] = useState("");

  const handleBack = () =>
    setFileState({
      history: fileState.history,
      idx: Math.max(0, fileState.idx - 1),
    });
  const handleForward = () =>
    setFileState({
      history: fileState.history,
      idx: Math.min(fileState.idx + 1, fileState.history.length - 1),
    });

  const renderItem = useCallback(
    (option, { modifiers, handleClick }) => {
      const currentlySelected = filePath === option;
      return (
        <MenuItem
          key={option}
          icon={
            <Icon icon={currentlySelected ? "tick" : "blank"} iconSize={10} />
          }
          active={modifiers.active}
          text={option}
          shouldDismissPopover={false}
          onClick={handleClick}
        />
      );
    },
    [filePath]
  );

  return (
    <ControlGroup>
      <Container>
        <Button
          disabled={fileState.idx === 0}
          icon="step-backward"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          disabled={fileState.idx === fileState.history.length - 1}
          icon="step-forward"
          onClick={handleForward}
        >
          Next
        </Button>
        <Select
          items={files.filter((option) =>
            option.toLowerCase().includes(query.toLowerCase())
          )}
          itemRenderer={renderItem}
          onItemSelect={handleFileChange}
          popoverProps={{ minimal: true }}
          onQueryChange={setQuery}
        >
          <BButton
            text={filePath || "Select a file"}
            rightIcon="double-caret-vertical"
          />
        </Select>
        {/* <Button
          active={showCompiled}
          text="Compiled"
          onClick={handleToggleCompiled}
        /> */}
      </Container>
    </ControlGroup>
  );
};

export default PanelControls;
