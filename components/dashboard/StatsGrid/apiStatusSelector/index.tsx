'use client';

import { Dispatch, SetStateAction } from 'react';

import { Select } from '@mantine/core';

interface APIStatusSelectorProps {
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
  data: string[];
}
export function APIStatusSelector({ value, setValue, data }: APIStatusSelectorProps) {
  return (
    <Select
      placeholder="API Requests"
      value={value}
      onChange={setValue}
      defaultValue="API Requests"
      data={data}
      maw={180}
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
