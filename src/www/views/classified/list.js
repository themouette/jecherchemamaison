define([
    'templates/classified/list',
    'templates/classified/listItem',
    'fossil/views/model',
    'fossil/views/collection'
], function (tpl, itemTpl, ModelView, CollectionView) {

    var ItemView = ModelView.extend({
        template: itemTpl
    });

    var List = CollectionView.extend({
        template: tpl,
        ItemView: ItemView
    });


    return List;
});
