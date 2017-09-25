$(document).ready(function(){

    $('#status-tab').click(function () {
        hideTabs();
        displayTab("status-panel");
        disActivateControl();
        addActive("status-tab")
    });

    $('#order-tab').click(function () {
        hideTabs();
        displayTab("order-panel");
        disActivateControl();
        addActive("order-tab")
    });

    $('#contact-tab').click(function () {
        hideTabs();
        displayTab("contact-panel");
        disActivateControl();
        addActive("contact-tab")
    });

    $('#submit-order').click(function () {
        clearPlaceOrderInfo();

        var kind = $('#kindSelect option:selected').val();
        var amount = $('#count').val();
        if (amount < 1) {
            placeOrderError("Incorrect order amount!");
        } else {
            $.ajax({
                type: "POST",
                url: "/clientOrder",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: '{"kind": "' + kind + '", "count": "' + amount + '"}',
                succes: function (data) {
                    if (data.status === "OK") {
                        // update status
                        placeOrderSucces();
                    } else {
                        placeOrderError(data.errorMessage);
                    }
                }
            });
        }
    })

});

function clearPlaceOrderInfo() {
    var response = $('#client-order-response');
    response.removeClass("bg-success");
    response.removeClass("bg-danger");
    response.html("");

}

function placeOrderError(message) {
    var response = $('#client-order-response');
    response.removeClass("bg-success");
    response.addClass("bg-danger");
    response.html(message);
}

function placeOrderSucces() {
    var response = $('#client-order-response');
    response.addClass("bg-success");
    response.html("Order successfully placed!");
}

function hideTabs() {
    $(".content-panel").each(function (index, element) {
        $(element).addClass("hidden");
    });

}

function displayTab(id) {
    $('#' + id).removeClass("hidden");
}

function disActivateControl() {
    $(".content-tab").each(function (index, element) {
        $(element).removeClass("active");
    });
}

function addActive(id) {
    $('#' + id).parent().addClass("active");

}