const LOGLEVELS = {
    LOG: '⚪',
    INFO: '🟢',
    DEBUG: '🔵',
    WARN: '🟡',
    ERROR: '🔴',
} as const;

type LOGLEVEL = (typeof LOGLEVELS)[keyof typeof LOGLEVELS];

export class Logger {
    static log(...args: unknown[]) {
        Logger.logInternal(console.log, LOGLEVELS.LOG, ...args);
    }

    static info(...args: unknown[]) {
        Logger.logInternal(console.info, LOGLEVELS.INFO, ...args);
    }

    static debug(...args: unknown[]) {
        Logger.logInternal(console.debug, LOGLEVELS.DEBUG, ...args);
    }

    static warn(...args: unknown[]) {
        Logger.logInternal(console.warn, LOGLEVELS.WARN, ...args);
    }

    static error(...args: unknown[]) {
        Logger.logInternal(console.error, LOGLEVELS.ERROR, ...args);
    }

    private static logInternal(consolePrinter: (...params: unknown[]) => void, level: LOGLEVEL, ...args: unknown[]) {
        if (args.length > 0) {
            consolePrinter(`[${level} ${new Date().toLocaleString()}]  `, ...args);
        } else {
            Logger.error('Logger must be called with at least one argument');
        }
    }
}
