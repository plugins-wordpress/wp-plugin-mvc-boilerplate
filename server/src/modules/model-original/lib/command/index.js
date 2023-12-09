/**
 * Returns an object containing exports for different command modules.
 *
 * @returns {Object} An object containing exports for different command modules.
 */
module.exports = () => ({
    //MethodCommand: require('./method'),
    //MigrateCommand: require('./migrate'),
    //MigrationCommand: require('./migration'),
    //SchemaCommand: require('./schema'),
    ModelCommand: require('./model'),
  });
  