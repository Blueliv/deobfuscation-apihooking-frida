var ptrWSAStartup = Module.findExportByName("WS2_32.DLL", "WSAStartup");
Interceptor.attach(ptrWSAStartup, {
    onEnter: function (args) {
        var inst = {
            "api_call" : "WSAStartup",
            "params" : {
            }
        };
        send(inst);
    }
});