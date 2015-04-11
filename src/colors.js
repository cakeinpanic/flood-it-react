var ColorScheme = (function() {
    var scheme        = [["#57385C", "#A75265", "#EC7263", "#FEBE7E","#FFEDBC"],
        ["#F72F41", "#399DF6", "#99C946", "#FBDB52", "#635358"],
        ["#FF8787", "#FFBD8C", "#FFE2CC", "#938787", "#72D4FF"],
        ["#435A66", "#88A6AF", "#F5F2EB", "#D9CDB8", "#413541"],
    ];
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return function ColorScheme() {
        this.currentSchemeId = 0;
        this.getCurrentScheme = function(){
            return currentScheme = scheme[this.currentSchemeId];
        };
        this.getRandomColor = function() {
            var currentScheme = this.getCurrentScheme();

            return currentScheme[getRandomInt(0,currentScheme.length-1)];
        }

    }
})();
