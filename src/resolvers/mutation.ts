import { IResolvers } from "graphql-tools";
import { Datetime } from '../lib/datetime';

const mutation: IResolvers = {
    Mutation: {
        async register(__: void, { user }, { db }): Promise<any> {
            const lastUser = await db.collection('users').find()
                .limit(1).sort({ registerDate: -1 }).toArray();

            if (!lastUser.length) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
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