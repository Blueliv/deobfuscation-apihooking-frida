import frida
from rich.tree import Tree
from rich import print as rprint
import sys, os
from os import walk
import argparse

CSCRIPT_PATH = "C:\\Windows\\System32\\cscript.exe"
POWERSHELL_PATH = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
WINWORD_PATH = "C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.exe"
CSCRIPT_EXTENSIONS = ("js","vbs","wsf")
POWERSHELL_EXTENSIONS = ("ps1")
WORD_EXTENSIONS = ("docx","doc","rtf")


def on_message(message, data):
    tree = Tree(":black_small_square: [bold]" + message["payload"]["api_call"] + "[/bold] called")
    max_len = 0
    if "params" in message["payload"]:
        for i in message["payload"]["params"]:
            if len(i) > int(max_len):
                max_len = len(i) + 2
        b="{:<" + str(max_len) + "} {}"
        for i in message["payload"]["params"]:
            tree.add(b.format(i+":",message["payload"]["params"][i]))
    rprint(tree)

def on_new_child(self, child):
    print("New child: {}".format(child))

def main(target, disable_shell, disable_dns, fake_dns):
    cmd = target
    
    if target.endswith(CSCRIPT_EXTENSIONS): 
        cmd = [CSCRIPT_PATH, target]
    if target.endswith(POWERSHELL_EXTENSIONS): 
        cmd = [POWERSHELL_PATH, target]
    if target.endswith(WORD_EXTENSIONS): 
        cmd = [WINWORD_PATH, target]

    device = frida.get_local_device()
    device.on("child-added", on_new_child)
    pid = frida.spawn(cmd)

    session = frida.attach(pid)
    BASE_DIR = os.getcwd()+"\\hooks\\"

    js = """
        var DISABLE_SHELL = {};
        var DISABLE_DNS = {};
        var FAKE_DOMAIN = "{}";
    """.format(str(disable_shell).lower(),
                str(disable_dns).lower(),
                fake_dns
    )
    _, _, hooks = next(walk(BASE_DIR))
    
    for hook in hooks:
        with open(BASE_DIR+hook, "r") as fp:
            js += fp.read()

    script = session.create_script(js)
    script.on('message', on_message)
    script.load()
    print("[*] Hooking Process {}".format(pid))
    frida.resume(pid)
    print("[!] Ctrl+D on UNIX, Ctrl+Z on Windows/cmd.exe to detach from instrumented program.\n\n")
    sys.stdin.read()
    session.detach()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("target", help="Path to target file")
    parser.add_argument("--disable-shell", action='store_true', help="Disable shell commands")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--disable-dns", action='store_true', help="Disable DNS lookups")
    group.add_argument("--fake-dns", help="Set a fake domain to resolve all DNS request to. Ex --fake-dns fake.domain")
    args = vars(parser.parse_args())
    main(**args)
