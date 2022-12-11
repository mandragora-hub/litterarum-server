import path from 'path';
import SimpleNodeLogger from 'simple-node-logger'
const filename = path.join(__dirname, '../../logs/project.log');

// you can change format according to you
const logger = SimpleNodeLogger.createSimpleLogger({
    logFilePath: filename,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss'
}
);
export default logger;