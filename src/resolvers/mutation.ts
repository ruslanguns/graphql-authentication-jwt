import { IResolvers } from "graphql-tools";
import { Datetime } from '../lib/datetime';
import bcryptjs from 'bcryptjs';

const mutation: IResolvers = {
    Mutation: {
        async register(__: void, { user }, { db }): Promise<any> {

            const userExist = await db.collection('users').findOne({ email: user.email });

            if (userExist) {
                return {
                    status: false,
                    message: `Usuario ya se encuenta registrado`,
                    user: null
                };
            }

            const lastUser = await db.collection('users').find()
                .limit(1).sort({ registerDate: -1 }).toArray();

            if (!lastUser.length) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
            user.password = bcryptjs.hashSync(user.password, 10);
            user.registerDate = new Datetime().getCurrentDateTime();
            return await db.collection('users').insertOne(user)
                .then((result: any) => {
                    return {
                        status: true,
                        message: `Usuario ${user.name} añadido correctamente`,
                        user
                    };
                })
                .catch((err: any) => {
                    return {
                        status: false,
                        message: `Usuario no se ha podido añadir`,
                        user: null
                    };
                });
        }
    }
}

export default mutation;