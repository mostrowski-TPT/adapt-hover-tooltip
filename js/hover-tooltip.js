define([
    "core/js/adapt",
    "core/js/views/componentView"
], function(Adapt, ComponentView) {

    var hover_tooltip = ComponentView.extend({
        postRender: function() {
            this.setPopups();
            this.setReadyStatus();          
        },
        displayTooltip: function(event){
            $(event.target).addClass('completed').find('.tooltip-popup').show();
            this.checkCompletition();
        },
        hideTooltip: function(event){
            $(event.target).find('.tooltip-popup').hide();
        },
        setPopups: function() {
            let hoverAreas = this.$el.find('.hoverarea');
            let tooltips = this.model.get("tooltips");
            let tooltip = function (popid, mycontent, myclass) {return "<div popid='"+popid+"' class='"+ (myclass?myclass:"")+" tooltip-popup'>"+ (mycontent?mycontent:"") +"</div>"};
            hoverAreas.each(function(i, element){$(element).append(tooltip(tooltips[i].id, tooltips[i].content, tooltips[i].class))});
            $('.tooltip-popup').hide();
            hoverAreas.on('mouseover', this.displayTooltip.bind(this));
            hoverAreas.on("mouseout", this.hideTooltip);
	    },
	    checkCompletition: function() {
            let completeitems = this.$el.find('.completed');
            if (completeitems.length === this.model.get("tooltips").length) {
                this.setCompletionStatus();
            }
        }  
    }, {
        template: "hover-tooltip"
    });

    return Adapt.register("hover_tooltip", hover_tooltip);
});