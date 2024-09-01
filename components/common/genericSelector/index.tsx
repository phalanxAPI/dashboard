'use client';

import { Select, Skeleton } from '@mantine/core';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';
import { ApplicationDoc } from '@/arsenal/models/application';
import { useActiveApp } from '@/store/activeApp.store';
import { BASE_URL } from '@/utils/constants';
import { genericAPIFetcher } from '@/utils/swr.helper';
import { toTitleCase } from '@/utils';

export function GenericSelector() {
  const { data, error, isLoading } = useSWR<AxiosResponse<{ data: ApplicationDoc[] }>>(
    () => [`${BASE_URL}/applications`, 'get'],
    genericAPIFetcher
  );

  const { activeAppId, setActiveAppId } = useActiveApp();
  useEffect(() => {
    if (data) {
      setActiveAppId(data.data.data[0]._id);
    }
  }, [data]);

  if (isLoading || !data || error) {
    return <Skeleton height={36} w={210} />;
  }
  return (
    <Select
      placeholder="Backend Service IV"
      value={activeAppId}
      onChange={setActiveAppId}
      data={data.data.data.map((app) => ({
        value: app._id,
        label: toTitleCase(app.name.split('-').join(' ')),
      }))}
      mt={29}
      maw={210}
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
