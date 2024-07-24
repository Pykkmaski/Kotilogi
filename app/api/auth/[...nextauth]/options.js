import db from 'kotilogi-app/dbconfig';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

async function verifyUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db('data_users').where({ email }).first();
      if (!user) throw new Error('invalid_user');

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) throw new Error('password_mismatch');

      const [cart] = await db('carts').where({ customer: email });
      const currentDate = Date.now();

      if (cart && currentDate >= cart.due) {
        user.status = 'unpaid';
      }

      resolve(user);
    } catch (err) {
      console.log(err.message);
      reject(err);
    }
  });
}

export const options = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === 'update' && session?.status) {
        console.log('Updating session status...');
        token.status = session.status;
        return token;
      }

      if (user) {
        if (user.activatedOn) {
          const currentDate = new Date();
          const userActivatedDate = new Date(user.activatedOn);

          const yearsSinceActivation = currentDate.getFullYear() - userActivatedDate.getFullYear();
          const nextPaymentDate = new Date();
          nextPaymentDate.setFullYear(currentDate.getFullYear() + 1 + yearsSinceActivation);
          token.nextPayment = nextPaymentDate.toLocaleDateString('fi');
        }

        token.status = user.status;
        token.createdAt = user.createdAt;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token, trigger }) {
      if (trigger === 'update') {
        console.log('Returning new session');
        return { ...token, user: { ...session.user } };
      }

      return { user: { ...token } };
    },
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await verifyUser(email, password);
        return user;
      },
    }),
  ],
};
