var ptrWSASend = Module.findExportByName("WS2_32.DLL", "WSASend");
Interceptor.attach(ptrWSASend, {
    onEnter: function (args) {
        var buff_len =  Memory.readInt(ptr(args[1]));
        var a = parseInt(args[1]) + 4;
        var ptrReq = Memory.readInt(ptr(a));
        var req = Memory.readCString(ptr(ptrReq), buff_len)

        var inst = {
            "api_call" : "WSASend",
            "params" : {
                "buff_len" : buff_len,
                "request" : req

            }
        };
        send(inst);
    }
});