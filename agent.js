'use strict';
setTimeout(() => {
    const fairplayCert = "MIIEzjCCA7agAwIBAgIIAXAVjHFZDjgwDQYJKoZIhvcNAQEFBQAwfzELMAkGA1UEBhMCVVMxEzARBgNVBAoMCkFwcGxlIEluYy4xJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MTMwMQYDVQQDDCpBcHBsZSBLZXkgU2VydmljZXMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTIwNzI1MTgwMjU4WhcNMTQwNzI2MTgwMjU4WjAwMQswCQYDVQQGEwJVUzESMBAGA1UECgwJQXBwbGUgSW5jMQ0wCwYDVQQDDARGUFMxMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqZ9IbMt0J0dTKQN4cUlfeQRY9bcnbnP95HFv9A16Yayh4xQzRLAQqVSmisZtBK2/nawZcDmcs+XapBojRb+jDM4Dzk6/Ygdqo8LoA+BE1zipVyalGLj8Y86hTC9QHX8i05oWNCDIlmabjjWvFBoEOk+ezOAPg8c0SET38x5u+TwIDAQABo4ICHzCCAhswHQYDVR0OBBYEFPP6sfTWpOQ5Sguf5W3Y0oibbEc3MAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUY+RHVMuFcVlGLIOszEQxZGcDLL4wgeIGA1UdIASB2jCB1zCB1AYJKoZIhvdjZAUBMIHGMIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlmaWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhlbiBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVzZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNlIHN0YXRlbWVudHMuMDUGA1UdHwQuMCwwKqAooCaGJGh0dHA6Ly9jcmwuYXBwbGUuY29tL2tleXNlcnZpY2VzLmNybDAOBgNVHQ8BAf8EBAMCBSAwFAYLKoZIhvdjZAYNAQUBAf8EAgUAMBsGCyqGSIb3Y2QGDQEGAQH/BAkBAAAAAQAAAAEwKQYLKoZIhvdjZAYNAQMBAf8EFwF+bjsY57ASVFmeehD2bdu6HLGBxeC2MEEGCyqGSIb3Y2QGDQEEAQH/BC8BHrKviHJf/Se/ibc7T0/55Bt1GePzaYBVfgF3ZiNuV93z8P3qsawAqAXzzh9o5DANBgkqhkiG9w0BAQUFAAOCAQEAVGyCtuLYcYb/aPijBCtaemxuV0IokXJn3EgmwYHZynaR6HZmeGRUp9p3f8EXu6XPSekKCCQi+a86hXX9RfnGEjRdvtP+jts5MDSKuUIoaqce8cLX2dpUOZXdf3lR0IQM0kXHb5boNGBsmbTLVifqeMsexfZryGw2hE/4WDOJdGQm1gMJZU4jP1b/HSLNIUhHWAaMeWtcJTPRBucR4urAtvvtOWD88mriZNHG+veYw55b+qA36PSqDPMbku9xTY7fsMa6mxIRmwULQgi8nOk1wNhw3ZO0qUKtaCO3gSqWdloecxpxUQSZCSW7tWPkpXXwDZqegUkij9xMFS1pr37RIg==";

    function newStdStringFromBuffer(content) {
        const size = content.byteLength;
        const cap = 2 ** Math.ceil(Math.log2(size + 1));
        const buffer = Memory.alloc(cap);
        Memory.copy(buffer, content.unwrap(), size);

        const addr = Memory.alloc(Process.pointerSize * 3);
        addr.writeULong(cap | 0x1);
        addr.add(Process.pointerSize).writeULong(size);
        addr.add(Process.pointerSize * 2).writePointer(buffer);

        return { buffer: buffer, str: addr };
    }

    function newStdString(content) {
        const size = content.length;
        const cap = 2 ** Math.ceil(Math.log2(size + 1));
        const buffer = Memory.alloc(cap);
        buffer.writeUtf8String(content);

        const addr = Memory.alloc(Process.pointerSize * 3);
        addr.writeULong(cap | 0x1);
        addr.add(Process.pointerSize).writeULong(size);
        addr.add(Process.pointerSize * 2).writePointer(buffer);

        return { buffer: buffer, str: addr };
    }


    const androidappmusic = Process.getModuleByName("libandroidappmusic.so");

    const sessionCtrlPtr = androidappmusic.getExportByName("_ZN21SVFootHillSessionCtrl8instanceEv");
    const sessionCtrlInstanceFunc = new NativeFunction(sessionCtrlPtr, "pointer", []);
    const sessionCtrlInstance = sessionCtrlInstanceFunc();

    const getPersistentKeyAddr = androidappmusic.getExportByName("_ZN21SVFootHillSessionCtrl16getPersistentKeyERKNSt6__ndk112basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES8_S8_S8_S8_S8_S8_");
    const getPersistentKey = new NativeFunction(getPersistentKeyAddr, "void", Array(9).fill("pointer"));

    const decryptContextAddr = androidappmusic.getExportByName("_ZN21SVFootHillSessionCtrl14decryptContextERKNSt6__ndk112basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEERKN11SVDecryptor15SVDecryptorTypeERKb");
    const decryptContext = new NativeFunction(decryptContextAddr, "void", Array(3).fill("pointer"));

    const NfcRKVnxuKZy04KWbdFu71Ou = androidappmusic.getExportByName("NfcRKVnxuKZy04KWbdFu71Ou");
    const decryptSample = new NativeFunction(NfcRKVnxuKZy04KWbdFu71Ou, 'ulong', ['pointer', 'uint', 'pointer', 'pointer', 'size_t']);

    const kdContextMap = new Map();

    function getkdContext(adam, uri) {
        const uriStr = String.fromCharCode(...new Uint8Array(uri))
        if (kdContextMap.has(uriStr)) {
            return kdContextMap.get(uriStr);
        }

        const defaultId = newStdStringFromBuffer(adam);
        const keyUri = newStdStringFromBuffer(uri);
        const keyFormat = newStdString("com.apple.streamingkeydelivery");
        const keyFormatVer = newStdString("1");
        const serverUri = newStdString("https://play.itunes.apple.com/WebObjects/MZPlay.woa/music/fps");
        const protocolType = newStdString("simplified");
        const fpsCert = newStdString(fairplayCert);
        const persistentKey = Memory.alloc(Process.pointerSize * 2);
        getPersistentKey(persistentKey, sessionCtrlInstance, defaultId.str, keyUri.str, keyFormat.str, keyFormatVer.str, serverUri.str, protocolType.str, fpsCert.str);

        const ptr = persistentKey.readPointer();
        if (ptr.isNull()) return null;

        const svfootHillPKey = Memory.alloc(Process.pointerSize * 2);
        decryptContext(svfootHillPKey, sessionCtrlInstance, ptr);

        const ptr2 = svfootHillPKey.readPointer();
        if (ptr2.isNull()) return null;

        const ap = ptr2.add(0x18).readPointer();
        if (!ap.isNull()) kdContextMap.set(uriStr, ap);
        return ap;
    }

    async function handleConnection(s) {
        // console.log("new connection!");
        while (true) {
            const adamSize = (await s.input.readAll(1)).unwrap().readU8();
            if (adamSize === 0)
                break;
            const adam = await s.input.readAll(adamSize);
            const uriSize = (await s.input.readAll(1)).unwrap().readU8();
            const uri = await s.input.readAll(uriSize);
            const kdContext = getkdContext(adam, uri);
            // console.log(adam, uri, kdContext)
            while (true) {
                const size = (await s.input.readAll(4)).unwrap().readU32();
                if (size === 0)
                    break;
                const sample = await s.input.readAll(size);
                decryptSample(kdContext.readPointer(), 5, sample.unwrap(), sample.unwrap(), sample.byteLength);
                await s.output.writeAll(sample);
            }
        }
        await s.close();
    }

    Socket.listen({
        family: "ipv4",
        port: 10020,
    }).then(async function (listener) {
        while (true) {
            handleConnection(await listener.accept());
        }
    }).catch(console.log);
}, 4000);