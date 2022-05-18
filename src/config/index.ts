import * as Sentry from '@sentry/react-native';
import { consoleTransport, logger, sentryTransport } from 'react-native-logs';

Sentry.init({
	dsn: `https://611e5dfbf7e5455b8d5185826ec3aaba@o1079135.ingest.sentry.io/6112876`,
  tracesSampleRate: 1.0,
});

const configs = {
	console: {
		levels: {
			debug: 0,
			info: 1,
			warn: 2,
			error: 3,
		},
		severity: "debug",
		transport: consoleTransport,
		transportOptions: {
			colors: {
				debug: "greenBright",
				info: "blueBright",
				warn: "yellowBright",
				error: "redBright",
			},
		},
		async: true,
		dateFormat: "time",
		printLevel: true,
		printDate: true,
		enabled: true,
	},
	sentry: {
		levels: {
			debug: 0,
			info: 1,
			warn: 2,
			error: 3,
		},
		severity: "debug",
		transport: sentryTransport,
		transportOptions: {
			SENTRY: Sentry,
			colors: {
				debug: "greenBright",
				info: "blueBright",
				warn: "yellowBright",
				error: "redBright",
			},
		},
		async: true,
		dateFormat: "time",
		printLevel: true,
		printDate: true,
		enabled: true,
	}
};

const logConfig = `${process.env.LOG_CONFIG}` as 'console' | 'sentry' || 'console';
const LOG = logger.createLogger(configs[logConfig]);

export {Sentry, LOG};