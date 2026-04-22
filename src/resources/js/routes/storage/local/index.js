import { queryParams, applyUrlDefaults } from './../../../wayfinder';
/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:119
* @route '/storage/{path}'
*/
export const upload = (args, options) => ({
    url: upload.url(args, options),
    method: 'put',
});
upload.definition = {
    methods: ["put"],
    url: '/storage/{path}',
};
/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:119
* @route '/storage/{path}'
*/
upload.url = (args, options) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { path: args };
    }
    if (Array.isArray(args)) {
        args = {
            path: args[0],
        };
    }
    args = applyUrlDefaults(args);
    const parsedArgs = {
        path: args.path,
    };
    return upload.definition.url
        .replace('{path}', parsedArgs.path.toString())
        .replace(/\/+$/, '') + queryParams(options);
};
/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:119
* @route '/storage/{path}'
*/
upload.put = (args, options) => ({
    url: upload.url(args, options),
    method: 'put',
});
const local = {
    upload: Object.assign(upload, upload),
};
export default local;
