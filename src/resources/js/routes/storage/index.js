import { queryParams, applyUrlDefaults } from './../../wayfinder';
import localA91488 from './local';
/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:111
* @route '/storage/{path}'
*/
export const local = (args, options) => ({
    url: local.url(args, options),
    method: 'get',
});
local.definition = {
    methods: ["get", "head"],
    url: '/storage/{path}',
};
/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:111
* @route '/storage/{path}'
*/
local.url = (args, options) => {
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
    return local.definition.url
        .replace('{path}', parsedArgs.path.toString())
        .replace(/\/+$/, '') + queryParams(options);
};
/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:111
* @route '/storage/{path}'
*/
local.get = (args, options) => ({
    url: local.url(args, options),
    method: 'get',
});
/**
* @see vendor/laravel/framework/src/Illuminate/Filesystem/FilesystemServiceProvider.php:111
* @route '/storage/{path}'
*/
local.head = (args, options) => ({
    url: local.url(args, options),
    method: 'head',
});
const storage = {
    local: Object.assign(local, localA91488),
};
export default storage;
