import { version } from '../package.json';

export default {
  development: {
    baseURL: '/',
  },
  production: {
    baseURL: `/docs/oui/${version}`,
  },
};
