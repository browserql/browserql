import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import Code from './Code';

enum ScreenLanguage {
  grapqhl,
}

interface Screen {
  language: ScreenLanguage;
  name: string;
  source: string;
  eval?: string;
}

interface Props {
  screens: Screen[];
}

export default function Screens({ screens }: Props) {
  console.log({ screens });
  const [tab, setTab] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  const selectedScreen = screens[tab];
  return (
    <div>
      <Tabs
        value={tab}
        indicatorColor='primary'
        onChange={handleChange}
        variant='fullWidth'
      >
        {screens.map(screen => (
          <Tab
            label={screen.eval ? 'Result' : screen.name}
            key={`${screen.name}-${screen.eval ? 'eval' : ''}`}
          />
        ))}
      </Tabs>
      <Code
        language={(selectedScreen.language as unknown) as string}
        value={selectedScreen.source}
      />
    </div>
  );
}
