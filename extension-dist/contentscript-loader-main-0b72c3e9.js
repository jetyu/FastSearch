(function () {
            (async () => {
                  await import(
                    chrome.runtime.getURL("assets/main-0b72c3e9.js")
                  );
                })().catch(console.error);
            })();