$("#btnSave").click(function () {
    saveCustomer();
    clearAllCustomers();
    loadAllCustomers();
});

$("#btnSearch").click(function () {
    var searchId = $("#txtSearchCusId").val();

    var response = searchCustomer(searchId);
    if (response) {
        $("#txtCusID").val(response.customerId);
        $("#txtCusName").val(response.customerName);
        $("#txtAddress").val(response.customerAddress);
        $("#txtSalary").val(response.customerSalary);
    }else{
        clearAllCustomers();
        alert("No Such a Customer");

    }
});


function loadAllCustomers(){
    $("#customerTable").empty();
    for(var i of customerDB){
        let row= `<tr><td>${i.customerId}</td><td>${i.customerName}</td><td>${i.customerAddress}</td><td>${i.customerSalary}</td> </tr>`;

        $("#customerTable").append(row);
    }
}


function saveCustomer(){
    let customerId = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtAddress").val();
    let customerSalary = $("#txtSalary").val();


    var customerObject = {
        customerId: customerId,
        customerName: customerName,
        customerAddress: customerAddress,
        customerSalary: customerSalary
    };
    customerDB.push(customerObject);
}

function searchCustomer(customerId){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].customerId == customerId) {
            return customerDB[i];
        }
    }
}




// Update()





// Delete






const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCusID,#txtCusName,#txtAddress,#txtSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtCusID,#txtCusName,#txtAddress,#txtSalary').on('blur', function () {
    formValidCustomer();
});


$("#txtCusID").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCusID").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtCusID").val(srcCustomer.getCustomerID());
        $("#txtCusName").val(srcCustomer.getCustomerName());
        $("#txtAddress").val(srcCustomer.getCustomerAddress());
        $("#txtSalary").val(srcCustomer.getCustomerSalary());
    }


});

$("#txtCusName").on('keyup', function (eventOb) {
    setCusButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtAddress").on('keyup', function (eventOb) {
    setCusButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtSalary").on('keyup', function (eventOb) {
    setCusButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#btnSave").attr('disabled', true);

function clearAllCustomers() {
    $('#txtCusID,#txtCusName,#txtAddress,#txtSalary').val("");
    $('#txtCusID,#txtCusName,#txtAddress,#txtSalary').css('border', '2px solid #ced4da');
    $('#txtCusID').focus();
    $("#btnSave").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
}

function formValidCustomer() {
    var cusID = $("#txtCusID").val();
    $("#txtCusID").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCusName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#txtAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtCusName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCusID").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtCusID").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCusName").focus();
        var cusName = $("#txtCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtAddress").focus();
            var cusAddress = $("#txtAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtSalary").focus();
                var cusSalary = $("#txtSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtSalary").focus();
                }
            } else {
                $("#txtAddress").focus();
            }
        } else {
            $("#txtCusName").focus();
        }
    } else {
        $("#txtCusID").focus();
    }
}

function setCusButton() {
    let b = formValidCustomer();
    if (b) {
        $("#btnSave").attr('disabled', false);
    } else {
        $("#btnSave").attr('disabled', true);
    }
}

$('#btnSave').click(function () {
    checkIfValid();
});