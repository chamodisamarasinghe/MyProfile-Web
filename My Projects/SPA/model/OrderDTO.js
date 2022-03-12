function OrderDTO(oid,cid,icode,iprice,iqty,total) {

    var orderId = oid;
    var id = cid;
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


    Object.defineProperty(this, "cid", {
        get: function () {
            return id;
        },
        set: function (cid) {
            this.id = cid;
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
