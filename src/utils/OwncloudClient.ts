import { createClient, WebDAVClient } from "webdav";

const { WEBDAV_BASE_URL, WEBDAV_USER, WEBDAV_TOKEN, WEBDAV_BASE_DIR } =
  process.env;

class OwncloudClient {
  client: WebDAVClient;

  constructor() {
    this.client = createClient(WEBDAV_BASE_URL, {
      username: WEBDAV_USER,
      password: WEBDAV_TOKEN,
    });
  }

  async getDirectoryContents() {
    return this.client.getDirectoryContents(WEBDAV_BASE_DIR);
  }
  async exists(path: string) {
    return this.client.exists(`${WEBDAV_BASE_DIR}/${path}`);
  }
  async stat(path: string) {
    return this.client.stat(`${WEBDAV_BASE_DIR}/${path}`);
  }
  createReadStream(filename: string) {
    return this.client.createReadStream(`${WEBDAV_BASE_DIR}/${filename}`);
  }
  async putFileContents(filename: string, buffer: string | Buffer) {
    return this.client.putFileContents(`/${filename}`, buffer);
  }
}

export default new OwncloudClient();
