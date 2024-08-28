import axios from 'axios';
import { Fetcher } from 'swr';

export const genericAPIFetcher: Fetcher<any, any> = async ([url, type, ...rest]: [
  string,
  'get' | 'post' | 'put' | 'delete',
  any[]?,
  // eslint-disable-next-line @typescript-eslint/return-await
]) => await axios[type](url, ...rest);

export const genericMutationFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      type: 'get' | 'post' | 'put' | 'delete';
      rest?: any[];
    };
  }
  // eslint-disable-next-line @typescript-eslint/return-await
) => await axios[arg.type](url, ...(arg.rest || []));
