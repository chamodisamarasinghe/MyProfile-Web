$("#btnItemSave").click(function () {
    saveItem();
    clearAll();
    loadAllItems();
});

$("#btnItemSearch").click(function () {
    var searchId = $("#txtSearchItemCode").val();

    var response = searchItem(searchId);
    if (response) {
        $("#txtItemCode").val(response.code);
        $("#txtItemName").val(response.itemName);
        $("#txtPrice").val(response.price);
        $("#txtQty").val(response.qty);
    }else{
        clearAll();
        alert("No Such a Item");

    }
});

function loadAllItems(){
    $("#tableItem").empty();
    for(var i of itemDB){
        let row= `<tr><td>${i.code}</td><td>${i.itemName}</td><td>${i.price}</td><td>${i.qty}</td> </tr>`;

        $("#tableItem").append(row);
    }

    $("#tableItem>tr").click(function () {
        console.log($(this));

        let itemDTO = new ItemDTO(
            $(this).children(":eq(0)").text(),
            $(this).children(":eq(1)").text(),
            $(this).children(":eq(2)").text(),
            $(this).children(":eq(3)").text());

        $("#txtItemCode").val(itemDTO.icode);
        $("#txtItemName").val(itemDTO.iname);
        $("#txtPrice").val(itemDTO.iprice);
        $("#txtQty").val(itemDTO.iqty);

    });
}


function saveItem() {
    // let itemCode = $("#txtItemCode").val();
    // let itemName = $("#txtItemName").val();
    // let price = $("#txtPrice").val();
    // let qty = $("#txtQty").val();
    let dC = duplicateCheck();

    if (dC) {
        alert("This ItemCode Already Added ,Try Again")
    } else {
        confirm("Do you want to add this Item..?")

        let itemDTO = new ItemDTO(
            $("#txtItemCode").val(),
            $("#txtItemName").val(),
            $("#txtPrice").val(),
            $("#txtQty").val());


        var itemObject = {
            code: itemDTO.icode,
            itemName: itemDTO.iname,
            price: itemDTO.iprice,
            qty: itemDTO.iqty
        };
        itemDB.push(itemObject);
    }
}




function searchItem(code){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            return itemDB[i];
        }
    }
}


function duplicateCheck() {
    for (var i = 0; i < itemDB.length; i++) {
        if ($("#txtItemCode").val() === itemDB[i].code) {

            return true;
        }
    }
    return false
}




// item form validation
const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{3,20}$/;
const priceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const qtyRegEx = /^[1-9][0-9]*$/;


$('#txtItemCode,#txtItemName,#txtPrice,#txtQty').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtItemCode,#txtItemName,#txtPrice,#txtQty').on('blur', function () {
    itemFormValid();
});


$("#txtItemCode").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        ifValid();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#txtItemCode").val();
        var srcItem = searchItemFromID(typedItemCode);
        $("#txtItemCode").val(srcItem.getItemCode);
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtPrice").val(srcItem.getPrice());
        $("#txtQty").val(srcItem.getQty());
    }


});

$("#txtItemName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        ifValid();
    }
});

$("#txtPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        ifValid();
    }
});

$("#txtQty").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        ifValid();
    }
});
// focusing events end
$("#btnItemSave").attr('disabled', true);

function clearAll() {
    $('#txtItemCode,#txtItemName,#txtPrice,#txtQty').val("");
    $('#txtItemCode,#txtItemName,#txtPrice,#txtQty').css('border', '2px solid #ced4da');
    $('#txtItemCode').focus();
    $("#btnItemSave").attr('disabled', true);
    loadAllItems();
    $("#lblitemid,#lblitemname,#lblprice,#lblqty").text("");
}

function itemFormValid() {
    var itemCode = $("#txtItemCode").val();
    $("#txtItemCode").css('border', '2px solid green');
    $("#lblitemid").text("");
    if (itemIDRegEx.test(itemCode)) {
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtItemName").css('border', '2px solid green');
            $("#lblitemname").text("");
            var price = $("#txtPrice").val();
            if (priceRegEx.test(price)) {
                var qty = $("#txtQty").val();
                var resp = qtyRegEx.test(qty);
                $("#txtPrice").css('border', '2px solid green');
                $("#lblprice").text("");
                if (resp) {
                    $("#txtQty").css('border', '2px solid green');
                    $("#lblqty").text("");
                    return true;
                } else {
                    $("#txtQty").css('border', '2px solid red');
                    $("#lblqty").text("Item qty is a required field : only numbers");
                    return false;
                }
            } else {
                $("#txtPrice").css('border', '2px solid red');
                $("#lblprice").text("Item price is a required field : Pattern 100 or 100.00");
                return false;
            }
        } else {
            $("#txtItemName").css('border', '2px solid red');
            $("#lblitemname").text("Item is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtItemCode").css('border', '2px solid red');
        $("#lblitemid").text("Item code is a required field : Pattern I00-000");
        return false;
    }
}

function ifValid() {
    var itemCode = $("#txtItemCode").val();
    if (itemIDRegEx.test(itemCode)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#txtPrice").focus();
            var price = $("#txtPrice").val();
            if (priceRegEx.test(price)) {
                $("#txtQty").focus();
                var qty = $("#txtQty").val();
                var resp = qtyRegEx.test(qty);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAll();
                    }
                } else {
                    $("#txtQty").focus();
                }
            } else {
                $("#txtPrice").focus();
            }
        } else {
            $("#txtItemName").focus();
        }
    } else {
        $("#txtItemCode").focus();
    }
}

function setButton() {
    let b = itemFormValid();
    if (b) {
        $("#btnItemSave").attr('disabled', false);
    } else {
        $("#btnItemSave").attr('disabled', true);
    }
}

$('#btnItemSave').click(function () {
    ifValid();
});

// Item validation end


//Update
$("#btnItemUpdate").click(function () {
    // let itemCode = $("#txtItemCode").val();
    // let itemName = $("#txtItemName").val();
    // let price = $("#txtPrice").val();
    // let qty = $("#txtQty").val();

    let itemDTO = new ItemDTO(
      $("#txtItemCode").val(),
      $("#txtItemName").val(),
      $("#txtPrice").val(),
      $("#txtQty").val());


    for (var i = 0; i < itemDB.length; i++) {
        if ($("#txtItemCode").val()==itemDB[i].code){
            console.log("Enter");
            itemDB[i].code= itemDTO.icode;
            itemDB[i].itemName=itemDTO.iname;
            itemDB[i].price=itemDTO.iprice;
            itemDB[i].qty=itemDTO.iqty;
        }
    }
    loadAllItems();
    clearAll();

});



$("#btnItemDelete").click(function () {
    var index = 0;
    for (var i = 0; i < itemDB.length; i++) {
        if ($("#txtItemCode").val() === itemDB[i].code) {
            index = i;
        }
    }
    itemDB.splice(index, 1);
    clearAll();
    $(this).closest('tr').remove();

    confirm("Do you want to delete this Item..?")
});

