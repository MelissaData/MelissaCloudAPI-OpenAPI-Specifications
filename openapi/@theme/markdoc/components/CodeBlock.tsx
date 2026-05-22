import React from 'react';

import {
  CodeBlock as CodeBlockComponent,
  type CodeBlockProps,
} from '@redocly/theme/components/CodeBlock/CodeBlock';

export function CodeBlock(props: CodeBlockProps) {
  return (
    <figure>
        <CodeBlockComponent {...props} />
    </figure>
  )
}
