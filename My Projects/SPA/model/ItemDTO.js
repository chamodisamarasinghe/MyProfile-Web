function ItemDTO(icode,iname,iprice,iqty) {

    var code = icode;
    var itemName = iname;
    var price = iprice;
    var qty = iqty;



    Object.defineProperty(this, "icode", {
        get: function () {
            return code;
        },
        set: function (icode) {
            this.code = icode;
        }
    });



    Object.defineProperty(this, "iname", {
        get: function () {
            return itemName;
        },
        set: function (iname) {
            this.itemName = iname;
        }
    });



    Object.defineProperty(this, "iprice", {
        get: function () {
            return price;
        },
        set: function (iprice) {
            this.price = iprice;
        }
    });



    Object.defineProperty(this, "iqty", {
        get: function () {
            return qty;
        },
        set: function (iqty) {
            this.qty = iqty;
        }
    });
}
