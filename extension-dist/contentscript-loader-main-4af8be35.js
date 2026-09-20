(function () {
            (async () => {
                  await import(
                    chrome.runtime.getURL("assets/main-4af8be35.js")
                  );
                })().catch(console.error);
            })();