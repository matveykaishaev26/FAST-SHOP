import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const { displayName, emails, photos, provider, id } = profile;

    const user = {
      providerAccountId: id,
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
      provider,
    };
    done(null, user);
  }
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('YANDEX_CLIENT_ID'),
      clientSecret: configService.get('YANDEX_CLIENT_SECRET'),
      callbackURL: configService.get('SERVER_URL') + '/auth/yandex/callback',
    });
  }
}
