var ptrClrSend = Module.findExportByName("WS2_32.DLL", "send");
Interceptor.attach(ptrClrSend, {
    onEnter: function (args) {
        var buff_len =  parseInt(args[2]);       
        var req = Memory.readCString(args[1], buff_len)

        var inst = {
            "api_call" : "send",
            "params" : {
                "buff_len" : buff_len,
                "request" : req

            }
        };
        send(inst);
    }
});