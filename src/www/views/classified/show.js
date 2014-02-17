define([
    'jquery',
    'templates/classified/show',
    'fossil/utils',
    'fossil/views/regionManager',
    'fossil/views/collection',
    'fossil/views/model',
    'fossil/views/view',
    'services/financial'
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
                '<input type="number" name="proposal" value="{{price}}" style="display:inline-block; width: 30%; text-align:right;" />',
                ' € <a href="#" class="button secondary tiny proposal-reset">reset</a>',
            '</div>',
            '<p>Total emprunté: {{currency borrowed}}</p>',
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
                this.price = e.target.value;
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
            var borrowed = this.price - this.capabilities.get('capital');
            borrowed = Math.max(borrowed, 0);
            var scenarios = this.rates.toJSON().map(function (rate) {
                var totalRate = +rate.rate + rate.insurance;
                var monthly = Financial.monthly(borrowed, rate.nbYears, totalRate);
                var total = monthly + (classified.get('taxe_foncier') / 12) + parseInt(classified.get('charges'), 10);
                return {
                    nbYears: rate.nbYears,
                    rate: totalRate,
                    monthly: Financial.monthly(borrowed, rate.nbYears, totalRate),
                    total: total
                };
            });

            return {
                price: this.price,
                borrowed: borrowed,
                scenarios: scenarios
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
