import React from 'react';
import Link from '@material-ui/core/Link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';
import { atomOneDark as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import YAML from 'yaml';

import './Code';
import Screens from './Screens';
import { parse } from 'graphql';

export default function Code({
  language,
  value,
}: {
  language: string;
  value: any;
}) {
  // if (language === 'browserqlPlayground') {
  //   return <BrowserqlPlayground />
  // }

  if (language === 'sandbox') {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div style={{ padding: 24 }}>
          <Typography>
            <Link
              href={`https://codesandbox.io/embed/${value.trim()}`}
              target='_blank'
            >
              SANDBOX
            </Link>
          </Typography>
        </div>
      );
    }
    // &previewwindow=console
    return (
      <iframe
        src={`https://codesandbox.io/embed/${value.trim()}?fontsize=14&hidenavigation=1&theme=dark&hidenavigation=0&view=preview`}
        style={{
          width: '100%',
          height: 500,
          border: 0,
          borderRadius: 4,
          overflow: 'hidden',
        }}
        title='browserql client'
        allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
        sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
      ></iframe>
    );
  }

  if (language === 'screens') {
    const parsed = YAML.parse(value);
    return <Screens screens={parsed.screens} />;
  }

  return (
    <div style={{ position: 'relative' }} className='browserqldocs-code'>
      <SyntaxHighlighter
        showLineNumbers={false}
        style={style}
        language={language}
        children={`\n${value}`}
      />
      <div
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
        }}
      >
        <Chip color='default' label={language} />
      </div>
    </div>
  );
}
