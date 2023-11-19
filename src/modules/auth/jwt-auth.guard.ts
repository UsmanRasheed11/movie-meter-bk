// /src/modules/auth/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic for additional checks on the request if needed
    // For example, checking if the user has a specific role or permission

    return super.canActivate(context);
  }
}
