import { IResolvers } from "graphql-tools";
import Jwt from '../lib/jwt';
import bcryptjs from 'bcryptjs';

const query: IResolvers = {
    Query: {
        async users(_: void, __: any, { db }): Promise<any> {
            return await db.collection('users').find().toArray();
        },
        async login(_: void, { email, password }, { db }): Promise<any> {
            const user = await db.collection('users').findOne({ email });

            if (!user) {
                return {
                    status: false,
                    message: 'Login incorrecto, usuario no existe',
                    token: null
                }
            }

            if (!bcryptjs.compareSync(password, user.password)) {
                return {
                    status: false,
                    message: 'Login incorrecto, contraseña incorrecta',
                    token: null
                }
            }
            delete user.password;

            return {
                status: true,
                message: 'Login correcto',
                token: new Jwt().sing({ user })
            };

        },
        me(_: void, __: void, { token }) {
            let info: any = new Jwt().verify(token);

            if (info === 'La autenticación del token es inválido. Por favor inicia sesión de nuevo para generar un nuevo token.') {
                return {
                    status: false,
                    message: info,
                    user: null
                }
            }

            return {
                status: true,
                message: 'Token correcto',
                user: info.user
            }
        }
    }
}

export default query;