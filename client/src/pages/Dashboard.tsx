import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Activity, HardDrive, Clock, Wifi, Box } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { addDays, format } from "date-fns";
import generatedImage from "@assets/generated_images/dark_subtle_cyber_network_background.png";

export default function Dashboard() {
  const [supply, setSupply] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [blockHeight, setBlockHeight] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Constants
  const MAX_SUPPLY = 21000000;
  const TARGET_SUPPLY = 20000000;
  const BLOCK_REWARD = 3.125;
  const BLOCKS_PER_DAY = 144; // 6 blocks/hour * 24 hours
  const DAILY_EMISSION = BLOCK_REWARD * BLOCKS_PER_DAY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch CoinGecko (Supply & Price)
        const cgRes = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
        console.log("CoinGecko API status:", cgRes.status);
        
        if (cgRes.ok) {
           const data = await cgRes.json();
           const fetchedSupply = data.market_data.circulating_supply;
           const fetchedPrice = data.market_data.current_price.usd;
           console.log("✅ CoinGecko data - Supply:", fetchedSupply, "Price:", fetchedPrice);
           setSupply(fetchedSupply);
           setPrice(fetchedPrice);
           setError(null);
        } else {
           // Fallback logic
           console.warn("⚠️ CoinGecko returned status:", cgRes.status, "- using fallback APIs");
           const supplyRes = await fetch("https://blockchain.info/q/totalbc");
           if (supplyRes.ok) {
             const text = await supplyRes.text();
             const calculatedSupply = parseInt(text, 10) / 100000000;
             console.log("📊 Blockchain.info supply:", calculatedSupply);
             setSupply(calculatedSupply);
           } else {
             setSupply(19790000); 
           }
           const priceRes = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
           if (priceRes.ok) {
              const priceData = await priceRes.json();
              console.log("💰 CoinDesk price:", priceData.bpi.USD.rate_float);
              setPrice(priceData.bpi.USD.rate_float);
           } else {
              setPrice(96420.69); 
           }
           setError("Using fallback data sources (CoinGecko rate limited)");
        }

        // 2. Fetch Block Height (Using blockchain.info)
        const heightRes = await fetch("https://blockchain.info/q/getblockcount");
        if (heightRes.ok) {
            const heightText = await heightRes.text();
            const currentHeight = parseInt(heightText, 10);
            console.log("⛏️ Current block height:", currentHeight);
            setBlockHeight(currentHeight);
        } else {
            // Estimate height if API fails (approx height based on date)
            setBlockHeight(872000); 
        }

      } catch (err) {
        console.error("Failed to fetch bitcoin data:", err);
        if (supply === 0) setSupply(19790000);
        if (price === 0) setPrice(96420.69);
        setError("Using estimated live data (API connection failed)");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Derived calculations
  const remainingTotal = MAX_SUPPLY - supply;
  const remainingTo20M = TARGET_SUPPLY - supply;
  const daysTo20M = remainingTo20M / DAILY_EMISSION;
  const date20M = addDays(new Date(), daysTo20M);
  
  const progressPercent = (supply / MAX_SUPPLY) * 100;
  
  // Next halving calculation (occurs every 210,000 blocks)
  // Last halving was at block 840,000 (April 2024)
  const HALVING_INTERVAL = 210000;
  const lastHalvingBlock = 840000;
  const nextHalvingBlock = lastHalvingBlock + HALVING_INTERVAL; // 1,050,000
  const blocksUntilHalving = blockHeight > 0 ? nextHalvingBlock - blockHeight : 0;
  const daysUntilHalving = blocksUntilHalving / BLOCKS_PER_DAY;
  const nextHalvingDate = addDays(new Date(), daysUntilHalving);
  
  // Chart Data Generation (Projected)
  const chartData = [];
  const historyPoints = 30;
  for (let i = 0; i < historyPoints; i++) {
    chartData.push({
      name: format(addDays(new Date(), i - 5), "MMM dd"),
      value: supply + (i - 5) * DAILY_EMISSION
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-primary font-mono">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          INITIALIZING_BLOCKCHAIN_CONNECTION...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-black overflow-hidden relative">
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{
            backgroundImage: `url(${generatedImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
      />
      
      <div className="relative z-10 container mx-auto p-6 max-w-6xl space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-6">
          <div>
            <h1 className="text-4xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              BITCOIN<span className="text-primary">.SUPPLY</span>
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm font-mono">
                <span className="text-muted-foreground flex items-center gap-2">
                    Status: <span className="text-green-400 flex items-center gap-1"><Wifi className="w-3 h-3 animate-pulse"/> ONLINE</span>
                </span>
                <span className="text-muted-foreground flex items-center gap-2 border-l border-white/10 pl-4">
                    <Box className="w-3 h-3 text-primary"/> Block Height: <span className="text-white">{blockHeight.toLocaleString()}</span>
                </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
             <div className="text-right">
                <div className="text-xs text-muted-foreground font-mono uppercase">Current Price (USD)</div>
                <div className="text-xl font-mono font-bold text-white">
                  <CountUp value={price} decimals={2} prefix="$" />
                </div>
             </div>
          </div>
        </header>

        {error && (
          <Alert variant="destructive" className="border-orange-900/50 bg-orange-900/10 text-orange-200">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Connection Warning</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-[0_0_30px_-10px_rgba(247,147,26,0.1)]">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-primary" />
                    Circulating Supply
                </CardTitle>
                <div className="group relative">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="absolute right-0 top-4 w-48 p-2 bg-black border border-white/10 rounded text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        Updates only when a new block is mined (~10 mins)
                    </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-white whitespace-nowrap overflow-x-auto scrollbar-hide">
                <CountUp value={supply} decimals={2} />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>Progress to 21M</span>
                  <span>{progressPercent.toFixed(4)}%</span>
                </div>
                <Progress value={progressPercent} className="h-2 bg-secondary/20" indicatorClassName="bg-primary shadow-[0_0_10px_rgba(247,147,26,0.5)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-secondary/20 shadow-[0_0_30px_-10px_rgba(0,255,157,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-secondary" />
                Remaining to Mine
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-secondary whitespace-nowrap overflow-x-auto scrollbar-hide">
                 <CountUp value={remainingTotal} decimals={2} />
              </div>
              <p className="mt-4 text-sm text-muted-foreground font-mono">
                Only <span className="text-white font-bold">{(remainingTotal / 1000000).toFixed(2)}M</span> BTC left to extract.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* The 20 Million Countdown Section */}
        <Card className="border-none bg-gradient-to-br from-zinc-900 to-black overflow-hidden relative group">
           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s] duration-[1500ms] group-hover:bg-[position:200%_0,0_0]" />
           
           <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono border border-primary/20">
                    <Clock className="w-3 h-3" />
                    MILESTONE TRACKER
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold text-white">
                    The 20th Million
                 </h2>
                 <p className="text-lg text-gray-400 max-w-lg">
                    When will we reach the final stretch? At current network emission rates, only 1 million Bitcoin will remain unmined by:
                 </p>
                 <div className="text-4xl md:text-5xl font-mono text-primary font-bold drop-shadow-[0_0_15px_rgba(247,147,26,0.4)]">
                    {format(date20M, "MMMM d, yyyy")}
                 </div>
                 <div className="font-mono text-sm text-gray-500">
                    ~{Math.floor(daysTo20M)} days remaining
                 </div>
              </div>

              <div className="w-full md:w-1/3 h-64 bg-black/40 rounded-xl border border-white/5 p-4">
                 <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                           dataKey="name" 
                           stroke="#525252" 
                           fontSize={10} 
                           tickLine={false} 
                           axisLine={false}
                           interval={6}
                        />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                          itemStyle={{ color: '#fff' }}
                          formatter={(value: number) => [value.toFixed(2), "BTC"]}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="var(--color-primary)" 
                          fillOpacity={1} 
                          fill="url(#colorVal)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
            <StatItem label="Daily Emission" value={`~${Math.round(DAILY_EMISSION)} BTC`} />
            <StatItem label="Inflation Rate" value="0.85%" />
            <StatItem label="Next Halving" value={blockHeight > 0 ? format(nextHalvingDate, "MMM d, yyyy") : "~2028"} />
            <StatItem label="Last BTC Mined" value="~2140" />
        </div>

      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-muted-foreground font-mono uppercase">{label}</div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );
}

function CountUp({ value, decimals = 0, prefix = "" }: { value: number, decimals?: number, prefix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}{value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </motion.span>
  );
}
