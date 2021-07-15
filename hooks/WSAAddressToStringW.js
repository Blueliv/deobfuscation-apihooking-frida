var ptrWSAAddressToStringW = Module.findExportByName("WS2_32.DLL", "WSAAddressToStringW");
Interceptor.attach(ptrWSAAddressToStringW, {
    onEnter: function (args) {
        var inst = {
            "api_call" : "WSAAddressToStringW",
            "params" : {
            }
        };
        send(inst);
    }
});