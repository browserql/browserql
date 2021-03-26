import { find } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';
import embed from '../embedded';

interface Props {
  module: string;
  example: string;
}

export default function Embed(props: Props) {
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<ReactElement>(<div>loading</div>);
  async function getView() {
    setLoaded(true);
    const em = find(embed, props) as any;
    if (!em) {
      setView(<div>Error: not found</div>);
    } else {
      const View = await em.load();
      setView(<View />);
    }
  }
  useEffect(() => {
    if (!loaded) {
      getView();
    }
  }, [loaded]);
  return view;
}
