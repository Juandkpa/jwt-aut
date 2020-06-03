import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from './entity/User';
import { MyContext } from './MyContext';
import { createRefreshToken, createAccessToken } from './auth';
import { isAuth } from './isAuth';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi!';
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(
        @Ctx() {payload}: MyContext
    ) {
        return `your user id is: ${payload!.userId}`;
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext
    ): Promise <LoginResponse> {
        const user = await User.findOne({ where: { email }});

        if (!user) throw Error('Invalid login');

        const valid = await compare(password, user.password);

        if(!valid) throw Error('Invalid Login');

        res.cookie(
            'jid',
            createRefreshToken(user),
            {
                httpOnly: true
            }
        );

        return {
            accessToken: createAccessToken(user)
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const hashPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

}