import AWS from "aws-sdk"

export default class PostsAPI extends AWS.DynamoDB.DocumentClient {
  constructor(tableName, options) {
    super(options)
    this.tableName = tableName
  }

  async getPost(id) {
    try {
      const data = await this.get({
        TableName: this.tableName,
        Key: {
          id: id
        }
      }).promise()
      console.log({data})
      return data.Item

    } catch (e) {
      throw Error(`Failed to get data of ${id} from ${this.tableName}: ${e}`);
    }

  }

  async putPost(id, userId, content, createdAt, meetDate, meetTime, tipsType, tipsAmount) {
    try {
      const res = await this.put({
        TableName: this.tableName,
        Item: {
          id: id,
          userId: userId,
          content: content,
          createdAt: createdAt,
          meetDate: meetDate,
          meetTime: meetTime,
          tipsType: tipsType,
          tipsAmount: tipsAmount,
        }
      }).promise()

      console.log({res})
      return true

    } catch (e) {
      throw Error(`Failed to insert ID of ${id} in table ${this.tableName}: ${e}`);
      return false
    }

  }
}