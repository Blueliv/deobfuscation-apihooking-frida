var ptrShellExecute = Module.findExportByName("Shell32.dll", "ShellExecuteExW");
var ShellExecute = new NativeFunction(ptrShellExecute, 'int', ['pointer']);
Interceptor.replace(ptrShellExecute, new NativeCallback(function (executeinfo) {
    var retval = 0;
    if(!DISABLE_SHELL)
    {
        retval = ShellExecute(executeinfo);
    }
    var shellinfo_ptr = executeinfo;
    var structure_size = Memory.readUInt(shellinfo_ptr);
    var ptr_file = Memory.readPointer(shellinfo_ptr.add(24));
    var ptr_params = Memory.readPointer(shellinfo_ptr.add(32));
    var lpfile = Memory.readUtf16String(ptr(ptr_file)); 
    var lpparams = Memory.readUtf16String(ptr(ptr_params));
           
    var inst = {
        "api_call" : "ShellExecuteEx",
        "params" : {
            "lpfile" : lpfile,
            "lpparams" : lpparams
        }
    };
    send(inst);
    
    return retval;
},'int',['pointer']));