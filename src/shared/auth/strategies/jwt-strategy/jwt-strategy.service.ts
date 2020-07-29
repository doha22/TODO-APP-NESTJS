import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigurationService } from '../../../configuration/configuration/configuration.service';
import { AuthService } from '../../auth/auth.service';
import { JwtPayload } from '../../../auth/auth/jwt-payload';
import { Configuration } from 'src/shared/configuration/configuration/configuration.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _authService: AuthService,
        private readonly _configurationService: ConfigurationService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          //  secretOrKey: _configurationService.get(Configuration.JWT_KEY),
          secretOrKey : 'JWT_KEY'
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this._authService.validateUser(payload);
        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}