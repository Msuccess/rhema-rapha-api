import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: any) {
    try {
      const offuscateRequest = JSON.parse(JSON.stringify(req.body));
      if (offuscateRequest && offuscateRequest.password)
        offuscateRequest.password = '*******';
      if (offuscateRequest && offuscateRequest.newPassword)
        offuscateRequest.newPassword = '*******';
      if (offuscateRequest && offuscateRequest.currentPassword)
        offuscateRequest.currentPassword = '*******';
      if (offuscateRequest != {})
        console.log(
          new Date().toString() +
            ' - [Request] ' +
            req.baseUrl +
            ' - ' +
            JSON.stringify(offuscateRequest),
        );
    } catch (error) {}
    next();
  }
}
