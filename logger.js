const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");

class Logger extends EventEmitter {
  // this is log event
  log(message) {
    this.emit("message", { message });
  }

  // this zainLog event
  zainLog(zainMessage) {
    this.emit("zainMessage", { zainMessage });
  }
}

const logger = new Logger();
const logFile = "./eventLog.txt";

// it will be called when the message event is fired
const logToFile = (event) => {
  const loggMessage = `${new Date().toISOString()} - ${event.message} \n`;
  fs.appendFileSync(logFile, loggMessage);
};

// this will be called when the zainMessage event is fired
const zainLog = (event) => {
  console.log(`zainLog has been called ${event.zainMessage}`);
};

// this will listen to message event
logger.on("message", logToFile);

// this will listen to zainMessage event
logger.on("zainMessage", zainLog);

setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  logger.log(`Current memory usage ${memoryUsage}`);
}, 3000);

logger.zainLog("zain log fired");
logger.log("Application is started");
logger.log("Application event occured");
