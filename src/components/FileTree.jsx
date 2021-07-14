import { styled } from "@storybook/theming";
import React, { useState } from "react";

function convertArrayToTree(paths) {
  // Adapted from http://brandonclapp.com/arranging-an-array-of-flat-paths-into-a-json-tree-like-structure/
  var tree = [];
  let id = 0;
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var currentLevel = tree;
    for (var j = 0; j < path.length; j++) {
      var part = path[j];

      var existingPath = findWhere(currentLevel, "name", part);

      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        var newPart = {
          id: id++,
          name: part,
          children: [],
          path,
        };

        currentLevel.push(newPart);
        currentLevel = newPart.children;
      }
    }
  }
  return tree;

  function findWhere(array, key, value) {
    // Adapted from https://stackoverflow.com/questions/32932994/findwhere-from-underscorejs-to-jquery
    let t = 0; // t is used as a counter
    while (t < array.length && array[t][key] !== value) {
      t++;
    } // find the index where the id is the as the aValue

    if (t < array.length) {
      return array[t];
    } else {
      return false;
    }
  }
}

const TreeContainer = styled.div({
  flex: "1",
  h2: {
    fontWeight: "bold",
    margin: " 20px 0 20px 20px",
  },
});

const TreeNodeContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
});

const TreeChildrenContainer = styled.span({
  display: "flex",
  flexDirection: "column",
});

const TreeItem = styled.span(({ theme }) => ({
  padding: "8px 12px",
  border: "1px solid #ddd",
  color: "#000000",
  maxWidth: "160px",
  borderRadius: "12px",
  marginBottom: "12px",
  cursor: "pointer",
  fontWeight: "600",
  ":hover": {
    color: theme.color.primary,
    boxShadow: `0 0 3px ${theme.color.primary}`,
  },
}));

const Caret = ({ color }) => {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"
        stroke={color}
        fill={color}
      />
    </svg>
  );
};

const TreeNode = ({ current, tree, onFileChange }) => {
  const { children, path, name } = current;

  const [expanded, setExpanded] = useState(false);

  const isLeaf = children.length === 0;

  const onClickNode = () => {
    if (isLeaf) {
      onFileChange("\\" + path.join("\\"));
    } else {
      setExpanded((expanded) => !expanded);
    }
  };

  return (
    <TreeNodeContainer>
      <TreeItem onClick={onClickNode}>
        {name} {!isLeaf && <Caret color="#000000" />}
      </TreeItem>
      <TreeChildrenContainer>
        {expanded &&
          children.map((child) => (
            <TreeNode
              key={child.id}
              current={child}
              tree={tree}
              onFileChange={onFileChange}
            />
          ))}
      </TreeChildrenContainer>
    </TreeNodeContainer>
  );
};

const FileTree = ({ files, onFileChange }) => {
  var fileTree = convertArrayToTree(files.map((p) => p.split("\\").slice(1)));

  return (
    <TreeContainer>
      <h2>Choose file to view</h2>
      <TreeChildrenContainer>
        {fileTree.map((node) => (
          <TreeNode
            key={node.id}
            current={node}
            children={node.children}
            tree={fileTree}
            onFileChange={onFileChange}
          />
        ))}
      </TreeChildrenContainer>
    </TreeContainer>
  );
};

export default FileTree;
