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
        this.currentScheme = getCurrentScheme();

        this.getCurrentScheme = getCurrentScheme;
        this.setCurrentScheme = setCurrentScheme;
        this.getRandomColorId = getRandomColorId;
        this.getColorById = getColorById;


        function setCurrentScheme(schemeId){
            this.currentSchemeId = schemeId;
            this.currentScheme = this.getCurrentScheme();
            return this.currentScheme;
        }
        function getCurrentScheme(){
            return scheme[this.currentSchemeId];
        }
        function getRandomColorId() {
            var currentScheme = this.getCurrentScheme();
            return getRandomInt(0,currentScheme.length-1);
        };
        function getColorById(colorId) {
            var currentScheme = this.getCurrentScheme();
            return currentScheme[colorId];
        }

    }
})();
