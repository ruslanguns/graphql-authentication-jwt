import { SECRET_KEY } from '../config/constants';
import jwt from 'jsonwebtoken';

class Jwt {
    private secretKey = SECRET_KEY as string;

    sing(data: any): string {
        return jwt.sign({ user: data.user }, this.secretKey, { expiresIn: 24 * 60 * 60 });
    }

    verify(token: string): string {
        try {
            return jwt.verify(token, this.secretKey) as string;

        } catch (error) {
            return 'La autenticación del token es inválido. Por favor inicia sesión de nuevo para generar un nuevo token.';
        }
    }
}

export default Jwt;