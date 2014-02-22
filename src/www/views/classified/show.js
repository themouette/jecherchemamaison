define([
    'jquery',
    'templates/classified/show',
    'fossil/utils',
    'fossil/views/regionManager',
    'fossil/views/collection',
    'fossil/views/model',
    'fossil/views/view',
    'services/financial',
    'templates/classified/_images6',
    'async!https://maps.googleapis.com/maps/api/js?sensor=false'
], function ($, tpl, utils, RegionMagager, CollectionView, ModelView, View, Financial) {

    var Show = ModelView.extend({
        template: tpl,

        events: {
            'click .classified-delete': 'deleteClassified'
        },
        initialize: function () {
            this
                .on('on:plugins:attach', function () {
                    this.$el.foundation();
                })
                .on('on:plugins:detach', function () {
                });
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
        template: '<h3>messages</h3><ul></ul>'
    });

    var CreditLine = View.extend({
        template: [
            '<h3>credit line</h3>',
            '<div class="small-3 columns">Simuler une proposition à </div>',
            '<div class="small-9 columns">',
                '<input type="number" name="proposal" value="{{price}}" style="display:inline-block; width: 30%; text-align:right;" /> €',
                ' <a href="#" class="button secondary tiny proposal-reset">reset</a>',
                '{{#if difference}}',
                '<span class="{{rateClass}} radius label">Baisse: <strong>{{currency difference}} ({{percent differenceRate}})</strong></span>',
                '{{/if}}',
            '</div>',
            '<p>Total emprunté: {{currency borrowed}} (dont notaire ~ {{currency notaire}})</p>',
            '<table style="width: 100%;">',
            '<thead><tr>',
                '<th>Durée</th>',
                '<th>Taux global</th>',
                '<th>Mensualités</th>',
                '<th>Charges et taxes comprises</th>',
            '</tr></thead>',
            '{{#each scenarios}}',
                '<tr>',
                    '<th>{{nbYears}} ans</th>',
                    '<th>{{percent rate}}</th>',
                    '<td>{{currency monthly}}</td>',
                    '<td><strong>{{currency total}}</strong></td>',
                '</tr>',
            '{{/each}}',
            '</table>'
        ].join('\n'),
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

    var Layout = RegionMagager.extend({
        recycle: false,
        template: [
            '<div class="classified row"></div>',
            '<div class="messages row">Here comes messages</div>',
            '<div class="credit-line row"></div>'
            ].join(''),
        regions: {
            'classified': '.classified',
            'messages': '.messages',
            'credit-line': '.credit-line'
        },
        initialize: function (options) {
            utils.copyOption(['messages', 'classified'], this, options);
            var classifiedView = new Show({
                model: this.classified
            });
            var messagesView = new Messages({
                collection: this.messages
            });
            var creditView = new CreditLine({
                model: this.classified,
                rates: new Backbone.Collection([
                    {nbYears: 10, rate: 1.25/100, insurance: 0},
                    {nbYears: 10, rate: 2.91/100, insurance: 0.18/100},
                    {nbYears: 15, rate: 3.26/100, insurance: 0.4/100}
                ]),
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
