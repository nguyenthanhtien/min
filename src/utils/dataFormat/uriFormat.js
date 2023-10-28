import * as _ from 'lodash-es';

export const paramsToObject = (queryString) => {
  const str = queryString.substring(1);
  const params = Object.fromEntries(new URLSearchParams(str));

  return params;
};

export const objectToParams = (obj) => {
  if (_.isEmpty(obj)) {
    return '';
  }

  const queryString = `?${Object.keys(obj)
    .map((key) => {
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join('&')}`;

  return queryString;
};
