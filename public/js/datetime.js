var lsClock = [];
var bigClock = new BigClock();
main();

function main() {

    var dt = new MyDateTime('row', getCity('timezone'), +7);
    dt.init();
    dt.run();
    if (lsClock.length <= 0) {
        dt.isSelected = true;
    }
    lsClock.push(dt);

    document.getElementById('Add').addEventListener('click', function(event) {
        var e = document.getElementById('utc');
        var timezone = e.options[e.selectedIndex].value;
        var id = 'time' + timezone;
        var dt = new MyDateTime('row', getCity(timezone), timezone);
        dt.init();
        dt.run();
        if (lsClock.length <= 0) {
            dt.isSelected = true;
        }
        lsClock.push(dt);
    });

    bigClock.spTime.addEventListener('click', function() {
        for (var i = 0; i < lsClock.length; i++) {
            if (lsClock[i].isSelected) {
                lsClock[i].pause();
            }
        }
    });
}

function getCity(timezone) {
    return 'none';
}

function MyDateTime(parentID, city, timezone) {
    const arrayDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Staturday"];
    const arrayMonth = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.bigClock;
    this.parentID = parentID;
    this.nd;
    this.day;
    this.date;
    this.month;
    this.year;
    this.hours;
    this.min;
    this.sec;
    this.utc;
    this.city = city;
    this.timezone = timezone;
    this.isPause = false;
    this.nBox;
    this.pCity;
    this.nTime;
    this.btnRemove;
    this.isSelected = false;
    this.loop;
    var self = this;

    this.init = function() {
        this.nBox = document.createElement('a');
        this.pCity = document.createElement('p');
        this.nTime = document.createElement('p');
        this.btnRemove = document.createElement('button');
        this.nBox.setAttribute('class', 'box');

        this.nTime.setAttribute('class', 'time');
        this.btnRemove.setAttribute('class', 'remove');
        this.btnRemove.innerHTML = 'x';

        this.nBox.appendChild(this.pCity);
        this.nBox.appendChild(this.nTime);
        this.nBox.appendChild(this.btnRemove);
        document.getElementById(this.parentID).appendChild(this.nBox);

        this.nBox.addEventListener('click', function() {
            for (var i = 0; i < lsClock.length; i++) {
                if (lsClock[i].isSelected) {
                    lsClock[i].isSelected = false;
                }
            }
            self.isSelected = true;
        });

        this.btnRemove.addEventListener('click', function() {
            clearInterval(self.loop);
            document.getElementById(self.parentID).removeChild(self.nBox);
            if (lsClock.length > 0 && self.isSelected == true) {
                lsClock[0].isSelected = true;
            }
        });
    }

    this.getCurrentTimeString = function() {
        self.update();
        return this.hours + ":" + this.min + ":" + this.sec;
    }

    this.getCurrentDateString = function() {
        self.update();
        return arrayDay[this.day] + ", " + arrayMonth[this.month] + " " + this.date + ", " + this.year;
    }

    this.update = function() {
        this.nd = new Date();
        this.utc = this.nd.getTime() + (this.nd.getTimezoneOffset() * 60000);
        this.nd.setTime(this.utc + (3600000 * this.timezone));
        this.day = this.nd.getDay();
        this.month = this.nd.getMonth();
        this.date = this.nd.getDate();
        this.year = this.nd.getFullYear();
        this.min = (this.nd.getMinutes() < 10 ? "0" : "") + this.nd.getMinutes();
        this.sec = (this.nd.getSeconds() < 10 ? "0" : "") + this.nd.getSeconds();
        this.hours = (this.nd.getHours() < 10 ? "0" : "") + this.nd.getHours();
    }

    this.render = function() {
        if (!this.isPause) {
            if (this.isSelected) {
                bigClock.h1City.innerHTML = 'Time in ' + this.city + ' now';
                bigClock.spDate.innerHTML = this.getCurrentDateString();
                bigClock.spTime.innerHTML = this.getCurrentTimeString();
            }
            this.pCity.innerHTML = this.city;
            this.nTime.innerHTML = this.getCurrentTimeString();
        }
    }

    this.run = function() {
        this.loop = setInterval(function() {
            self.update();
            self.render();
        }, 1000);
    }

    this.pause = function() {
        this.isPause = !this.isPause;
    }
}

function BigClock() {
    this.h1City = document.getElementById('h1City');
    this.spTime = document.getElementById('spTime');
    this.spDate = document.getElementById('spDate');
}