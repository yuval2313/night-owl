export const pinoLoggerConfiguration = {
  pinoHttp: {
    customProps: () => ({
      context: 'HTTP',
    }),
    customLogLevel: (_, res) => {
      if (res.statusCode >= 400 && res.statusCode < 500) return 'error';
      if (res.statusCode >= 500 && res.statusCode < 600) return 'fatal';
    },
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        colorize: true,
        levelFirst: true,
      },
    },
  },
};
