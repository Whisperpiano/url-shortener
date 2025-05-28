import { UAParser } from "ua-parser-js";

export const parseUserAgent = (userAgentString: string) => {
  const parser = new UAParser(userAgentString);

  const browserInfo = parser.getBrowser();

  const osInfo = parser.getOS();

  const deviceInfo = parser.getDevice();

  const browser = {
    name: browserInfo.name || "unknown",
  };

  const os = {
    name: osInfo.name || "unknown",
  };

  const device = {
    type: deviceInfo.type || deviceInfo.vendor || "desktop",
  };

  return {
    browser,
    os,
    device,
  };
};
