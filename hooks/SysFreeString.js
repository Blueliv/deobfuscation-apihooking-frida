var ptrWcsncpy_s = Module.findExportByName("OleAut32.dll", "SysFreeString");
Interceptor.attach( ptrWcsncpy_s, {
    onEnter: function (args) {
        var lpCommandLine = Memory.readUtf16String(args[0]);
        var inst = {
            "api_call" : "SysFreeString",
            "params" : {
                "strDest":lpCommandLine
            }
        };
        if(lpCommandLine != null && (lpCommandLine.toLowerCase().startsWith("powershell") || lpCommandLine.toLowerCase().startsWith("cmd") )){
            send(inst);
        }
    }
});