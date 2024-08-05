'use client';

import { Command } from 'cmdk';
import React from 'react';

const CommandMenu = (props: { defaultValue: string }) => {
  const { defaultValue } = props;
  const [value, setValue] = React.useState('apple');
  return (
    <Command value='value' onValueChange={(v) => setValue} label='Command Menu'>
      <Command.Input className='text-blue-500' />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading='Letters'>
          <Command.Item>a</Command.Item>
          <Command.Item>b</Command.Item>
          <Command.Separator />
          <Command.Item>c</Command.Item>
        </Command.Group>

        <Command.Item>Apple</Command.Item>
      </Command.List>
    </Command>
  );
};

export default function App() {
  const defaultValue = 'test';
  return (
    <div className='App'>
      {/* <h1>defaultValue={defaultValue}</h1>
      <p>
        Expected the input below to render with the defaultValue {defaultValue}.
      </p> */}
      <CommandMenu defaultValue={defaultValue} />
    </div>
  );
}
