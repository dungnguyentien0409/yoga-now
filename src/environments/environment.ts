// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rootApi: 'api',
  fingerprintRetryTimes: 3,
  initialNewStudent: {
    'gender': 'F',
    'birthday': '05/21/2015',
    'address': '66/72/ XVNT, P21, Q Bình Thạnh',
    'email': 'reta.rolfson34@yahoo.com',
    'phone': '23432421212',
    'fullname': 'New Student'
  }
};
