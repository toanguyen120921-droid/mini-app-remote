import { ScriptManager, Script, Federated } from '@callstack/repack/client';

const HOST_APP_URL = __DEV__
  ? 'http://localhost:8081'
  : 'https://your-production-server.com/host-app';

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  if (caller === 'HostApp') {
    return {
      url: Script.getRemoteURL(`${HOST_APP_URL}/${scriptId}`),
      cache: false,
    };
  }

  return {
    url: Script.getDevServerURL(scriptId),
    cache: false,
  };
});

export default ScriptManager;
