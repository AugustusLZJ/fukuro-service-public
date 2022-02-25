import AWS from "aws-sdk";

export default class Table extends AWS.DynamoDB.DocumentClient {
  constructor(tableName, options) {
    super(options);
    this.tableName = tableName;
  }

  // async get(params) {
  //   const data = await documentClient.get({...params, TableName: this.tableName});
  //   if (!data || !data.Item) {
  //     throw Error(`Failed to get the data for ID of ${ID} from ${this.tableName}`);
  //   }
  //   console.log(data);
  //   documentClient.getI
  //
  //   return data.Item;
  // }
  //
  // async put(params) {
  //   const res = await documentClient.put({...params, TableName: this.tableName});
  //   if (!res || !res.Item) {
  //     throw Error(`Failed to insert ID of ${data.ID} in table ${this.tableName}`);
  //   }
  //   console.log(data);
  //
  //   return data;
  // }

}