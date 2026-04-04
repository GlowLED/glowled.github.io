(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports) {
      window.throttle = (func, limit) => {
        let lastFunc, lastRan;
        return (...args) => {
          const context = exports;
          if (!lastRan || Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(
              () => {
                func.apply(context, args);
                lastRan = Date.now();
              },
              limit - (Date.now() - lastRan)
            );
          }
        };
      };
      (function() {
        [Element, Document, Window].forEach((target) => {
          target.prototype._addEventListener = target.prototype.addEventListener;
          target.prototype._removeEventListener = target.prototype.removeEventListener;
          target.prototype.addEventListener = target.prototype.on = function(name, listener, options) {
            this.__listeners__ = this.__listeners__ || {};
            this.__listeners__[name] = this.__listeners__[name] || [];
            for (let [l, o] of this.__listeners__[name]) {
              if (l === listener && JSON.stringify(o) === JSON.stringify(options)) {
                return this;
              }
            }
            this.__listeners__[name].push([listener, options]);
            this._addEventListener(name, listener, options);
            return this;
          };
          target.prototype.removeEventListener = target.prototype.off = function(name, listener, options) {
            if (!this.__listeners__ || !this.__listeners__[name]) {
              return this;
            }
            if (!listener) {
              this.__listeners__[name].forEach(([listener2, options2]) => {
                this.removeEventListener(name, listener2, options2);
              });
              delete this.__listeners__[name];
              return this;
            }
            this._removeEventListener(name, listener, options);
            this.__listeners__[name] = this.__listeners__[name].filter(
              ([l, o]) => l !== listener || JSON.stringify(o) !== JSON.stringify(options)
            );
            if (this.__listeners__[name].length === 0) {
              delete this.__listeners__[name];
            }
            return this;
          };
        });
        window._$ = (selector) => document.querySelector(selector);
        window._$$ = (selector) => document.querySelectorAll(selector);
        const themeButton = document.createElement("a");
        themeButton.className = "nav-icon dark-mode-btn";
        _$("#sub-nav").append(themeButton);
        const osMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        function setTheme(config) {
          const isAuto = config === "auto";
          const isDark = config === "true" || isAuto && osMode;
          document.documentElement.setAttribute("data-theme", isDark ? "dark" : null);
          localStorage.setItem("dark_mode", config);
          themeButton.id = `nav-${config === "true" ? "moon" : config === "false" ? "sun" : "circle-half-stroke"}-btn`;
          document.body.dispatchEvent(
            new CustomEvent(`${isDark ? "dark" : "light"}-theme-set`)
          );
        }
        const savedMode = localStorage.getItem("dark_mode") || document.documentElement.getAttribute("data-theme-mode") || "auto";
        setTheme(savedMode);
        themeButton.addEventListener(
          "click",
          throttle(() => {
            const modes = ["auto", "false", "true"];
            const nextMode = modes[(modes.indexOf(localStorage.getItem("dark_mode")) + 1) % 3];
            setTheme(nextMode);
          }, 1e3)
        );
        let oldScrollTop = 0;
        document.addEventListener("scroll", () => {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          const diffY = scrollTop - oldScrollTop;
          window.diffY = diffY;
          oldScrollTop = scrollTop;
          if (diffY < 0) {
            _$("#header-nav")?.classList.remove("header-nav-hidden");
          } else {
            _$("#header-nav")?.classList.add("header-nav-hidden");
          }
        });
        if (window.Pace) {
          Pace.on("done", () => {
            Pace.sources[0].elements = [];
          });
        }
        if (window.materialTheme) {
          let appendStylesheet2 = function() {
            const existingStyle = _$("#reimu-generated-theme-style");
            if (existingStyle) {
              return;
            }
            const css = `
    :root {
      --red-0: var(--md-sys-color-primary-light);
      --red-1: color-mix(in srgb, var(--md-sys-color-primary-light) 90%, white);
      --red-2: color-mix(in srgb, var(--md-sys-color-primary-light) 75%, white);
      --red-3: color-mix(in srgb, var(--md-sys-color-primary-light) 55%, white);
      --red-4: color-mix(in srgb, var(--md-sys-color-primary-light) 40%, white);
      --red-5: color-mix(in srgb, var(--md-sys-color-primary-light) 15%, white);
      --red-5-5: color-mix(in srgb, var(--md-sys-color-primary-light) 10%, white);
      --red-6: color-mix(in srgb, var(--md-sys-color-primary-light) 5%, white);
    
      --color-border: var(--red-3);
      --color-link: var(--red-1);
      --color-meta-shadow: var(--red-6);
      --color-h2-after: var(--red-1);
      --color-red-6-shadow: var(--red-2);
      --color-red-3-shadow: var(--red-3);
    }
    
    [data-theme="dark"]:root {
      --red-0: var(--red-1);
      --red-1: color-mix(in srgb, var(--md-sys-color-primary-dark) 90%, white);
      --red-2: color-mix(in srgb, var(--md-sys-color-primary-dark) 80%, white);
      --red-3: color-mix(in srgb, var(--md-sys-color-primary-dark) 75%, white);
      --red-4: color-mix(in srgb, var(--md-sys-color-primary-dark) 30%, transparent);
      --red-5: color-mix(in srgb, var(--md-sys-color-primary-dark) 20%, transparent);
      --red-5-5: color-mix(in srgb, var(--md-sys-color-primary-dark) 10%, transparent);
      --red-6: color-mix(in srgb, var(--md-sys-color-primary-dark) 5%, transparent);
      
      --color-border: var(--red-5);
    }
    `;
            const style = document.createElement("style");
            style.id = "reimu-generated-theme-style";
            style.textContent = css;
            document.body.appendChild(style);
          };
          var appendStylesheet = appendStylesheet2;
          const extractor = new materialTheme.ColorThemeExtractor({
            needTransition: false
          });
          async function generateScheme(imageFile) {
            const scheme = await extractor.generateThemeSchemeFromImage(imageFile);
            document.documentElement.style.setProperty(
              "--md-sys-color-primary-light",
              extractor.hexFromArgb(scheme.schemes.light.props.primary)
            );
            document.documentElement.style.setProperty(
              "--md-sys-color-primary-dark",
              extractor.hexFromArgb(scheme.schemes.dark.props.primary)
            );
            appendStylesheet2();
          }
          window.generateSchemeHandler = () => {
            if (window.bannerElement?.src) {
              if (window.bannerElement.complete) {
                generateScheme(bannerElement);
              } else {
                window.bannerElement.addEventListener(
                  "load",
                  () => {
                    generateScheme(bannerElement);
                  },
                  { once: true }
                );
              }
            } else if (window.bannerElement?.style.background) {
              const rgba = window.bannerElement.style.background.match(/\d+/g);
              const scheme = extractor.generateThemeScheme({
                r: parseInt(rgba[0]),
                g: parseInt(rgba[1]),
                b: parseInt(rgba[2])
              });
              document.documentElement.style.setProperty(
                "--md-sys-color-primary-light",
                extractor.hexFromArgb(scheme.schemes.light.props.primary)
              );
              document.documentElement.style.setProperty(
                "--md-sys-color-primary-dark",
                extractor.hexFromArgb(scheme.schemes.dark.props.primary)
              );
              appendStylesheet2();
            }
          };
        }
      })();
      window.safeImport = async (url, integrity) => {
        if (!integrity) {
          return import(url);
        }
        const response = await fetch(url);
        const moduleContent = await response.text();
        const actualHash = await crypto.subtle.digest(
          "SHA-384",
          new TextEncoder().encode(moduleContent)
        );
        const hashBase64 = "sha384-" + btoa(String.fromCharCode(...new Uint8Array(actualHash)));
        if (hashBase64 !== integrity) {
          throw new Error(`Integrity check failed for ${url}`);
        }
        const blob = new Blob([moduleContent], { type: "application/javascript" });
        const blobUrl = URL.createObjectURL(blob);
        const module2 = await import(blobUrl);
        URL.revokeObjectURL(blobUrl);
        return module2;
      };
      var quotes = [
        "\u843D\u971E\u4E0E\u5B64\u9E5C\u9F50\u98DE\uFF0C\u79CB\u6C34\u5171\u957F\u5929\u4E00\u8272",
        "\u7AF9\u6756\u8292\u978B\u8F7B\u80DC\u9A6C\uFF0C\u8C01\u6015\uFF1F\u4E00\u84D1\u70DF\u96E8\u4EFB\u5E73\u751F",
        "\u4E14\u5C06\u65B0\u706B\u8BD5\u65B0\u8336\uFF0C\u8BD7\u9152\u8D81\u5E74\u534E",
        "\u758F\u5F71\u6A2A\u659C\u6C34\u6E05\u6D45\uFF0C\u6697\u9999\u6D6E\u52A8\u6708\u9EC4\u660F",
        "\u5C0F\u821F\u4ECE\u6B64\u901D\uFF0C\u6C5F\u6D77\u5BC4\u4F59\u751F",
        "\u5C71\u4E0D\u8BA9\u5C18\uFF0C\u5DDD\u4E0D\u8F9E\u76C8",
        "\u8FFD\u98CE\u8D76\u6708\u83AB\u505C\u7559\uFF0C\u5E73\u829C\u5C3D\u5904\u662F\u6625\u5C71",
        "\u6D45\u4E88\u6DF1\u6DF1\uFF0C\u957F\u4E50\u672A\u592E",
        "\u4E91\u5C71\u82CD\u82CD\uFF0C\u6C5F\u6C34\u6CF1\u6CF1",
        "\u5FC3\u6709\u731B\u864E\uFF0C\u7EC6\u55C5\u8537\u8587",
        "\u9189\u540E\u4E0D\u77E5\u5929\u5728\u6C34\uFF0C\u6EE1\u8239\u6E05\u68A6\u538B\u661F\u6CB3",
        "\u4EBA\u751F\u5982\u9006\u65C5\uFF0C\u6211\u4EA6\u662F\u884C\u4EBA",
        "\u6625\u98CE\u5F97\u610F\u9A6C\u8E44\u75BE\uFF0C\u4E00\u65E5\u770B\u5C3D\u957F\u5B89\u82B1",
        "\u6D77\u7EB3\u767E\u5DDD\uFF0C\u6709\u5BB9\u4E43\u5927",
        "\u8DEF\u6F2B\u6F2B\u5176\u4FEE\u8FDC\u516E\uFF0C\u543E\u5C06\u4E0A\u4E0B\u800C\u6C42\u7D22",
        "\u5929\u751F\u6211\u6750\u5FC5\u6709\u7528\uFF0C\u5343\u91D1\u6563\u5C3D\u8FD8\u590D\u6765",
        "\u91C7\u83CA\u4E1C\u7BF1\u4E0B\uFF0C\u60A0\u7136\u89C1\u5357\u5C71",
        "\u660E\u6708\u677E\u95F4\u7167\uFF0C\u6E05\u6CC9\u77F3\u4E0A\u6D41",
        "\u5927\u6F20\u5B64\u70DF\u76F4\uFF0C\u957F\u6CB3\u843D\u65E5\u5706",
        "\u957F\u98CE\u7834\u6D6A\u4F1A\u6709\u65F6\uFF0C\u76F4\u6302\u4E91\u5E06\u6D4E\u6CA7\u6D77",
        "\u66FE\u7ECF\u6CA7\u6D77\u96BE\u4E3A\u6C34\uFF0C\u9664\u5374\u5DEB\u5C71\u4E0D\u662F\u4E91",
        "\u4E24\u60C5\u82E5\u662F\u4E45\u957F\u65F6\uFF0C\u53C8\u5C82\u5728\u671D\u671D\u66AE\u66AE",
        "\u4EBA\u751F\u82E5\u53EA\u5982\u521D\u89C1\uFF0C\u4F55\u4E8B\u79CB\u98CE\u60B2\u753B\u6247",
        "\u6B64\u60C5\u53EF\u5F85\u6210\u8FFD\u5FC6\uFF0C\u53EA\u662F\u5F53\u65F6\u5DF2\u60D8\u7136",
        "\u95EE\u541B\u80FD\u6709\u51E0\u591A\u6101\uFF0C\u6070\u4F3C\u4E00\u6C5F\u6625\u6C34\u5411\u4E1C\u6D41",
        "\u8863\u5E26\u6E10\u5BBD\u7EC8\u4E0D\u6094\uFF0C\u4E3A\u4F0A\u6D88\u5F97\u4EBA\u6194\u60B4",
        "\u4F17\u91CC\u5BFB\u4ED6\u5343\u767E\u5EA6\uFF0C\u84E6\u7136\u56DE\u9996\uFF0C\u90A3\u4EBA\u5374\u5728\u706F\u706B\u9611\u73CA\u5904",
        "\u4EBA\u751F\u81EA\u662F\u6709\u60C5\u75F4\uFF0C\u6B64\u6068\u4E0D\u5173\u98CE\u4E0E\u6708",
        "\u613F\u5F97\u4E00\u5FC3\u4EBA\uFF0C\u767D\u5934\u4E0D\u76F8\u79BB",
        "\u6267\u5B50\u4E4B\u624B\uFF0C\u4E0E\u5B50\u5055\u8001",
        "\u7A7A\u5C71\u65B0\u96E8\u540E\uFF0C\u5929\u6C14\u665A\u6765\u79CB",
        "\u661F\u5782\u5E73\u91CE\u9614\uFF0C\u6708\u6D8C\u5927\u6C5F\u6D41",
        "\u65E0\u8FB9\u843D\u6728\u8427\u8427\u4E0B\uFF0C\u4E0D\u5C3D\u957F\u6C5F\u6EDA\u6EDA\u6765",
        "\u7A7A\u5C71\u4E0D\u89C1\u4EBA\uFF0C\u4F46\u95FB\u4EBA\u8BED\u54CD",
        "\u8FD4\u666F\u5165\u6DF1\u6797\uFF0C\u590D\u7167\u9752\u82D4\u4E0A",
        "\u6708\u843D\u4E4C\u557C\u971C\u6EE1\u5929\uFF0C\u6C5F\u67AB\u6E14\u706B\u5BF9\u6101\u7720",
        "\u5929\u8857\u591C\u8272\u51C9\u5982\u6C34\uFF0C\u5367\u770B\u7275\u725B\u7EC7\u5973\u661F",
        "\u94F6\u70DB\u79CB\u5149\u51B7\u753B\u5C4F\uFF0C\u8F7B\u7F57\u5C0F\u6247\u6251\u6D41\u8424",
        "\u6708\u51FA\u60CA\u5C71\u9E1F\uFF0C\u65F6\u9E23\u6625\u6DA7\u4E2D",
        "\u6625\u6C5F\u6F6E\u6C34\u8FDE\u6D77\u5E73\uFF0C\u6D77\u4E0A\u660E\u6708\u5171\u6F6E\u751F",
        "\u4E0D\u4EE5\u7269\u559C\uFF0C\u4E0D\u4EE5\u5DF1\u60B2",
        "\u77E5\u8DB3\u8005\u5E38\u4E50\uFF0C\u80FD\u5FCD\u8005\u81EA\u5B89",
        "\u5BA0\u8FB1\u4E0D\u60CA\uFF0C\u770B\u5EAD\u524D\u82B1\u5F00\u82B1\u843D",
        "\u53BB\u7559\u65E0\u610F\uFF0C\u671B\u5929\u4E0A\u4E91\u5377\u4E91\u8212",
        "\u4EBA\u95F4\u6709\u5473\u662F\u6E05\u6B22",
        "\u4E16\u754C\u4EE5\u75DB\u543B\u6211\uFF0C\u8981\u6211\u62A5\u4E4B\u4EE5\u6B4C",
        "\u751F\u6D3B\u4E0D\u6B62\u773C\u524D\u7684\u82DF\u4E14\uFF0C\u8FD8\u6709\u8BD7\u548C\u8FDC\u65B9",
        "\u613F\u4F60\u5386\u5C3D\u5343\u5E06\uFF0C\u5F52\u6765\u4ECD\u662F\u5C11\u5E74",
        "\u51E1\u662F\u8FC7\u5F80\uFF0C\u7686\u4E3A\u5E8F\u7AE0",
        "\u5FC3\u82E5\u5411\u9633\uFF0C\u65E0\u8C13\u60B2\u4F24"
      ];
      var typedEffectTimer = null;
      function initTypedEffect() {
        const typedElement = document.querySelector(".typed-subtitle");
        if (!typedElement) return;
        if (typedEffectTimer) {
          clearTimeout(typedEffectTimer);
          typedEffectTimer = null;
        }
        let currentQuoteIndex = -1;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        const pauseTime = 2e3;
        function getRandomQuote() {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * quotes.length);
          } while (newIndex === currentQuoteIndex && quotes.length > 1);
          currentQuoteIndex = newIndex;
          return quotes[newIndex];
        }
        function typeEffect() {
          const currentQuote = quotes[currentQuoteIndex];
          if (isDeleting) {
            typedElement.textContent = currentQuote.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
          } else {
            typedElement.textContent = currentQuote.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
          }
          if (!isDeleting && currentCharIndex === currentQuote.length) {
            isDeleting = true;
            typingSpeed = pauseTime;
          } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            getRandomQuote();
            typingSpeed = 500;
          }
          typedEffectTimer = window.setTimeout(typeEffect, typingSpeed);
        }
        getRandomQuote();
        typedEffectTimer = window.setTimeout(typeEffect, 500);
      }
      initTypedEffect();
      window.addEventListener("pjax:complete", initTypedEffect);
    }
  });
  require_stdin();
})();
