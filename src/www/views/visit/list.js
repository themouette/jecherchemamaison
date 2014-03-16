define([
    'templates/visit/list',
    'templates/visit/listItem',
    'fossil/views/model',
    'fossil/views/collection'
], function (tpl, itemTpl, ModelView, CollectionView) {

    var ItemView = ModelView.extend({
        tagName: 'li',
        template: itemTpl
    });

    var List = CollectionView.extend({
        selector: 'ul.visit-list',
        template: tpl,
        ItemView: ItemView
    });


    return List;
});
