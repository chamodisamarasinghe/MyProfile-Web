$("#btnAddDetails").click(function () {
    addOrder();
    clearAllOrders();
    loadAllOrders();
});


function loadAllOrders(){
    $("#tblOrder").empty();
    for(var i of orderDB){
        let row= `<tr><td>${i.orderId}</td><td>${i.id}</td><td>${i.itemCode}</td><td>${i.price}</td><td>${i.qty}</td><td>${i.tot}</td> </tr>`;

        $("#tblOrder").append(row);
    }

    $("#tblOrder>tr").click(function () {
        console.log($(this));

        let orderDTO = new OrderDTO(
            $(this).children(":eq(0)").text(),
            $(this).children(":eq(1)").text(),
            $(this).children(":eq(2)").text(),
            $(this).children(":eq(3)").text(),
            $(this).children(":eq(4)").text(),
            $(this).children(":eq(5)").text());

        $("#txtOrderId").val(orderDTO.oid);
        $("#txtCustomerIds").val(orderDTO.cid);
        $("#txtItemCodes").val(orderDTO.icode);
        $("#txtItemPrice").val(orderDTO.iprice);
        $("#txtItemQty").val(orderDTO.iqty);
        $("#txtTotal").val(orderDTO.total);

    });
}

function addOrder() {
    let dC = duplicateCheck();

    if (dC) {
        alert("This CustomerId Already Added ,Try Again")
    } else {
        confirm("Do you want to add this Customer..?")


        let orderDTO = new OrderDTO(
            $("#txtOrderId").val(),
            $("#txtCustomerIds").val(),
            $("#txtItemCodes").val(),
            $("#txtItemPrice").val(),
            $("#txtItemQty").val(),
            $("#txtTotal").val());


        var orderObject = {
            orderId: orderDTO.oid,
            id: orderDTO.cid,
            itemCode: orderDTO.icode,
            price: orderDTO.iprice,
            qty : orderDTO.iqty,
            tot : orderDTO.total

        };
        orderDB.push(orderObject);
    }
}

function clearAllOrders() {

}