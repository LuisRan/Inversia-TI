import { memo, useEffect, useRef } from 'react';

function MarketOverview() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = `{
      "colorTheme": "dark",
      "locale": "en",
      "width": "400",
      "height": "550",
      "showChart": true,
      "tabs": [
        {
          "title": "Indices",
          "symbols": [
            { "s": "FOREXCOM:SPXUSD", "d": "S&P 500" },
            { "s": "FOREXCOM:NSXUSD", "d": "US 100" },
            { "s": "FOREXCOM:DJI", "d": "Dow Jones" },
            { "s": "INDEX:NKY", "d": "Nikkei 225" },
            { "s": "INDEX:DEU40", "d": "DAX" },
            { "s": "FOREXCOM:UKXGBP", "d": "FTSE 100" }
          ]
        },
        {
          "title": "Futures",
          "symbols": [
            { "s": "BMFBOVESPA:ISP1!", "d": "S&P 500" },
            { "s": "CMCMARKETS:GOLD", "d": "Gold" },
            { "s": "PYTH:WTI3!", "d": "WTI Oil" },
            { "s": "BMFBOVESPA:CCM1!", "d": "Corn" }
          ]
        },
        {
          "title": "Bonds",
          "symbols": [
            { "s": "EUREX:FGBL1!", "d": "Euro Bund" },
            { "s": "EUREX:FBTP1!", "d": "Euro BTP" }
          ]
        },
        {
          "title": "Forex",
          "symbols": [
            { "s": "FX:EURUSD", "d": "EUR/USD" },
            { "s": "FX:USDJPY", "d": "USD/JPY" },
            { "s": "FX:GBPUSD", "d": "GBP/USD" }
          ]
        }
      ]
    }`;
    container.current?.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(MarketOverview);
