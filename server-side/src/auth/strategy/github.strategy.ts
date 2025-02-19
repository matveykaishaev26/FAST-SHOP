import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { VerifiedCallback } from 'passport-jwt';
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ) {
    const { displayName, emails, photos, provider, id } = profile;

    const user = {
      providerId: id,
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
      provider,
    };
    done(null, user);
  }
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('SERVER_URL') + '/auth/github/callback',
      scope: ['user:email'],
    });
  }
}
