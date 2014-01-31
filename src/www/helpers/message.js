define(['services/viewHandler'], function (template) {
    template.helper('message', function (message, options) {
        return template.safe('<p>Message: '+message+'</p>');
    });
});
