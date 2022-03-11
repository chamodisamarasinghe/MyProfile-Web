$("#btnSave").click(function () {
    saveCustomer();
    clearAllCustomers();
    loadAllCustomers();
});

$("#btnSearch").click(function () {
    var searchId = $("#txtSearchCusId").val();

    var response = searchCustomer(searchId);
    if (response) {
        $("#txtCusID").val(response.id);
        $("#txtCusName").val(response.name);
        $("#txtAddress").val(response.address);
        $("#txtSalary").val(response.salary);
    }else{
        clearAllCustomers();
        alert("No Such a Customer");

    }
});


function loadAllCustomers(){
    $("#customerTable").empty();
    for(var i of customerDB){
        let row= `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td> </tr>`;

        $("#customerTable").append(row);
    }

    $("#customerTable>tr").click(function () {
        console.log($(this));

        let customerDTO = new CustomerDTO(
            $(this).children(":eq(0)").text(),
            $(this).children(":eq(1)").text(),
            $(this).children(":eq(2)").text(),
            $(this).children(":eq(3)").text());

        $("#txtCusID").val(customerDTO.cid);
        $("#txtCusName").val(customerDTO.cname);
        $("#txtAddress").val(customerDTO.caddress);
        $("#txtSalary").val(customerDTO.csalary);

    });
}


function saveCustomer() {
    let dC = duplicateCheck();

    if (dC) {
        alert("This CustomerId Already Added ,Try Again")
    } else {
        confirm("Do you want to add this Customer..?")

        // let customerId = $("#txtCusID").val();
        // let customerName = $("#txtCusName").val();
        // let customerAddress = $("#txtAddress").val();
        // let customerSalary = $("#txtSalary").val();
        let customerDTO = new CustomerDTO(
            $("#txtCusID").val(),
            $("#txtCusName").val(),
            $("#txtAddress").val(),
            $("#txtSalary").val());

        var customerObject = {
            id: customerDTO.cid,
            name: customerDTO.cname,
            address: customerDTO.caddress,
            salary: customerDTO.csalary

            // customerId: customerId,
            // customerName: customerName,
            // customerAddress: customerAddress,
            // customerSalary: customerSalary
        };
        customerDB.push(customerObject);
    }
}
function searchCustomer(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

function duplicateCheck() {
    for (var i = 0; i < customerDB.length; i++) {
        if ($("#txtCusID").val() === customerDB[i].id) {

            return true;
        }
    }
    return false
}








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




// Update
$("#btnUpdate").click(function () {
    // let customerId = $("#txtCusID").val();
    // let customerName = $("#txtCusName").val();
    // let customerAddress = $("#txtAddress").val();
    // let customerSalary = $("#txtSalary").val();

    let customerDTO = new CustomerDTO(
        $("#txtCusID").val(),
        $("#txtCusName").val(),
        $("#txtAddress").val(),
        $("#txtSalary").val());



    for (var i = 0; i < customerDB.length; i++) {
        if ($("#txtCusID").val()==customerDB[i].id){
            console.log("Enter");
            customerDB[i].id = customerDTO.cid;
            customerDB[i].name = customerDTO.cname;
            customerDB[i].address = customerDTO.caddress;
            customerDB[i].salary = customerDTO.csalary;

            alert("Successfully Updated")
            // customerDB[i].customerId= customerId;
            // customerDB[i].customerName=customerName;
            // customerDB[i].customerddress=customerAddress;
            // customerDB[i].customerSalary=customerSalary;
        }
    }
    loadAllCustomers();
    clearAllCustomers();

});


$("#btnDelete").click(function () {
    var index = 0;
    for (var i = 0; i < customerDB.length; i++) {
        if ($("#txtCusID").val() === customerDB[i].id) {
            index = i;
        }
    }
    customerDB.splice(index, 1);
    clearAll();
    $(this).closest('tr').remove();

    confirm("Do you want to delete this Customer..?")
});