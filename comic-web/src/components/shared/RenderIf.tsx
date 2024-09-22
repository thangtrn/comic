import React from "react";

interface RenderIfProps {
  condition: boolean;
  children: React.ReactNode;
}

interface ThenElseProps {
  children: React.ReactNode;
}

const Then: React.FC<ThenElseProps> = ({ children }) => <>{children}</>;

const Else: React.FC<ThenElseProps> = ({ children }) => <>{children}</>;

// Component If
const RenderIf: React.FC<RenderIfProps> = ({ condition, children }) => {
  const childrenArray = React.Children.toArray(children);

  const elseChild =
    childrenArray.find((child) => React.isValidElement(child) && child.type === Else) || null;
  const thenChild =
    childrenArray.find((child) => React.isValidElement(child) && child.type === Then) || null;

  if (!thenChild && !elseChild) return condition ? <>{children}</> : null;

  return condition ? thenChild : elseChild;
};

export { RenderIf, Then, Else };
