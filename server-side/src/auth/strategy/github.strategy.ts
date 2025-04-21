import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { VerifiedCallback } from 'passport-jwt';
import axios from 'axios';  // импортируем axios для запроса дополнительной информации

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ) {
    const { displayName, photos, provider, id } = profile;
    // console.log('Github profile', profile);

    // Получаем email, если он есть в профиле
    let email = null;
    if (profile.emails && profile.emails.length > 0) {
      email = profile.emails[0].value;
    }

    if (!email) {
      // Если email не найден, запросим его через API GitHub
      try {
        const response = await axios.get('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${_accessToken}`,
          },
        });
        const emailData = response.data.find((emailObj: any) => emailObj.primary);
        email = emailData ? emailData.email : null;
      } catch (error) {
        console.error('Ошибка при получении email с GitHub API', error);
      }
    }

    const user = {
      providerAccountId: id,
      email,
      name: displayName || 'Unknown',
      picture: photos[0]?.value,  // убедимся, что фото существует
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
