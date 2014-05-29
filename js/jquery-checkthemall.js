/* ------------------------------------------------------------------------
    Class: CheckThemAll
    Use: @todo
    Author: Vincent Ballut
    Version: 1.0.0
    Dependency: jQuery 1.9.1
------------------------------------------------------------------------- */

(function ($, doc, win) {
    var name = 'checkthemall';

    function CheckThemAll(container, opts) {
        this.$container = $(container);

        this.defaults = {

            // Class used to identify the master elements
            masterCheckboxClass: 'master-checkbox',

            // Class used to identify slave elements
            slaveCheckboxClass: 'slave-checkbox',

            // Events triggered before & after an element is checked
            onCheckBefore: function(container, element, options) { return; },
            onCheckAfter: function(container, element, options) { return; },

            // Events triggered before & after an element is unchecked
            onUncheckBefore: function(container, element, options) { return; },
            onUncheckAfter: function(container, element, options) { return; },

            // Events triggered before & after a master element is checked
            onMasterCheckBefore: function(container, element, options) { return; },
            onMasterCheckAfter: function(container, element, options) { return; },

            // Events triggered before & after a master element is unchecked
            onMasterUncheckBefore: function(container, element, options) { return; },
            onMasterUncheckAfter: function(container, element, options) { return; },

            // Events triggered before & after a slave element is checked
            onSlaveCheckBefore: function(container, element, options) { return; },
            onSlaveCheckAfter: function(container, element, options) { return; },

            // Events triggered before & after a slave element is unchecked
            onSlaveUncheckBefore: function(container, element, options) { return; },
            onSlaveUncheckAfter: function(container, element, options) { return; }
        };

        this.opts = $.extend(this.defaults, opts);
        this.$container.data(name, this);

        this.$masterElements = null;
        this.$slaveElements = null;

        this.slaveElementsCount = 0;
        this.masterElementsCount = 0;
        this.checkedSlaveElementsCount = 0;
        this.checkedMasterElementsCount = 0;

    };

    CheckThemAll.prototype.init = function () {

        this.setParams();

        this.setMasterElements();
        this.setSlaveElements();

        this.setInitialState();
        this.setEvents();

        return this;
    };

    CheckThemAll.prototype.setParams = function() {

        if(this.$container.attr('data-checkthemall-mastercheckboxclass')) {
            this.opts.masterCheckboxClass = this.$container.attr('data-checkthemall-mastercheckboxclass');
        }

        if(this.$container.attr('data-checkthemall-slavecheckboxclass')) {
            this.opts.slaveCheckboxClass = this.$container.attr('data-checkthemall-slavecheckboxclass');
        }

        return this;
    };

    /**
     * Sets Master Elements
     **/
    CheckThemAll.prototype.setMasterElements = function() {

        var selector = 'input[type="checkbox"].' + this.opts.masterCheckboxClass + ', ' + 'input[type="radio"].' + this.opts.masterCheckboxClass;
        this.$masterElements = this.$container.find(selector);

        if(this.$masterElements.length == 0) {
            console.warn('jQuery CheckThemAll: No Master Element found.', this.$container, this.opts);
        }

        return this;
    }

    /**
     * Sets Slave Elements
     **/
    CheckThemAll.prototype.setSlaveElements = function() {

        var selector = 'input[type="checkbox"].' + this.opts.slaveCheckboxClass + ', ' + 'input[type="radio"].' + this.opts.slaveCheckboxClass;
        this.$slaveElements = this.$container.find(selector);

        if(this.$slaveElements.length == 0) {
            console.warn('jQuery CheckThemAll: No Slave Element found.', this.$container, this.opts);
        }

        return this;
    }

    /**
     * Checks slave elements if master if checked
     **/
    CheckThemAll.prototype.setInitialState = function() {

        var self = this;

        // Setting number of master elements
        self.$masterElements.each(function(i, el) {

            self.masterElementsCount++;

            if($(el).prop('checked') == true) {
                self.checkedMasterElementsCount++;
            }

        });

        // Setting number of slave elements
        self.$slaveElements.each(function(i, el) {

            self.slaveElementsCount++;

            if($(el).prop('checked') == true) {
                self.checkedSlaveElementsCount++;
            }
            
        });

        if( self.checkedSlaveElementsCount > 0 
            && self.checkedSlaveElementsCount < self.slaveElementsCount ) {

            self.uncheckMasterElements();
        }

        if(self.checkedSlaveElementsCount == self.slaveElementsCount ) {
            
            self.checkMasterElements();
            self.uncheckSlaveElements();
        }

        return self;
    }

    /**
     * Checks all slave elements
     **/
    CheckThemAll.prototype.checkSlaveElements = function() {

        var self = this;

        self.$slaveElements.each(function(i, el) {

            if($(el).prop('checked') == false) {

                self.opts.onCheckBefore(self.$container, $(el), self.opts);
                self.opts.onSlaveCheckBefore(self.$container, $(el), self.opts);

                $(el).prop('checked', true);

                self.opts.onCheckAfter(self.$container, $(el), self.opts);
                self.opts.onSlaveCheckAfter(self.$container, $(el), self.opts);
            }       
        });

        this.checkedSlaveElementsCount = this.slaveElemterentsCount;

        return self;

    }

    /**
     * Unchecks all slave elements
     **/
    CheckThemAll.prototype.uncheckSlaveElements = function() {

        var self = this;

        self.$slaveElements.each(function(i, el) {

            if($(el).prop('checked') == true) {

                self.opts.onUncheckBefore(self.$container, $(el), self.opts);
                self.opts.onSlaveUncheckBefore(self.$container, $(el), self.opts);

                $(el).prop('checked', false);

                self.opts.onUncheckAfter(self.$container, $(el), self.opts);
                self.opts.onSlaveUncheckAfter(self.$container, $(el), self.opts);
            }

        });

        this.checkedSlaveElementsCount = 0;

        return self;

    }

    /**
     * Checks all master elements
     **/
    CheckThemAll.prototype.checkMasterElements = function() {

        var self = this;

        self.$masterElements.each(function(i, el) {

            if($(el).prop('checked') == false) {

                self.opts.onCheckBefore(self.$container, $(el), self.opts);
                self.opts.onMasterCheckBefore(self.$container, $(el), self.opts);

                $(el).prop('checked', true);

                self.opts.onCheckAfter(self.$container, $(el), self.opts);
                self.opts.onMasterCheckAfter(self.$container, $(el), self.opts);

            }
        });

        this.checkedMasterElementsCount = this.masterElementsCount;

        return self;

    }

    /**
     * Unchecks all master elements
     **/
    CheckThemAll.prototype.uncheckMasterElements = function() {

        var self = this;

        self.$masterElements.each(function(i, el) {

            if($(el).prop('checked') == true) {

                self.opts.onUncheckBefore(self.$container, $(el), self.opts);
                self.opts.onMasterUncheckBefore(self.$container, $(el), self.opts);

                $(el).prop('checked', false);

                self.opts.onUncheckAfter(self.$container, $(el), self.opts);
                self.opts.onMasterUncheckAfter(self.$container, $(el), self.opts);

            }
        });

        this.checkedMasterElementsCount = 0;

        return self;

    }

    CheckThemAll.prototype.setEvents = function() {

        var self = this;

        // Click event on Master Elements
        self.$masterElements.each(function(i, el) {

            $(el).on('click', function() {

                if( $(this).prop('checked') ) {
                    self.checkedMasterElementsCount++;
                    self.uncheckSlaveElements();

                    self.opts.onMasterCheckBefore(self.$container, $(el), self.opts);
                    self.opts.onMasterCheckAfter(self.$container, $(el), self.opts);
                    self.opts.onCheckBefore(self.$container, $(el), self.opts);
                    self.opts.onCheckAfter(self.$container, $(el), self.opts);
                } else {
                    self.checkedMasterElementsCount--;

                    self.opts.onMasterUncheckBefore(self.$container, $(el), self.opts);
                    self.opts.onMasterUncheckAfter(self.$container, $(el), self.opts);
                    self.opts.onUncheckBefore(self.$container, $(el), self.opts);
                    self.opts.onUncheckAfter(self.$container, $(el), self.opts);
                }

            });

        });

        // Click event on Slave Elements
        self.$slaveElements.each(function(i, el) {

            $(el).on('click', function() {

                if($(this).prop('checked')) {
                    self.checkedSlaveElementsCount++;

                    if(self.checkedSlaveElementsCount == self.slaveElementsCount) {
                        self.checkMasterElements();
                        self.uncheckSlaveElements();
                    } else {
                        self.uncheckMasterElements();

                        self.opts.onSlaveCheckBefore(self.$container, $(el), self.opts);
                        self.opts.onSlaveCheckAfter(self.$container, $(el), self.opts);
                        self.opts.onCheckBefore(self.$container, $(el), self.opts);
                        self.opts.onCheckAfter(self.$container, $(el), self.opts);
                    }
                    
                } else {
                    self.checkedSlaveElementsCount--;

                    self.opts.onSlaveUncheckBefore(self.$container, $(el), self.opts);
                    self.opts.onSlaveUncheckAfter(self.$container, $(el), self.opts);
                    self.opts.onUncheckBefore(self.$container, $(el), self.opts);
                    self.opts.onUncheckAfter(self.$container, $(el), self.opts);
                }

            });

        });

        return self;

    }

    $.fn.checkThemAll = function (opts) {

        $(this).each(function() {
            var checkThemAll = new CheckThemAll(this, opts);
            checkThemAll.init();
        });
        
        return this;
    }

})(jQuery, document, window);