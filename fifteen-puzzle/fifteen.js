$(document).ready(function() {
    var rowColNumber = 4;
    var tileHeight = 100;
    var blankTileRow = 4;
    var blankTileCol = 4;
    var reverse = [];
    var forward = [];
    var timer;
    var hour;
    var minute;
    var sec;

    createTiles();

    $("#refresh").click(function () {
        hour = minute = sec = undefined;
        $("#puzzlearea").html("");
        createTiles();
        resetTimer();
    });

    $("#reverse").click(function () {
        var tile = reverse.pop();
        if (tile !== undefined) {
            forward.push(tile);
            moveTiles(tile);
        }
    });

    $("#forward").click(function () {
        var tile = forward.pop();
        if (tile !== undefined) {
            reverse.push(tile);
            moveTiles(tile);
        }
    });

    $("#shufflebutton").click(function () {
        reverse = [];
        forward = [];
        createTimer();
        for (var i = 0; i < 1000; i++) {
            var neighbors = [];
            for (var j = -1; j <= 1; j++) {
                for (var k = -1; k <= 1; k++) {
                    var tile = $("#square_" + (blankTileRow + j) + "_" + (blankTileCol + k)).get(0);
                    if (tile !== undefined && isNeighborBlankTile(tile)) {
                        neighbors.push(tile);
                    }
                }
            }
            var tileShuffle = neighbors[parseInt(Math.random() * neighbors.length)];
            reverse.push(tileShuffle);
            moveTiles(tileShuffle);
        }
        setTimeout(checkSolvedState, 250);
    });

    $("#puzzle-size").change(function () {
        $("#output").html("");
        rowColNumber = parseInt($(this).val());
        tileHeight = parseInt(400 / rowColNumber);
        blankTileRow = blankTileCol = rowColNumber;
        $("#puzzlearea").html("");
        createTiles();
    });

    function createTimer() {
        resetTimer();
        var second = 0;
        timer = setInterval(function () {
            second++;
            minute = parseInt(second / 60);
            hour = parseInt(second / 3600);
            sec = parseInt(second % 60);
            if (minute < 10) minute = "0" + minute;
            if (hour < 10) hour = "0" + hour;
            if (sec < 10) sec = "0" + sec;
            var output = hour + ":" + minute + ":" + sec;

            $("#timer-count").html("Timer: " + output);

            if (isSolved()) resetTimer();
        }, 1000);
    }

    function createTiles() {
        resetTimer();
        blankTileRow = blankTileCol = parseInt($("#puzzle-size").val());
        var k = 1;
        for (var i = 0; i < rowColNumber; i++) {
            for (var j = 0; j < rowColNumber; j++) {
                if (k != Math.pow(rowColNumber, 2)) {
                    var $tile = $("<div/>", {
                        html: k,
                        "class": "tile",
                        id: "square_" + (i + 1) + "_" + (j + 1)
                    });
                    $tile.css({
                        "background-position": -tileHeight * j + "px -" + tileHeight * i + "px",
                        "top": tileHeight * i,
                        "left": tileHeight * j,
                        "height": tileHeight - 10,
                        "width": tileHeight - 10,
                        "line-height": tileHeight + "px",
                        "font-size": (40 - 7 * (rowColNumber - 4)) + "pt"
                    });
                    $tile.on({
                        "click": clickTiles,
                        "mouseover": highlightTiles
                    });
                    $("#puzzlearea").append($tile);
                }
                k++;
            }
        }
    }

    function clickTiles() {
        if ($(this).hasClass('movable')) {
            moveTiles(this);
            reverse.push(this);
            setTimeout(checkSolvedState, 250);
        }
        $(".tile").removeClass("movable");
    }

    function checkSolvedState() {
        if (isSolved()) {
            resetTimer();
            if (hour == undefined && minute == undefined && sec == undefined) {
                alert("Great! You solved the puzzle, but it would be more challenging if you shuffle" +
                    " it!!");
            } else {
                alert("You solved the puzzle in " + hour + " hours, " + minute + " minutes, " +
                    sec + " seconds");
            }
        }
    }

    function highlightTiles() {
        if (isNeighborBlankTile(this)) {
            $(this).addClass("movable");
        }
    }

    function moveTiles(tile) {
        $(tile).css({
            top: (blankTileRow - 1) * tileHeight,
            left: (blankTileCol - 1) * tileHeight
        });
        var newRow = blankTileRow;
        var newCol = blankTileCol;
        blankTileRow = parseInt(tile.id.split('_')[1]);
        blankTileCol = parseInt(tile.id.split('_')[2]);
        $(tile).attr("id", "square_" + newRow + "_" + newCol);
        $(tile).removeClass("movable");
    }

    function isNeighborBlankTile(tile) {
        var row = tile.id.split('_')[1];
        var col = tile.id.split('_')[2];
        return ((Math.abs(row - blankTileRow) == 0 && Math.abs(col - blankTileCol) == 1) ||
        (Math.abs(row - blankTileRow) == 1) && Math.abs(col - blankTileCol) == 0);
    }

    function isSolved() {
        var check = true;
        $(".tile").each(function () {
            var num = parseInt($(this).html());
            var x = parseInt($(this).css("left"));
            var y = parseInt($(this).css("top"));
            if ((num - 1) % rowColNumber * tileHeight != x ||
                (parseInt((num - 1) / rowColNumber)) * tileHeight != y) {
                check = false;
                return false;
            }
        });
        return check;
    }

    function resetTimer() {
        clearInterval(timer);
        timer = null;
        $("#timer-count").html("Timer: 00:00:00");

    }
});