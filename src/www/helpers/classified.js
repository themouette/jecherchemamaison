define(['services/viewHandler', 'handlebars'], function (template, Handlebars) {

    var linkToClassified;
    template.helper('linkToClassified', function (classified, options) {

        if (!linkToClassified) {
            linkToClassified = Handlebars.compile(
                    '<a href="{{url "classifieds/" _id}}">{{@content}}</a>'
                );
        }

        var data = Handlebars.createFrame(options.data);
        data.content = options.fn ? options.fn(classified, {data: data}) : 'Aller à l\'annonce';

        var link = linkToClassified(classified, {
            data: data,
            helpers: template.getHelpers(options.data.module, options.data.view)
        });
        return template.safe(link);
    });
    template.helper('urlToClassified', function (classified, options) {

        var classifiedUrl = Handlebars.compile(
                '{{url "classifieds/" _id}}'
        );

        var data = Handlebars.createFrame(options.data);
        data.content = options.fn ? options.fn(classified, {data: data}) : 'Aller à l\'annonce';

        var url = classifiedUrl(classified, {
            data: data,
            helpers: template.getHelpers(options.data.module, options.data.view)
        });
        return template.safe(url);
    });
});
