import jwt from 'jsonwebtoken';
import { Token } from '../models/token.model';

const JWT_ACCESS_KEY: jwt.Secret = process.env.JWT_ACCESS_KEY || '';
const JWT_REFRESH_KEY: jwt.Secret = process.env.JWT_REFRESH_KEY || '';


class TokenService {
  // Генерация JWT токенов
  async generateTokens (payload: string | object | Buffer ) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_KEY, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, JWT_REFRESH_KEY, {expiresIn: '30d'});

    return {
      accessToken,
      refreshToken,
    }
  };

  validateAccessToken (accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, JWT_ACCESS_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  };

  validateRefreshToken (refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, JWT_REFRESH_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  };

  // Сохранения токеноd в БД
  async saveToken (userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });

    if(tokenData){
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    // Сохранения JWT токена и ID пользователя в базе данных
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  };

  async removeToken (refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  };

  async findToken (refreshToken: string) {
    const token = await Token.findOne({ refreshToken });
    return token;
  }
}

export default new TokenService();