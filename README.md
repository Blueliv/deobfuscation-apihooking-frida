# Installation
Clone or download this repo

    git clone https://github.com/Blueliv/deobfuscation-apihooking-frida.git

Install requirements.txt using pip

    python3 -m pip install -r requirements.txt

# Usage
```
 usage: hook.py [-h] [--disable-shell] [--disable-dns | --fake-dns FAKE_DNS] target
                                                                                                                                                            
    positional arguments:
        target               Path to target file
    optional arguments:
        -h, --help           show this help message and exit
        --disable-shell      Disable shell commands
        --disable-dns        Disable DNS lookups
        --fake-dns FAKE_DNS  Set a fake domain to resolve all DNS request to. Ex --fake-dns fake.domain
```
In order to make --fake-dns work, you should point it to a domain you control or configure it in your hosts file.

However this tool is not meant to be a full CLI tool, its meant to be a poc or a template tool. As you can see it should be pretty easy to add some new hook, and integrate it with the tool by sending back the data with the following format:

    var  inst = {    
    "api_call" :  "api_name",
    "params" : {
			}
	};
    send(inst);

# More info
Blogpost showcasing the tool: https://www.blueliv.com/cyber-security-and-cyber-threat-intelligence-blog-blueliv/apihooking-frida/
