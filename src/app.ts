import { Server } from '@hapi/hapi';
import { usersRoutes } from './routes/user.routes';

export const init = async () => {
  const server: Server = new Server({
    port: 3000,
    host: 'localhost',
  });

  usersRoutes(server);

  await server.start();
  console.log('Server runing on %s', server.info.uri);
};
