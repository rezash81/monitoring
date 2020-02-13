const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/////
var pool = require('../database');
var my_date = require('../utils/my_date');

/////
var moment = require('moment-jalaali')
//moment.loadPersian({usePersianDigits: true});

//var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name , client_infos.nameofmodel FROM clients inner join client_infos on client_infos.id = clients.client_info_id";
var sql_query_rain_stations_names_and_IDs = "SELECT clients.id , client_infos.name   FROM client_infos   join clients on clients.client_info_id = client_infos.id where client_infos.nameofmodel='DLS0201'";

module.exports = {
    getAllRainStationsNamesAndIDs: function () {
        return new Promise(function (resolve, reject) {
            var returnValue = "";
            pool.query(sql_query_rain_stations_names_and_IDs, function (error, rows, fields) {
                if (error) {
                    returnValue = "";
                } else {
                    returnValue = rows;
                }
                resolve(returnValue)
            });
        });
    }
}