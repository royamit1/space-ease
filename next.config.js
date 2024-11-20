const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

module.exports = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }
        return config;
    },
    images: {
        domains: ['vjvpqjcvudsnzjezwnwn.supabase.co'], // Add your Supabase domain here
    },
};
