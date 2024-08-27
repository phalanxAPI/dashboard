'use client';

import { Select } from '@mantine/core';
import { useState } from 'react';

export function APIStatusSelector() {
  const [value, setValue] = useState<string | null>('');
  return (
    <Select
      placeholder="API Requests"
      value={value}
      onChange={setValue}
      defaultValue="API Requests"
      data={[
        'Backend Service I',
        'Backend Service II',
        'Backend Service III',
        'Backend Service IV',
      ]}
      maw={143}
      mah={32}
      styles={() => ({
        input: {
          backgroundColor: '#E6E7EB',
          borderRadius: '32px',
        },
        item: {
          '&[data-selected]': {
            backgroundColor: '#d1e7fd',
          },
          '&[data-hovered]': {
            backgroundColor: '#e0e0e0',
          },
        },
      })}
    />
  );
}
