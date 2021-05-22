module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    function printTime() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        hour = updateTime(hour) + 7;
        min = updateTime(min);
        sec = updateTime(sec);
        if (hour < 12) {
            tday = "AM";
        }
        else {
            tday = "PM"
            if (hour != 12) {
            hour -= 12
            }
        }

        var clock = hour + " : " + min + " : " + sec + " " + tday

        function updateTime(time) {
        if (time < 10) {
            return "0" + time;
        }
        else {
            return time;
        }
        }
        return clock;
    }
 
    const responseMessage = "Hello! The current date is: " + printTime()

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
