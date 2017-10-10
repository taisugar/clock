// Require
const request = require('request');

// Request
request('https://timezoneapi.io/api/timezone/?America/Los_Angeles', function(err, res, dat) {

    // Parse
    var data = JSON.parse(dat);

    // Request OK?
    if (data.meta.code == '200') {

        // Log
        console.log(data);

        // Example: Get location
        var location = data.data.timezone.location;

        // Example: Get the users time
        var time = data.data.datetime.date_time_txt;

    }

});