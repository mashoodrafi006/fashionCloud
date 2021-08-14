import nodeSchedule from "node-schedule";
import cacheService from "./cacheService";

const schedulingCommands = async () => {
    nodeSchedule.scheduleJob('*/10 * * * *', () => {
        cacheService.clearCache();
    });
};

export default {
    schedulingCommands
};
