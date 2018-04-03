'use strict';

(function paintTable() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
        var tr = document.createElement("tr");
        fragment.appendChild(tr);
        for (var j = 0; j < 4; j++) {
            var td = document.createElement("td");
            td.setAttribute("id", "c_" + i + "_" + j);
            td.setAttribute("class", "cellSpecks");
            fragment.lastChild.appendChild(td);
        }
    }

    tableSpecks.appendChild(fragment);
}
)();

function Specks() {
    var counter = 0;

    function numRandomCells() {

        var arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, ""]];
        var x, y;
        x = y = 3;

        for (var k = 0; k < 1000; k++) {
            var rand = Math.round(Math.random() * 3);
            /* 0 -- up the table,
        * 1 -- right,
        * 2 -- down,
        * 3 -- left */
            (function randomWalk(num) {
                switch (num) {
                case 0:
                    if (x != 0) {
                        var x1 = arr[x - 1][y];
                        arr[x - 1].splice(y, 1, "");
                        arr[x].splice(y, 1, x1);
                        x--;
                        break;
                    }
                case 1:
                    if (y != 3) {
                        var y1 = arr[x][y + 1];
                        arr[x].splice(y + 1, 1, "");
                        arr[x].splice(y, 1, y1);
                        y++;
                        break;
                    }
                case 2:
                    if (x != 3) {
                        var x1 = arr[x + 1][y];
                        arr[x + 1].splice(y, 1, "");
                        arr[x].splice(y, 1, x1);
                        x++;
                        break;
                    }
                case 3:
                    if (y != 0) {
                        var y1 = arr[x][y - 1];
                        arr[x].splice(y - 1, 1, "");
                        arr[x].splice(y, 1, y1);
                        y--;
                        break;
                    } else
                        randomWalk(0);
                }
            }
            )(rand);
        }
        ;
        var newArr = [].concat(...arr);
        var tdList = tableSpecks.querySelectorAll("td");

        for (let i = 0; i < 16; i++) {
            tdList[i].appendChild(document.createTextNode(newArr[i]));
            if (newArr[i] == "")
                tdList[i].style.backgroundColor = "#FFDAB9";
            tdList[i].addEventListener("click", replaceTwoCells);
        }

    }


    function clearCells() {
        counter = 0;
        counterID.innerHTML = 0;
        var tdList = tableSpecks.querySelectorAll("td");
        for (let i = 0; i < 16; i++) {
            tdList[i].style.backgroundColor = "#FAFAD2";
            if (tdList[i].lastChild != null) {
                tdList[i].removeChild(tdList[i].lastChild);
            }
        }
    }

    function replaceTwoCells(e) {

        var e = e.target || e.srcElement;
        var x = e.getAttribute("id").split("_")[1];
        var y = e.getAttribute("id").split("_")[2];
        var emptyCell;
        var tdList = table.querySelectorAll("td");
        for (let i = 0; i < 16; i++) {
            if (tdList[i].textContent == "") {
                emptyCell = tdList[i];
            }
        }
        var xec = emptyCell.getAttribute("id").split("_")[1];
        var yec = emptyCell.getAttribute("id").split("_")[2];
        if ((+xec - +x == 0) || (+yec - +y == 0)) {
            switch ((+xec) - (+x)) {
            case -1:
                var text = e.textContent;
                e.innerHTML = "";
                e.style.backgroundColor = "#FFDAB9";
                emptyCell.innerHTML = text;
                emptyCell.style.backgroundColor = "#FAFAD2";
                counter++;
                counterID.innerHTML = counter;
                break;
            case 1:
                var text = e.textContent;
                e.innerHTML = "";
                e.style.backgroundColor = "#FFDAB9";
                emptyCell.innerHTML = text;
                emptyCell.style.backgroundColor = "#FAFAD2";
                counter++;
                counterID.innerHTML = counter;
                break;
            case 0:
                switch ((+yec) - (+y)) {
                case 1:
                    var text = e.textContent;
                    e.innerHTML = "";
                    e.style.backgroundColor = "#FFDAB9";
                    emptyCell.innerHTML = text;
                    emptyCell.style.backgroundColor = "#FAFAD2";
                    counter++;
                    counterID.innerHTML = counter;
                    break;
                case -1:
                    var text = e.textContent;
                    e.innerHTML = "";
                    e.style.backgroundColor = "#FFDAB9";
                    emptyCell.innerHTML = text;
                    emptyCell.style.backgroundColor = "#FAFAD2";
                    counter++;
                    counterID.innerHTML = counter;
                    break;
                }
            }
        }

        var arrTdList = [];
        var arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ""];
        for (let i = 0; i < 16; i++) {
            arrTdList.push(tdList[i].textContent);
        }
        if (JSON.stringify(arrTdList) == JSON.stringify(arr)) endGame();
    }

    (function score() {
        var trScore = tScore.querySelectorAll("tr");
        var arrScore = [];
        for (let i = 0; i < trScore.length; i++) {
            trScore[i].firstChild.setAttribute("class", "numScore");
            trScore[i].children[1].setAttribute("class", "nameScore");
            trScore[i].children[2].setAttribute("class", "nameScore");
        }
        for (let i = 0; i < localStorage.length; i++) {
            var playerScore = [];
            var keyScore = localStorage.key(i);
            var valueScore = localStorage.getItem(keyScore);
            playerScore.push(keyScore);
            playerScore.push(valueScore);
            arrScore.push(playerScore);
        }
        arrScore.sort(function(a, b) {
            return parseInt(a[1]) - parseInt(b[1]);
        });
        if (arrScore.length > 10) {
            localStorage.removeItem(arrScore[10][0]);
            arrScore.pop();
        }
        for (let i = 0; i < localStorage.length; i++) {
            trScore[i].children[1].innerHTML = arrScore[i][0];
            trScore[i].children[2].innerHTML = arrScore[i][1];
        }
    })()


    function endGame() {
        localStorage.setItem(inputName.value, counter);
        var tdList = table.querySelectorAll("td");
        for (let i = 0; i < 16; i++) {
            tdList[i].removeEventListener("click", replaceTwoCells);
        }
        win.style.display = "block";
    }
    

    this.newGame = function() {
        win.style.display = "none";
        clearCells();
        numRandomCells();
    }
}

var specks = new Specks();

specks.newGame();

newGameButton.addEventListener("click", specks.newGame);

