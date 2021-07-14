import React, { useState } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Container = styled.div({
  display: "flex",
  padding: "8px",
});

const ContainerVertical = styled.div({
  display: "flex",
  flexDirection: "column",
  padding: "8px",
});

const ContainerSelect = styled.div({
  width: "300px",
  marginRight: "12px",
});

const Button = styled.button(({ theme }) => ({
  color: "white",
  backgroundColor: theme.color.primary,
  borderRadius: "60px",
  border: "none",
  marginRight: "12px",
  padding: "8px 12px",
  fontSize: `${theme.typography.size.s3}px`,
  fontFamily: theme.typography.fonts.base,
  "&:hover": {
    cursor: "pointer",
    filter: "brightness(115%)",
  },
}));

// const reactSelectTheme = (theme) => ({
//   ...theme,
//   colors: {
//     ...theme.colors,
//     primary25: "#BBCBCB",
//     primary: "#BBCBCB",
//     primary50: "#BBCBCB",
//   },
// });

// const selectStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     padding: 12,
//     color: state.isSelected ? "#ffffff" : provided.color,
//     fontFamily: `${convert(themes.normal).typography.fonts.base}`,
//     "&:hover": {
//       color: "#ffffff",
//     },
//   }),
// };

const PanelControls = (props) => {
  const { filePath, fileState, setFileState, files, handleFileChange } = props;

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

  return (
    <ContainerVertical>
      <Container>
        <ContainerSelect>
          {/* <Select
            onChange={({ value }) => {
              handleFileChange(value);
            }}
            styles={selectStyles}
            theme={reactSelectTheme}
            value={{ value: filePath, label: filePath }}
            options={files.map((file) => ({ value: file, label: file }))}
          /> */}
        </ContainerSelect>
        {/* <Button
          disabled={fileState.idx === 0}
          icon="step-backward"
          onClick={handleBack}
        >
          <AiOutlineArrowLeft />
          </Button>
          <Button
            disabled={fileState.idx === fileState.history.length - 1}
            icon="step-forward"
            onClick={handleForward}
          >
            <AiOutlineArrowRight />
          </Button> */}
      </Container>
    </ContainerVertical>
  );
};

export default PanelControls;
