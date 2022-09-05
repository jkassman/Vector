// I kinda doubt this is going to just work...but let's try'
function fixup_element(element, width_percent, height_percent='100%'){
    //get DPI
    let dpi = window.devicePixelRatio;

    //console.log(element + "," + width_percent + "," + height_percent)

    /* Set style to percent based */
    element.style.width = width_percent
    element.style.height = height_percent

    /* Calculate raw pixels based on style and percent */

    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(element).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(element).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    element.setAttribute('height', Math.floor(style_height * dpi));
    element.setAttribute('width', Math.floor(style_width * dpi));
}

class OptionBlockHandler {
    constructor(
        main_div, options_div, options_shown, height_percent='100%',
        canvii=null, onresize=null
     ){
        this.main_div = main_div
        this.options_div = options_div
        this.options_shown = options_shown
        this.height_percent = height_percent
        this.onresize = onresize
        console.log(canvii)
        if (canvii === null){
            this.canvii = []
        } else {
            this.canvii = canvii
        }

        var self = this
        window.addEventListener('resize', this.resize.bind(self), false);
        window.addEventListener('orientationchange', this.resize.bind(self), false);
        this.resize()
    }

    toggle(){
        this.options_shown = !this.options_shown
        console.log(this.options_shown )
        this.resize()
    }

    resize() {
        if (this.options_shown) {
            this.options_div.style.display = "inline";
            fixup_element(this.main_div, '70%', this.height_percent);
            fixup_element(this.options_div, '30%', this.height_percent);
        } else {
            this.options_div.style.display = "none";
            fixup_element(this.main_div, '100%', this.height_percent);
            fixup_element(this.options_div, '0%', this.height_percent);
        }
        for (var i = 0; i < this.canvii.length; i++){
            fixup_element(this.canvii[i], "100%")
        }
        if (this.onresize){
            this.onresize()
        }
        console.log("Resized Everything")
    }
}
