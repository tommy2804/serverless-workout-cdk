import { RemovalPolicy } from 'aws-cdk-lib';
import { UserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { UserPoolIdentityProviderGoogle,UserPoolIdentityProviderGoogleProps } from 'aws-cdk-lib/aws-cognito';

export class CognitoUserPool extends Construct {
  readonly userPoolId: string;
  readonly userPoolClientId: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const userPool = new UserPool(this, 'UserPool', {
      userPoolName: 'my-user-pool',
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
        phone: true,
      },
      autoVerify: {
        email: true,
        phone: true,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });
    const appClient = userPool.addClient('AppClient', {
      authFlows: { userPassword: true },
    });
    this.userPoolId = userPool.userPoolId;
    this.userPoolClientId = appClient.userPoolClientId;
  }
}
