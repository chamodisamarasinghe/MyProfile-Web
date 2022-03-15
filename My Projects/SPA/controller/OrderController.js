
$("#txtOrderId").attr("disabled", true);
function loadAllOrders() {
    $("#tblOrder").empty();
    for (var i of cartTableDB) {
        let row = `<tr><td>${i.orderId}</td><td>${i.iCode}</td><td>${i.iName}</td><td>${i.iQty}</td><td>${i.unPrice}</td><td>${i.orTot}</td></tr>`;
        $("#tblOrder").append(row);
    }
}

function addToCart(){
    let oid=$("#txtOrderId").val();
    let oiCode = $('#txtItemCodes').find(":selected").text();
    let oiName=$("#txtItem").val();
    let oiQty=$("#txtItemQty").val();
    let oiPrice=$("#txtItemPrice").val();
    let oTot=$("#txtTotal").text();

    for (let i=0;i<cartTableDB.length;i++){
        if(cartTableDB[i].iCode===oiCode){
            console.log(cartTableDB[i])
            var newQty=+cartTableDB[i].iQty + +oiQty;
            let newTotal=oiPrice*newQty;
            cartTableDB[i].iQty= newQty;
            cartTableDB[i].orTot=newTotal;
            return;
        }
    }
    let cartDTO = new CartDTO(oid,oiCode,oiName,oiQty,oiPrice,oTot);
    console.log(cartDTO);

    var cartObject = {
        orderId: cartDTO.oid,
        iCode: cartDTO.oiCode,
        iName: cartDTO.oiName,
        iQty: cartDTO.oiQty,
        unPrice: cartDTO.oiPrice,
        orTot: cartDTO.oTot
    }

    cartTableDB.push(cartObject);

}


$("#btnAddDetails").click(function () {

    if($('#txtItemQty').val()!=""){
        qtyUpdate();
        addToCart();
        loadAllOrders();
        $("#txtItemCodes,#txtCustomerIds,#txtItemPrice,#txtItemQty,#txtTotal").val("")

    }else{
        alert("Please Enter Order Qty");
    }
});


function placeOrder() {

    if(saveOrder()){
        console.log("IF lop called")
        for (let i of cartTableDB){
            let orderDetailDTO = new OrderDetailDTO(i.orderId,i.iCode,i.iQty,i.unPrice,i.orTot);
            orderDetailDB.push(orderDetailDTO);
        }
        alert("Successfully Placed")
    }

}

function saveOrder() {
    let oid=$("#txtOrderId").val();
    let cid = $('#txtCustomerIds').find(":selected").text();
    let fullTotal=$("#txtTotal").text();
    let  date=$("#txtOrderDate").val();
    console.log(oid,cid,fullTotal,date,"oid==============>",oid);

    let orderDTO = new OrderDTO(oid,cid,fullTotal,date);
    var orderObject = {
        orderId: orderDTO.oid,
        cusId: orderDTO.cid,
        tot: orderDTO.fullTotal,
        day: orderDTO.date
    }

    console.log("chcke1 oder Dto",orderDTO)
    return orderDB.push(orderObject);
}

function generateOrderID() {
    try {
        let lastOId = orderDB[orderDB.length - 1].orderId;

        console.log("oder Db in Generate",orderDB)
        console.log("lastOId",lastOId)

        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#txtOrderId").val("00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderId").val("O0" + newOId);
        } else {
            $("#txtOrderId").val("O" + newOId);
        }
    } catch (e) {
        $("#txtOrderId").val("001");
    }

}


$("#btnPlaceOrder").click(function () {

    placeOrder();
    generateOrderID();
    cartTableDB.splice(0,cartTableDB.length);
    $('#tblOrder').empty();
    $("#txtItemName,#txtItemPrice,#txtQtyOnHand,#txtItemQty,#txtTotal").val("")
    console.log("orderDetail Db",orderDetailDB)
});


$( document ).ready(function() {
    generateOrderID()
});


function qtyUpdate() {
    let item;
    var itemQty=$('#txtQtyOnHand').val();

    let text = $('#txtItemCodes').find(":selected").text();
    console.log(text)

    var orderQty=$('#txtQty').val();

    for (let i in itemDB){
        console.log(itemDB)
        if($('#txtItemCodes').find(":selected").text()===itemDB[i].code){
            console.log(itemDB[i])
            itemDB[i].quantity=itemQty;
            $('#txtQtyOnHand').val(itemDB[i].quantity);
        }
    }
}



$('#txtCustomerIds').change(function () {
    var customerId = $('#txtCustomerIds').find(":selected").text();
    for (let i = 0; i < customerDB.length; i++) {

        if (customerDB[i].id === customerId) {

            $('#txtCustomerName').val(customerDB[i].name);
            $('#txtCustomerAddress').val(customerDB[i].address);
            $('#txtCustomerSalary').val(customerDB[i].salary);
        }
    }
});

$('#txtItemCodes').change(function () {
    var itemCode = $('#txtItemCodes').find(":selected").text();
    for (let i = 0; i < itemDB.length; i++) {

        if (itemDB[i].code === itemCode) {

            $('#txtItem').val(itemDB[i].itemName);
            $('#txtItemPrice').val(itemDB[i].price);
            $('#txtQtyOnHand').val(itemDB[i].qty);
        }
    }
});


const orderIDRegEx = /^(O)[0-9]{2}$/;
const qtOHRegEx = /^[0-9]{2,}$/;
const cashRegEx = /^[0-9]{2,}$/;


$('#txtOrderId').on('keydown', function (eventOb) {
    var orderID = $("#txtOrderId").val();
    $("#txtOrderId").css('border', '2px solid green');
    $("#lblorderId").text("");
    if (orderIDRegEx.test(orderID)) {
        $("#txtOrderId").css('border', '2px solid green');
        $("#lblorderId").text("");
    }else {
        $("#txtOrderId").css('border', '2px solid red');
        $("#lblorderId").text("Order ID is a required field : Pattern O000");
    }
    if (eventOb.key === "Tab") {
        eventOb.preventDefault();
    }
});


function calculateTotal() {
    let qty = $("#txtItemQty").val();
    let unitPrice = $("#txtItemPrice").val();
    let total = unitPrice * qty;
    $("#txtTotal").text(total);

}

function updateQty() {
    let qtyOnHand = $("#txtQtyOnHand").val();
    let qty = $("#txtItemQty").val();
    let val = qtyOnHand - qty;
    $("#txtQtyOnHand").val(val);
}


$("#btnAddDetails").attr('disabled', true);


$("#txtItemQty").on('keyup', (function (e) {
        calculateTotal();
        let qtyOnHand = $("#txtQtyOnHand").val();
        let qtyTyped = $("#txtItemQty").val();
        let qtyOnHandNumber = parseInt(qtyOnHand);
        let qtyNumber = parseInt(qtyTyped);

        let empty = $("#txtItemQty").empty();
        if (empty) {
            $("#btnAddDetails").attr('disabled', true);
        }

        if (qtyOnHandNumber < qtyNumber) {
            $("#txtItemQty").css('border', '2px solid red');
            $("#lblqty").text("insufficient Quantity");
        } else {
            $("#txtItemQty").css('border', '2px solid green');
            $("#lblqty").text("");
        }
        if (e.key === "Enter") {
            $("#btnAddDetails").attr('disabled', false);
            updateQty();
        }
    }
));

function updateCash() {
    let total = $("#txtTotal").text();
    let cash = $("#txtCash").val();
    let val = cash - total;
    $("#txtBalance").val(val);
}

$("#txtCash").on('keyup', (function (e) {
        let total = $("#txtTotal").text();

        let cash = $("#txtCash").val();
        let cashAmount = parseInt(cash);
        let tot = parseInt(total);
        if (cashAmount < tot) {
            $("#txtCash").css('border', '2px solid red');
            $("#lblcash").text("Insufficient Cash Amount");
            $("#txtChange").val("");
        } else {
            $("#txtCash").css('border', '2px solid green');
            $("#lblcash").text("");
            updateCash()
        }
        setButtonOrder();
        if (e.key === "Enter") {
            checkIfValidOrder();
        }
    }
));


function clearAllOrder() {
    $('#txtOrderId,#txtItemQty,#txtCash').val("");
    $('#txtOrderId,#txtItemQty,#txtCash').css('border', '2px solid #ced4da');
    $("#btnPlaceOrder").attr('disabled', true);
    loadAllOrders();
    $("#lblorderId,#lblorderQty,#lblcash").text("");
}


function checkIfValidOrder() {
    $("#txtItemQty").focus();
    var qty = $("#txtItemQty").val();
    if (qtOHRegEx.test(qty)) {
        $("#txtCash").focus();
        var cash = $("#txtCash").val();
        var resp = cashRegEx.test(cash);
        if (resp) {
            let res = confirm("Do you really want to Purchase this order..?");
            if (res) {
                clearAllOrder();
            }
        } else {
            $("#txtCash").focus();
        }
    } else {
        $("#txtItemQty").focus();
    }
}
