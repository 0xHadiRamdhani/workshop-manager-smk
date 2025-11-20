module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',
                        '@/src': './src',
                        '@/components': './src/components',
                        '@/screens': './src/screens',
                        '@/navigation': './src/navigation',
                        '@/store': './src/store',
                        '@/theme': './src/theme',
                        '@/types': './src/types',
                        '@/constants': './constants',
                        '@/hooks': './hooks',
                    },
                },
            ],
        ],
    };
};