const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

export default class Database {
  async connect() {
    if (!this._connection) {
      let params = {};
      if (__DEV__) {
        params = {
          endpoint: process.env.DB_URL,
          region: 'local',
          accessKeyId: 'local',
          secretAccessKey: 'local',
        };
      } else {
        params = {
          region: 'us-east-1',
          apiVersion: '2012-08-10',
        };
      }

      this._connection = new AWS.DynamoDB(params);

      if (__DEV__) {
        // will create tables through lambda only in development
        await this.createTables(tables);
      }
    }

    return this._connection;
  }

  async putItem(params) {
    
    return new Promise((resolve, reject) => {
      this._connection.putItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async getItem(params) {
    return new Promise((resolve, reject) => {
      this._connection.getItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async updateItem(params) {
    return new Promise((resolve, reject) => {
      this._connection.updateItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async scan(params = {}) {
    return new Promise((resolve, reject) => {
      this._connection.scan(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async deleteItem(params) {
    return new Promise((resolve, reject) => {
      this._connection.deleteItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

}