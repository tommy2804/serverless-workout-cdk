const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
const axios = require('axios');

export type JwtToken = { sub: string; email: string } | null;
export type Jwk = {
  keys: {
    alg: string;
    e: string;
    kid: string;
    kty: string;
    n: string;
    use: string;
  }[];
};

export const verifyToken = async (token: string, userPoolId: string): Promise<JwtToken> => {
  try {
    const url = `https://cognito-idp.eu-central-1.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

    const { data }: { data: Jwk } = await axios.get(url);
    const pem = jwkToPem(data.keys[0]);

    return jwt.verify(token, pem, { algorithms: ['RS256'] });
  } catch (err) {
    console.log(err);
    return null;
  }
};
