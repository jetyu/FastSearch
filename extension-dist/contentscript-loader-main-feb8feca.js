(function () {
            (async () => {
                  await import(
                    chrome.runtime.getURL("assets/main-feb8feca.js")
                  );
                })().catch(console.error);
            })();