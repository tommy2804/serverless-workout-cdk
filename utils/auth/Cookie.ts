import { APIGatewayProxyEvent, APIGatewayRequestAuthorizerEvent } from 'aws-lambda';

export type CookieMap = { [key: string]: string } | undefined;

export const parseCookies = (event: APIGatewayRequestAuthorizerEvent | APIGatewayProxyEvent) => {
  if (!event.headers || !event.headers.Cookie) {
    return undefined;
  }

  const cookiesStr = event.headers.Cookie;
  const cookiesArr = cookiesStr.split(';');

  const cookieMap: CookieMap = {};

  for (let cookie of cookiesArr) {
    const cookieSplit = cookie.trim().split('=');
    cookieMap[cookieSplit[0]] = cookieSplit[1];
  }

  return cookieMap;
};
