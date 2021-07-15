var ptrCLSIDFromProgID = Module.findExportByName("Ole32.dll", "CLSIDFromProgID");
Interceptor.attach(ptrCLSIDFromProgID, {
    onEnter: function (args) {
        var inst = {
            "api_call" : "CLSIDFromProgID",
            "params" : {
                "lpszProgID" : Memory.readUtf16String(args[0])
            }
        };
        send(inst);
    }
});