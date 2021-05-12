class ALineChartDecorator extends ALineChart 
{
    constructor(chart)
    {
        super({
            data: chart._data,
            group: chart._group,
            chartWidth: chart._chartWidth,
            chartHeight: chart._chartHeight,
            lineWidth: chart._lineWidth,
            pointRadius: chart._pointRadius,
            pointColor: chart._pointColor,
            lineColor: chart._lineColor
        });
        this._chart = chart;
        
        if (this._constructor === ALineChartDecorator) {
            throw new TypeError('Abstract class "ALineChartDecorator" cannot' + 
                ' be instantiated.');
        }
    }

    UpdateDecorator(chart) { }

    /**
     * @summary     Returns the width of a given piece of text in pixels.
     * @description Uses the canvas measureText function to determine the width
     *              of a particular piece of text given a specific font. 
     * 
     * @param {String} text      The text we want to measure.
     * @param {JSON Object} font The font of the text we want to measure. 
     */
     _GetFontSize(text, font)
     {
         var canvas = document.createElement('canvas');
         var ctx = canvas.getContext('2d');
 
         ctx.font = font.fontSize + 'px ' + font.fontFamily;
         var helper = ctx.measureText(text).width;
         canvas.remove();
 
         return helper;
     }
}