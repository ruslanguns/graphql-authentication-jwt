import { IResolvers } from "graphql-tools";
import Jwt from '../lib/jwt';

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

            if (password !== user.password) {
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

        }
    }
}

export default query;