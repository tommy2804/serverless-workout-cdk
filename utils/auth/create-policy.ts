import { APIGatewayAuthorizerEvent, PolicyDocument } from 'aws-lambda';

export const createPolicy = (event: APIGatewayAuthorizerEvent, effect: string): PolicyDocument => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: effect,
        Action: 'execute-api:Invoke',
        Resource: [event.methodArn],
      },
    ],
  };
};
