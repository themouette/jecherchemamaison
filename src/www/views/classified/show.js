define([
    'jquery',
    'templates/classified/show/show',
    'templates/classified/show/layout',
    'templates/classified/show/messages',
    'templates/classified/show/credit',
    'fossil/utils',
    'fossil/views/regionManager',
    'fossil/views/collection',
    'fossil/views/model',
    'fossil/views/view',
    'services/financial',
    'templates/classified/_images6',
    'async!https://maps.googleapis.com/maps/api/js?sensor=false'
], function ($, tpl, layoutTpl, messagesTpl, creditTpl, utils, RegionManager, CollectionView, ModelView, View, Financial) {

    var Show = ModelView.extend({
        template: tpl,

        events: {
            'click .classified-delete': 'deleteClassified',
            'click .classified-main-image': 'showClearing'
        },
        initialize: function () {
            this
                .on('on:plugins:attach', function () {
                    this.$el.foundation();
                })
                .on('on:plugins:detach', function () {
                });
        },

        showClearing: function (e) {
            e.preventDefault();
            this.$('.classified-thumbnails a:first-of-type').trigger('click');
        },

        deleteClassified: function (e) {
            var v = this;
            e.preventDefault();
            if (!confirm("etes vous sur ?")) {
                return ;
            }
            this.model
                .destroy()
                .done(function () {
                    v.$el.prepend('<p class="alert info">Supprimé</p>');
                    var r = new Backbone.Router();
                    r.navigate('#classifieds', {trigger: true, replace: true});
                })
                .fail(function (err) {
                    alert(err);
                });
        },

        attachPlugins: function () {
            var el = this.$('.classified-map')[0];
            var d = new $.Deferred();
            d.then(function (result) {
                var mapOptions = {
                    center: result.geometry.location,
                    zoom: locationTypeToZoom (result.types)
                };
                var map = new google.maps.Map(el, mapOptions);
                var marker = new google.maps.Marker({
                    map: map,
                    position: result.geometry.location
                });
            }, function (status) {
                alert("Geocode was not successful for the following reason: " + status);
            });

            var address = this.model.get('address') || 'Clermont Ferrand';
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(45.77, 3.12);
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length) {
                    d.resolve(results[0]);
                } else {
                    d.reject(status);
                }
            });

            function locationTypeToZoom (types) {
                var ifType = ifTypeMatch(types);
                return ifType('street_address', 16) ||
                    ifType('locality', 14) ||
                    ifType('postal_code', 14) ||
                    ifType('neighborhood', 15) ||
                    ifType('route', 16) ||
                    ifType('intersection', 16) ||
                    ifType('political', 9) ||
                    ifType('country', 9) ||
                    ifType('administrative_area_level_1', 10) ||
                    ifType('administrative_area_level_2', 10) ||
                    ifType('administrative_area_level_3', 10) ||
                    ifType('colloquial_area', 10) ||
                    ifType('sublocality', 14) ||
                    ifType('sublocality_level_5', 14) ||
                    ifType('premise', 10) ||
                    ifType('subpremise', 10) ||
                    ifType('natural_feature', 10) ||
                    ifType('park', 10) || 12;
            }
            function ifTypeMatch(types) {
                return function ifType(expected, zoom) {
                    return types.indexOf(expected) !== -1 && zoom;
                };
            }
        }
    });

    var Messages = CollectionView.extend({
        // see bug #6 https://github.com/themouette/fossil-view/issues/6
        //selector: 'ul',
        ItemView: ModelView.extend({
            tagName: 'li',
            template: '{{linkTo title "classified/" classified_id "/messages/" _id}}'
        }),
        template: messagesTpl
    });

    var CreditLine = View.extend({
        template: creditTpl,
        initialize: function (options) {
            utils.copyOption(['rates', 'capabilities'], this, options);
            this.price = this.model.get('price');
        },
        events: {
            'change input[name=proposal]': function (e) {
                this.price = parseInt(e.target.value);
                this.render();
                this.$('input[name=proposal]').focus();
            },
            'click .proposal-reset': function (e) {
                e.preventDefault();
                this.price = this.model.get('price');
                this.render();
                this.$('input[name=proposal]').focus();
            }
        },
        getViewData: function () {
            var classified = this.model;
            var notaire = Financial.notaire(this.price);
            var borrowed = parseInt(this.price) + parseInt(notaire, 10) - this.capabilities.get('capital');
            borrowed = Math.max(borrowed, 0);
            var scenarios = this.rates.toJSON().map(function (rate) {
                var totalRate = +rate.rate + rate.insurance;
                var monthly = Financial.monthly(borrowed, rate.nbYears, totalRate);
                var foncier = parseFloat(classified.get('taxe_foncier')) || 0;
                var total = monthly + (foncier / 12) + parseFloat(classified.get('charges') || 0, 10);
                return {
                    nbYears: rate.nbYears,
                    rate: totalRate,
                    monthly: Financial.monthly(borrowed, rate.nbYears, totalRate),
                    total: total
                };
            });

            var difference = this.price - classified.get('price');
            var differenceRate = difference/classified.get('price');

            return {
                notaire: notaire,
                difference: difference,
                differenceRate: differenceRate,
                price: this.price,
                borrowed: borrowed,
                scenarios: scenarios,
                rateClass: (differenceRate >= -0.1 && 'success') || (differenceRate >= -0.15 && 'secondary') || 'alert'
            };
        }
    });

    var Layout = RegionManager.extend({
        recycle: false,
        template: layoutTpl,
        regions: {
            'classified': '.classified',
            'messages': '.messages',
            'credit-line': '.credit-line'
        },
        initialize: function (options) {
            utils.copyOption(['messages', 'classified', 'rates'], this, options);
            if (!this.messages) {
              throw new Error('You must provide a messages collection to show layout');
            }
            if (!this.classified) {
              throw new Error('You must provide a classified model to show layout');
            }
            if (!this.rates) {
                this.rates = new Backbone.Collection([
                    {nbYears: 10, rate: 1.25/100, insurance: 0},
                    {nbYears: 10, rate: 2.91/100, insurance: 0.18/100},
                    {nbYears: 15, rate: 3.26/100, insurance: 0.4/100},
                    {nbYears: 20, rate: 3.50/100, insurance: 0.4/100}
                ]);
            }
            var classifiedView = new Show({
                model: this.classified
            });
            var messagesView = new Messages({
                collection: this.messages
            });
            var creditView = new CreditLine({
                model: this.classified,
                rates: this.rates ,
                capabilities: new Backbone.Model({
                    capital: 65000
                })
            });
            this.registerView(classifiedView, "classified");
            this.registerView(messagesView, "messages");
            this.registerView(creditView, "credit-line");
        }
    });

    return Layout;
});
