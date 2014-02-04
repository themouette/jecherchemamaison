define([
    'templates/classified/create',
    'underscore',
    'jquery',
    'fossil/views/model',
    'models/classified',
    'backbone.stickit',
    'templates/classified/_form',
    'templates/classified/_form_identity',
    'templates/classified/_form_parameters',
    'templates/classified/_form_costs',
    'templates/classified/_images'
], function (tpl, _, $, View, Classified) {

    var Create = View.extend({

        selectors: {
            'linkField': '[name=lien]'
        },

        bindings: {
            '[name=lien]': 'link',
            '[name=titre]': 'name',
            '[name=adresse]': 'address',
            '[name=description]': 'content',
            '[name=prix]': 'price',
            '[name=surface]': 'surface',
            '[name=etage]': 'etage',
            '[name=charges]': 'charges',
            '[name=taxe_habitation]': 'taxe_habitation',
            '[name=taxe_foncier]': 'taxe_foncier',
            // update link href when input changes
            '.classified-form-link-external': {
                attributes: [{
                        name: 'href',
                        observe: 'link'
                    }]
            }
        },

        events: {
            'submit form': 'onSubmit',
            'click .classified-fetch': 'updateFromUrl'
        },
        template: tpl,

        initialize: function () {
            var v = this;
            if (!this.model) this.createModel();
            this
                .on('on:plugins:attach', function () {
                    v.stickit();
                    v.model.on('change:images', v.refreshImageList, v);
                    this.$el.foundation();
                })
                .on('on:plugins:detach', function () {
                    v.model.off('change:images', v.refreshImageList, v);
                    v.unstick();
                });
        },

        refreshImageList: function () {
            var $ul = this.$('.classified-thumbnails');
            var images = this.model.get('images') || [];
            $ul.empty();
            // insert images
            images.forEach(function (url) {
                var li = $('<li><img src="'+url+'" /></li>');
                $ul.append(li);
            });
        },

        onSubmit: function (e) {
            e.preventDefault();
            if (!this.model) {
                this.createModel();
            }
            var values = this.$(e.target).serializeArray();
            values = _.reduce(values, function (accumulator, val) {
                accumulator[val.name] = val.value;
                return accumulator;
            }, {});
            var isNew = this.model.isNew;

            this.model.set(values)
                .save()
                .done(function () {
                    if (isNew) {
                        var r = new Backbone.Router();
                        r.navigate('#classifieds', {trigger: true, replace: true});
                    }
                })
                .fail(function () {
                    alert('An error occured');
                });
        },

        updateFromUrl: function (e) {
            e.preventDefault();
            var $button = this.$(e.target);
            if ($button.hasClass('disabled')) {
                return;
            }
            var url = this.$(this.selectors.linkField).val();
            if (!url) {
                alert('Vous devez renseigner un lien');
                return ;
            }
            var orig = $button.html();
            var model = this.model || this.createModel();
            $button.html('Chargement').addClass('disabled');
            $.post('/api/classifieds/from-url', {
                    url: url
                }, 'json')
                .done(function (data) {
                    model.set(data);
                })
                .fail(function (err) {
                    alert(err);
                })
                .always(function () {
                    $button.html(orig).removeClass('disabled');
                });

        },

        createModel: function () {
            this.model = new Classified();
            return this.model;
        }
    });

    return Create;
});
