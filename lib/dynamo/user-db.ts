import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface UserTable {
  tableName: string;
  partitionKey: string;
}

export class UserConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const userTable: UserTable = {
      tableName: 'UserTable',
      partitionKey: 'userId',
    };

    // Create the DynamoDB table
    const table = new dynamodb.Table(this, 'UserTable', {
      tableName: userTable.tableName,
      partitionKey: {
        name: userTable.partitionKey,
        type: dynamodb.AttributeType.STRING,
      },
      // Add any other desired properties, such as provisioned throughput
      // or read/write capacity mode.
    });

    // You can now use the 'table' object to further configure the table
    // or add additional resources or permissions.
  }
}
