import {ScriptManager, Script} from "@callstack/repack/client";

const HOST_APP_URL = __DEV__
  ? "http://localhost:9004"
  : "https://d1c71pae2m7f8d.cloudfront.net/mini-apps";

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  if (caller === "HostApp") {
    return {
      url: Script.getRemoteURL(`${HOST_APP_URL}/${scriptId}`),
      cache: true,
    };
  }

  return {
    url: Script.getDevServerURL(scriptId),
    cache: true,
  };
});

export default ScriptManager;
