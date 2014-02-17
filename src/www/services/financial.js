define(function () {
    return {
        monthly: function (capital, nbYears, rate) {
            var paymentPerYear = 12;

            // this is a limit
            if (!rate) {return capital / nbYears / paymentPerYear ;}
            var totalPayment = nbYears*paymentPerYear;
            var ratePerPayment = rate/paymentPerYear;

            var monthly = capital * (ratePerPayment) / (1 - Math.pow(1 + ratePerPayment, -totalPayment));
            return Math.round(monthly*100)/100;
        },
        notaire: function (amount) {
            // average amount of 7.5%
            // http://www.pap.fr/argent/calculettes/frais-de-notaire
            return amount * 0.075;
        }
    };
});
