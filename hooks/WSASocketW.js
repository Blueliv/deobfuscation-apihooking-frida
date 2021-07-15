var ptrWSASocketW = Module.findExportByName("WS2_32.DLL", "WSASocketW");
Interceptor.attach(ptrWSASocketW, {
    onEnter: function (args) {
        var inst = {
            "api_call" : "WSASocketW",
            "params" : {
            }
        };
        send(inst);
    }
});