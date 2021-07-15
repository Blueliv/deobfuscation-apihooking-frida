var ptrCreateProcessW = Module.findExportByName("Kernel32.dll", "CreateProcessW");
Interceptor.attach( ptrCreateProcessW, {
    onEnter: function (args) {
        var lpCommandLine = Memory.readUtf16String(args[1]);
        var inst = {
            "api_call" : "CreateProcessW",
            "params" : {
                "lptstr":lpCommandLine
            }
        };
        send(inst);
    }
});
