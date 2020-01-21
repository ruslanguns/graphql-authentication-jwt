import { IResolvers } from "graphql-tools";

const query: IResolvers = {
    Query: {
        async users(_: void, __: any, { db }): Promise<any> {
            return await db.collection('users').find().toArray();
        },
        async login(_: void, { email, password }, { db }): Promise<any> {
            return await db.collection('users').findOne({ email, password })
                .then((user: any) => {
                    if (!user) {
                        return {
                            status: false,
                            message: 'Usuario / Contraseña equivocada',
                            user: null
                        };
                    }
                    return {
                        status: true,
                        message: 'Login correcto',
                        user
                    };
                }).catch((err: any) => {
                    return {
                        status: false,
                        message: 'Usuario / Contraseña equivocada',
                        user: null
                    };
                });
        }
    }
}

export default query;