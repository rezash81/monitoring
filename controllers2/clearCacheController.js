const path = require('path');
let flatCache = require('flat-cache');
const cacheController = require('./controllers2/cacheController');
const my_date = require('./utils/my_date');

const winston = require('winston');

const dotenv = require('dotenv');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
exports.clearRainValuesCache = () => {
    let after50MinutesFromNow = new Date();
    after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+1);
    //after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+50);
    const clearRainValuesCacheJob = new CronJob(
        after50MinutesFromNow,
        function ()  {
            flatCache.clearCacheById('rainValuesCache','../cache/');
            cacheController.clearRainValuesCache();
            logger.info('clearRainValuesCache', { message: `time : ${new Date()}` });
            // let rain_stations_names_and_ids;
            // axios.get(url + '/api/stations/rain')
            //     .then(response => {
            //         if (response.data.data.length) {
            //             rain_stations_names_and_ids = response.data.data;
            //             rain_stations_names_and_ids.map(el => {
            //                 axios.get(url + '/api/values/rain/' + el.id + '/' + 'r')
            //             });
            //
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
            // let clima_rain_stations_names_and_ids;
            // axios.get(url + '/api/stations/clima')
            //     .then(response => {
            //         if (response.data.data.length > 0) {
            //             clima_rain_stations_names_and_ids = response.data.data;
            //             clima_rain_stations_names_and_ids.map(el => {
            //                 axios.get(url + '/api/values/rain/' + el.id + '/' + 'c')
            //             });
            //
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });

            after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+clearRainCachePeriodInMinutes);
            this.setTime(new CronTime(after50MinutesFromNow));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearRainValuesCacheJob.start();
    // const clearRainValuesCacheJob = new CronJob('0 */50 * * * *', async () => {
    //         await flatCache.clearCacheById('rainValuesCache','../cache/');
    //         await cacheController.clearRainValuesCache();
    //     },
    //     null,
    //     true,
    //     'Asia/Tehran'
    // );
    // clearRainValuesCacheJob.start();
}

exports.clearRainTotalsMonthsCache = () => {
    let start_of_next_month = new Date();//(my_date.get_start_of_next_month_in_georgian());
    start_of_next_month.setMinutes(start_of_next_month.getMinutes()+1);
    const clearRainTotalsMonthsCacheJob = new CronJob(
        start_of_next_month,
        function ()  {
            flatCache.clearCacheById('rainTotalsMonthsCache','../cache/');
            cacheController.clearRainTotalsMonthsCache();
            logger.info('clearRainTotalsMonthsCache', { message: `time : ${new Date()}` });


            // let rain_stations_names_and_ids;
            // axios.get(url + '/api/stations/rain')
            //     .then(response => {
            //         if (response.data.data.length > 0) {
            //             rain_stations_names_and_ids = response.data.data;
            //             rain_stations_names_and_ids.map(el => {
            //                 axios.get(url + '/api/values/raintotalsmonths/' + el.id + '/' + 'r')
            //             });
            //
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });
            // let clima_rain_stations_names_and_ids;
            // axios.get(url + '/api/stations/clima')
            //     .then(response => {
            //         if (response.data.data.length > 0) {
            //             clima_rain_stations_names_and_ids = response.data.data;
            //             clima_rain_stations_names_and_ids.map(el => {
            //                 axios.get(url + '/api/values/raintotalsmonths/' + el.id + '/' + 'c')
            //             });
            //
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });

            start_of_next_month = new Date(my_date.get_start_of_next_month_in_georgian());
            this.setTime(new CronTime(start_of_next_month));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearRainTotalsMonthsCacheJob.start();
}
//LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
exports.clearLevelValueCache = () => {
    let after5HoursFromNow = new Date();
    after5HoursFromNow.setMinutes(after5HoursFromNow.getMinutes()+1);
    //after5HoursFromNow.setHours(after5HoursFromNow.getHours()+5);
    const clearLevelValueCacheJob = new CronJob(
        after5HoursFromNow,
        function ()  {
            flatCache.clearCacheById('levelValueCache','../cache/');
            cacheController.clearLevelValueCache();
            logger.info('clearLevelValueCache', { message: `time : ${new Date()}` });

            // let level_stations_names_and_ids;
            // axios.get(url + '/api/stations/level')
            //     .then(response => {
            //         if (response.data.data.length > 0) {
            //             level_stations_names_and_ids = response.data.data;
            //             level_stations_names_and_ids.map(el => {
            //                 axios.get(url + '/api/values/level/' + el.id)
            //             });
            //
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });


            after5HoursFromNow.setHours(after5HoursFromNow.getHours()+clearLevelCachePeriodInHours);
            this.setTime(new CronTime(after5HoursFromNow));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearLevelValueCacheJob.start();

    // const clearLevelValueCacheJob = new CronJob('0 */30 * * * *', function() {
    //     flatCache.clearCacheById('levelValueCache','../cache/');
    //     cacheController.clearLevelValueCache();
    // });
    // clearLevelValueCacheJob.start();
}
exports.clearLevelLastHoursCache = () => {
    let after5HoursFromNow = new Date();
    after5HoursFromNow.setMinutes(after5HoursFromNow.getMinutes()+1);
    //after5HoursFromNow.setHours(after5HoursFromNow.getHours()+5);
    const clearlevelLastHoursCacheJob = new CronJob(
        after5HoursFromNow,
        function () {
            flatCache.clearCacheById('levelLastHoursCache','../cache/');
            cacheController.clearlevelLastHoursCache();
            logger.info('clearLevelLastHoursCache', { message: `time : ${new Date()}` });


            // let level_stations_names_and_ids;
            // axios.get(url + '/api/stations/level')
            //     .then(response => {
            //         if (response.data.data.length > 0) {
            //             level_stations_names_and_ids = response.data.data;
            //             level_stations_names_and_ids.map(el => {
            //                 axios.get(url + '/api/values/levellasthours/' + el.id)
            //             });
            //
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });



            after5HoursFromNow.setHours(after5HoursFromNow.getHours()+clearLevelCachePeriodInHours);
            this.setTime(new CronTime(after5HoursFromNow));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearlevelLastHoursCacheJob.start();

    // const clearlevelLastHoursCacheJob = new CronJob('0 */30 * * * *', function() {
    //     flatCache.clearCacheById('levelLastHoursCache','../cache/');
    //     cacheController.clearlevelLastHoursCache();
    // });
    // clearlevelLastHoursCacheJob.start();
}
//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
exports.clearClimaValuesCache = () => {
    let after50MinutesFromNow = new Date();
    after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+1);
    //after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+50);
    const clearClimaValuesCacheJob = new CronJob(
        after50MinutesFromNow,
        function ()  {
            flatCache.clearCacheById('climaValuesCache','../cache/');
            cacheController.clearClimaValuesCache();
            logger.info('clearClimaValuesCache', { message: `time : ${new Date()}` });


            // let clima_stations_names_and_ids;
            // const sensores = ['TMP', 'HUM', 'PRS', 'WSP', 'WDR', 'EVP', 'RAD', 'RAINC'];
            //
            //     axios.get(url + '/api/stations/clima')
            //         .then(response => {
            //             if (response.data.data.length > 0) {
            //                 clima_stations_names_and_ids = response.data.data;
            //                 clima_stations_names_and_ids.map(el => {
            //                     sensores.map(sensor => {
            //                         axios.get(url + '/api/values/clima/' + sensor.toLowerCase() + '/' + el.id)
            //                     })
            //                 });
            //
            //             }
            //         })
            //         .catch(error => {
            //             console.log(error);
            //         });

            after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+clearClimaCachePeriodInMinutes);
            this.setTime(new CronTime(after50MinutesFromNow));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearClimaValuesCacheJob.start();

    // const clearClimaValuesCacheJob = new CronJob('0 */50 * * * *', async () => {
    //         await flatCache.clearCacheById('climaValuesCache','../cache/');
    //         await cacheController.clearClimaValuesCache();
    //     },
    //     null,
    //     true,
    //     'Asia/Tehran'
    // );
    // clearClimaValuesCacheJob.start();
}
exports.clearClimaLastHoursCache = () => {
    let after50MinutesFromNow = new Date();
    after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+1);
    //after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+50);
    const clearClimaLastHoursCacheJob = new CronJob(
        after50MinutesFromNow,
        function ()  {
            flatCache.clearCacheById('climaLastHoursCache','../cache/');
            cacheController.clearClimaLastHoursCache();
            logger.info('clearClimaLastHoursCache', { message: `time : ${new Date()}` });

            // let clima_stations_names_and_ids;
            // const sensores = ['TMP', 'HUM', 'PRS', 'WSP', 'WDR', 'EVP', 'RAD'];
            //
            // axios.get(url + '/api/stations/clima')
            //     .then(response => {
            //         if (response.data.data.length > 0) {
            //             clima_stations_names_and_ids = response.data.data;
            //             clima_stations_names_and_ids.map(el => {
            //                 sensores.map(sensor => {
            //                         axios.get(url + '/api/values/climalasthours/' + sensor.toLowerCase() + '/' + el.id);
            //                 })
            //             });
            //
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });


            after50MinutesFromNow.setMinutes(after50MinutesFromNow.getMinutes()+clearClimaCachePeriodInMinutes);
            this.setTime(new CronTime(after50MinutesFromNow));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearClimaLastHoursCacheJob.start();

    // const clearClimaLastHoursCacheJob = new CronJob('0 */50 * * * *', async () => {
    //         await flatCache.clearCacheById('climaLastHoursCache','../cache/');
    //         await cacheController.clearClimaLastHoursCache();
    //     },
    //     null,
    //     true,
    //     'Asia/Tehran'
    // );
    // clearClimaLastHoursCacheJob.start();
}

exports.clearClimaRainTotalsMonthsCache = () => {
    let start_of_next_month = new Date(my_date.get_start_of_next_month_in_georgian());
    const clearClimaRainTotalsMonthsCacheJob = new CronJob(
        start_of_next_month,
        function ()  {
            flatCache.clearCacheById('climaRainTotalsMonthsCache','../cache/');
            cacheController.clearClimaRainTotalsMonthsCache();
            logger.info('clearClimaRainTotalsMonthsCache', { message: `time : ${new Date()}` });

            // let clima_stations_names_and_ids;
            // axios.get(url + '/api/stations/clima')
            //     .then(response => {
            //         if (response.data.data.length > 0) {
            //             clima_stations_names_and_ids = response.data.data;
            //             clima_stations_names_and_ids.map(el => {
            //                         axios.get(url + '/api/values/climaraintotalsmonths/' + 'rainc' + '/' + el.id);
            //             });
            //         }
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     });

            this.setTime(new CronTime(new Date(my_date.get_start_of_next_month_in_georgian())));
            this.start();
        },
        function(){
        },
        true,
        'Asia/Tehran'
    );
    clearClimaRainTotalsMonthsCacheJob.start();
}