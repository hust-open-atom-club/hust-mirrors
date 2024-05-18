/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ComponentProps} from 'react';
import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import CodeInline from '@theme/CodeInline';
import type {Props} from '@theme/MDXComponents/Code';
import CodeBlockWithVariables from "@site/src/theme/MDXComponents/CodeBlockWithVariables";

function shouldBeInline(props: Props) {
  return (
    // empty code blocks have no props.children,
    // see https://github.com/facebook/docusaurus/pull/9704
    typeof props.children !== 'undefined' &&
    React.Children.toArray(props.children).every(
      (el) => typeof el === 'string' && !el.includes('\n'),
    )
  );
}
type CodeNode = {
  metastring: string;
  children: string;
  className: string;
}
function shouldBeVarCodeBlock(node: CodeNode) {
  const meta = node.metastring || ''
  return (
    typeof node.children !== 'undefined' && meta.match(/\S+/g)?.[0] == 'varcode'
  )
}

export default function MDXCode(props: Props): JSX.Element {
  return shouldBeInline(props) ? (
    <CodeInline {...props} />
  ) : (shouldBeVarCodeBlock(props as CodeNode) ?
      <CodeBlockWithVariables {...(props as Props)}/>
      : (
        <CodeBlock {...(props as ComponentProps<typeof CodeBlock>)} />
      )
  )
}
