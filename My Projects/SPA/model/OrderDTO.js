function OrderDTO(oid,cid,cname,iprice,iqty,total) {

    var orderId = oid;
    var name = cname;
    var itemCode = icode;
    var price = iprice;
    var qty = iqty;
    var tot = total;


    Object.defineProperty(this, "oid", {
        get: function () {
            return orderId;
        },
        set: function (oid) {
            this.orderId = oid;
        }
    });


    Object.defineProperty(this, "cname", {
        get: function () {
            return name;
        },
        set: function (cname) {
            this.name = cname;
        }
    });

    Object.defineProperty(this, "icode", {
        get: function () {
            return itemCode;
        },
        set: function (icode) {
            this.itemCode = icode;
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


    Object.defineProperty(this, "total", {
        get: function () {
            return tot;
        },
        set: function (total) {
            this.itotd = total;
        }
    });
}
