import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

const server = new Server(
    { name: "exchange-rate-server", version: "1.0.0" },
    { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [{
        name: "get_exchange_rate",
        description: "Get current exchange rates between currencies (Uses Frankfurter + Fallback for 150+ currencies)",
        inputSchema: {
            type: "object",
            properties: {
                from: { type: "string", description: "Source currency (e.g. USD)" },
                to: { type: "string", description: "Target currency (e.g. KRW)" }
            },
            required: ["from", "to"]
        }
    }]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name !== "get_exchange_rate") {
        throw new Error("Tool not found");
    }

    const { from, to } = request.params.arguments as { from: string; to: string };
    const fromCurrency = from.toUpperCase();
    const toCurrency = to.toUpperCase();

    if (fromCurrency === toCurrency) {
        return {
            content: [{ type: "text", text: `The current rate from ${fromCurrency} to ${toCurrency} is 1` }]
        };
    }

    try {
        // Primary Attempt: Use Frankfurter public API
        const response = await axios.get(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`);
        const rate = response.data.rates[toCurrency];
        
        if (!rate) {
             throw new Error(`Target currency ${toCurrency} not found in Frankfurter.`);
        }

        return {
            content: [{ type: "text", text: `The current rate from ${fromCurrency} to ${toCurrency} is ${rate} (Source: Frankfurter/ECB)` }]
        };
    } catch (frankfurterError: any) {
        // Fallback Attempt: Use open currency-api hosted on jsdelivr for unsupported currencies (TWD, VND, RUB, etc.)
        try {
            const fallbackResponse = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.toLowerCase()}.json`);
            const fallbackRates = fallbackResponse.data[fromCurrency.toLowerCase()];
            
            if (!fallbackRates) {
                throw new Error("Source currency not found in fallback API.");
            }

            const fallbackRate = fallbackRates[toCurrency.toLowerCase()];

            if (!fallbackRate) {
                 throw new Error(`Target currency ${toCurrency} not found in fallback API either.`);
            }

            return {
                content: [{ type: "text", text: `The current rate from ${fromCurrency} to ${toCurrency} is ${fallbackRate} (Source: Currency-API Fallback)` }]
            };

        } catch (fallbackError: any) {
             return {
                content: [{ type: "text", text: `Error fetching exchange rate from both primary and fallback APIs. Unsupported currency pair: ${fromCurrency} to ${toCurrency}` }],
                isError: true
            };
        }
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch(console.error);