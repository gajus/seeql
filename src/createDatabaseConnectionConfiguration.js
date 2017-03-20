// @flow

type DatabaseConfigurationType = {
  +databaseDatabase: string,
  +databaseHost: string,
  +databasePassword: string,
  +databaseUser: string
};

export default (configuration: DatabaseConfigurationType) => {
  return {
    database: configuration.databaseDatabase,
    dateStrings: true,
    host: configuration.databaseHost,
    password: configuration.databasePassword,
    user: configuration.databaseUser
  };
};
