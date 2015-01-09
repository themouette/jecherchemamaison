define([
    'module',
    'fossil/module',
    'fossil/views/view',

    'views/classified/home',
    'views/classified/create',
    'views/classified/show',
    'models/classified',
    'collections/classified',
    'collections/message',

    'views/home',
    'collections/visit',

    'fossil/viewStore',

    // Don't care about return value.
    'helpers/message',
    'helpers/classified',
    'helpers/collection',
    'helpers/utils',
    'helpers/routing'
], function (module, Module, View,
        ClassifiedHomeView, ClassifiedCreateView, ClassifiedShowView, Classified, ClassifiedCollection, MessageCollection,
        HomeView, VisitCollection,
        ViewStore) {
    "use strict";
    var view;

    var Application = Module.extend({
        routes: {
            //'': 'index',
            '': 'classifiedList',
            'classifieds': 'classifiedList',
            'classifieds/:id': 'classifiedShow',
            'classifieds/new': 'classifiedCreate',
            'classifieds/:id/edit': 'classifiedEdit',
            'compose': 'compose',
            'mail/:id': 'mailShow'
        },

        startListener: function () {
            this.classifieds = new ClassifiedCollection();
            this.visits = new VisitCollection();
            var store = this.store = new ViewStore();
            this.store.decorateModule(this);

            store.set('dashboard', function (visits) {
                return new HomeView({
                    visits: visits
                });
            });
            store.set('classifiedHome', function (collection) {
                return new ClassifiedHomeView({
                    collection: collection
                });
            });
            store.set('classifiedShow', function (classified, messages) {
                return new ClassifiedShowView({
                    classified: classified,
                    messages: messages
                });
            });
            store.set('classifiedCreate', function (classified) {
                return new ClassifiedCreateView({
                    model: classified
                });
            });
            store.set('loading', function () {
                return 'Loading...';
            });
            store.set('error', function (err) {
                return 'An error occured';
            });
        },
        standbyListener: function () {
            this.store.undecorateModule(this);
            this.store.clean();
            this.store = null;
        },



        events: {
            "foo:bar": function () {
                console.log('foo:bar triggered.');
            },
            'start': 'startListener',
            'stanby': 'standbyListener'
        },

        index: function () {
            this
                .useView('loading')
                .waitForFetch(this.visits, {reset: true})
                .thenUseView('dashboard', 'error');
        },


        classifiedList: function () {
            this
                .useView('loading')
                .waitForFetch(this.classifieds, {reset: true})
                .thenUseView('classifiedHome', 'error');
        },

        classifiedShow: function (id) {
            var classified = this.classifieds.get(id) || new Classified({id: id});
            var messages = new MessageCollection({classified: classified});

            this
                .useView('loading')
                .waitForFetch(classified)
                .waitForFetch(messages)
                .thenUseView('classifiedShow', 'error');
        },

        classifiedCreate: function () {
            this
                .thenUseView('classifiedCreate', 'error');
        },

        classifiedEdit: function (id) {
            var classified = this.classifieds.get(id) || new Classified({id: id});

            this
                .useView('loading')
                .waitForFetch(classified)
                .thenUseView('classifiedCreate', 'error');
        },

        compose: function () {
            this.useView('{{#linkToEvent "foo:bar" foo="bar"}}I do foo{{/linkToEvent}}<br />Annonce 12');
        },

        mailShow: function () {
        }

    });

    return Application;
});
