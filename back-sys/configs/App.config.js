'use strict'

const path = require('path')

module.exports = {
    StaticPath: path.join(path.resolve(__dirname, '..'), '/statics'),
    ListenPort: 8080,
    MysqlConfig: {
      host: 'localhost',
      port: 3306,
      database: 'testdb',
      user: 'chan',
      password: 'chan',  
    },
    DataStruct: {
      name: 'VARCHAR(255)',
      a1: 'VARCHAR(255)',
      a2: 'VARCHAR(255)',
      a3: 'VARCHAR(255)',
      k1: 'VARCHAR(255)',
      k2: 'VARCHAR(255)',
      k3: 'VARCHAR(255)',
      pub: 'VARCHAR(255)',
      des: 'VARCHAR(255)',
    },
    Table: 'Test',
    ExpireTime: 3600,
}