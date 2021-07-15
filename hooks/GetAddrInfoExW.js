var ptrGetAddrInfoExW = Module.findExportByName("WS2_32.DLL", "GetAddrInfoExW");
var GetAddrInfoExW = new NativeFunction(ptrGetAddrInfoExW, 'int', ['pointer', 'pointer', 'uint', 'pointer','pointer','pointer', 'pointer', 'pointer', 'pointer', 'pointer']);
Interceptor.replace(ptrGetAddrInfoExW, new NativeCallback(function (pName, pServiceName, dwNameSpace, lpNspId, pHints, ppResult,timeout, lpOverlapped, lpCompletionRoutine, lpNameHandle) {
    var retval = 11001; 
    if(!DISABLE_DNS)
    {
        retval = GetAddrInfoExW(pName, pServiceName, dwNameSpace, lpNspId, pHints, ppResult,timeout, lpOverlapped, lpCompletionRoutine, lpNameHandle);
    }
    if(FAKE_DOMAIN){
        var ptrFakeDomain = Memory.allocUtf16String(FAKE_DOMAIN);
        retval = GetAddrInfoExW(ptrFakeDomain, pServiceName, dwNameSpace, lpNspId, pHints, ppResult,timeout, lpOverlapped, lpCompletionRoutine, lpNameHandle);   
    }
    var inst = {
            "api_call" : "GetAddrInfoExW",
            "params" : {
                "host" : Memory.readUtf16String(pName)
            }
    };
    send(inst);
    return retval;
},'int', ['pointer', 'pointer', 'uint', 'pointer','pointer','pointer', 'pointer', 'pointer', 'pointer', 'pointer']));
