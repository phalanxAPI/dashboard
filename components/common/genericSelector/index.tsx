import { Select } from '@mantine/core';
import { useState } from 'react';

export function GenericSelector() {
  const [value, setValue] = useState<string | null>('');
  return (
    <Select
      placeholder="Backend Service IV"
      value={value}
      onChange={setValue}
      data={[
        'Backend Service I',
        'Backend Service II',
        'Backend Service III',
        'Backend Service IV',
      ]}
      mt={29}
      maw={209}
      styles={() => ({
        input: {
          backgroundColor: '#E6E7EB',
          borderRadius: '31px',
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
