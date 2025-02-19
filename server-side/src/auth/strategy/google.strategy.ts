import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { VerifiedCallback } from 'passport-jwt';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ) {
    const { displayName, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
    };
    done(null, user);
  }
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('SERVER_URL') + '/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }
}
