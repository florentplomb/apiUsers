const getTimeStamp = (): string => {
    return new Date().toISOString(); // nice human readable format
};

const warn = (namespace: string, message: string, object?: any) => {
    console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object ? object : '');
};
const error = (namespace: string, message: string, object?: any) => {
    console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object ? object : '');
};
const debug = (namespace: string, message: string, object?: any) => {
    console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object ? object : '');
};
const info = (namespace: string, message: string, object?: any) => {
    console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object ? object : '');
};

export default {
    // export function
    // don't need to specifie key, js match with name
    info,
    warn,
    error,
    debug
};
