import nodeSchedule from "node-schedule";
import cacheService from "./cacheService";

const schedulingCommands = async () => {

    /*
        This cron command will run every 10 minutes and delete older records.
    */
    nodeSchedule.scheduleJob('*/10 * * * *', () => {
        cacheService.clearCache();
    });
};

export default {
    schedulingCommands
};
