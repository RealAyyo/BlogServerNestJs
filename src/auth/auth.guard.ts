import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token = req.cookies['jwt']

            const user = this.jwtService.verifyAsync(token)
            if (!user) {
                throw new UnauthorizedException({message: "Нет доступа"})
            }
            return true;

        } catch (e) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"})
        }
    }
}