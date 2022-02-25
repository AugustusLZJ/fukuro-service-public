import Table from "./table";

export default class UsersAPI extends Table {
  async getUser(userId) {
    try {
      const data = await this.get({
        TableName: this.tableName,
        Key: {
          id: userId
        }
      }).promise();
      console.log({data});
      return data.Item;

    } catch (e) {
      throw Error(`Failed to get data of ${userId} from ${this.tableName}: ${e}`);
    }

  }

  async putUser(id, name, email, createAt) {
    try {
      const res = await this.put({
        TableName: this.tableName,
        Item: {
          id: id,
          name: name,
          email: email,
          createAt: createAt
        }
      }).promise();

      console.log({res});
      return true

    } catch (e) {
      throw Error(`Failed to insert ID of ${id} in table ${this.tableName}: ${e}`);
      return false;
    }

  }
}