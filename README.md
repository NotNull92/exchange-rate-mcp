# Exchange Rate MCP Server

A real-time exchange rate tool built with the Model Context Protocol (MCP). This server allows AI agents (like Claude) to fetch accurate, up-to-date currency exchange rates.

[🇺🇸 English Guide](#english-guide) | [🇰🇷 한국어 가이드](#%ED%95%9C%EA%B5%AD%EC%96%B4-%EA%B0%80%EC%9D%B4%EB%93%9C)

---

<br>

## 🇺🇸 English Guide

### Features

- **Current exchange rates**: Uses the reliable Frankfurter public API (based on European Central Bank data).
- **Fallback Support**: Automatically falls back to a secondary open API (currency-api) for 150+ currencies not covered by the ECB.
- **No API Key Required**: Fully open and public APIs. No signup or configuration needed!
- **MCP Integration**: Designed to be integrated directly into MCP-compatible clients (e.g., Claude Desktop).

### Supported Currencies & Update Frequency

This tool utilizes a dual-API approach to cover almost all global currencies:

**✅ Primary API (Frankfurter / ECB)**
The primary API provides exchange rates for **30 major currencies** published by the European Central Bank (`AUD`, `BRL`, `CAD`, `CHF`, `CNY`, `CZK`, `DKK`, `EUR`, `GBP`, `HKD`, `HUF`, `IDR`, `ILS`, `INR`, `ISK`, `JPY`, `KRW`, `MXN`, `MYR`, `NOK`, `NZD`, `PHP`, `PLN`, `RON`, `SEK`, `SGD`, `THB`, `TRY`, `USD`, `ZAR`).
* **Update Frequency:** Every working day around 16:00 CET. Highly accurate for daily rates.

**✅ Fallback API (Currency-API via JSDelivr)**
For any currency **not** in the list above (e.g., `TWD` (Taiwan), `VND` (Vietnam), `RUB` (Russia)), the server automatically falls back to an open CDN that tracks over 150+ global currencies.
* **Update Frequency:** Updated daily. 

*If a currency is completely invalid or non-existent in both APIs, an error will be returned.*

### Installation

You can run this server using `npx` (Node.js is required). No manual downloading or building is necessary!

#### For Claude Desktop

1. Open your Claude Desktop configuration file:
   - **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the following to your `mcpServers` configuration:

```json
{
  "mcpServers": {
    "exchange-rate": {
      "command": "npx",
      "args": [
        "-y",
        "exchange-rate-mcp"
      ]
    }
  }
}
```

3. Restart Claude Desktop. You should now see the `get_exchange_rate` tool available!

### Local Development Setup

If you want to clone this repository and run it locally:

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/NotNull92/exchange-rate-mcp.git
cd exchange-rate-mcp
npm install
```

2. Build and run:
```bash
npm run build
npm start
```

### Available Tools

#### `get_exchange_rate`
Fetches the current exchange rate between two currencies. The output will indicate which data source (Frankfurter or Fallback) was used.
- **Parameters:**
  - `from` (string, required): Source currency code (e.g., "USD").
  - `to` (string, required): Target currency code (e.g., "KRW").

---

<br>

## 🇰🇷 한국어 가이드

### 주요 기능

- **정확한 환율 제공**: 유럽 중앙은행(ECB) 데이터를 기반으로 하는 안정적인 메인 퍼블릭 API (Frankfurter)를 사용합니다.
- **폴백(Fallback) 지원**: 메인 API가 지원하지 않는 150여 개의 전 세계 통화에 대해서는 서브 오픈 API(currency-api)로 자동 전환하여 응답합니다.
- **API 키 불필요**: 완전 개방형 퍼블릭 API를 사용하므로 귀찮은 가입이나 API 키 설정이 필요 없습니다!
- **MCP 연동**: Claude Desktop과 같은 MCP 호환 AI 에이전트에 즉시 연동하여 사용할 수 있도록 설계되었습니다.

### 지원 통화 및 업데이트 주기

이 도구는 전 세계 거의 모든 통화를 지원하기 위해 **두 개의 API를 결합**하여 사용합니다:

**✅ 메인 API (Frankfurter / 유럽 중앙은행 데이터)**
우선적으로 유럽 중앙은행에서 고시하는 **주요 30개국의 통화** 환율을 가져옵니다. (`AUD`, `BRL`, `CAD`, `CHF`, `CNY`, `CZK`, `DKK`, `EUR`, `GBP`, `HKD`, `HUF`, `IDR`, `ILS`, `INR`, `ISK`, `JPY`, `KRW`, `MXN`, `MYR`, `NOK`, `NZD`, `PHP`, `PLN`, `RON`, `SEK`, `SGD`, `THB`, `TRY`, `USD`, `ZAR`)
* **업데이트 주기:** 매 영업일 16:00 CET. 일별 기준 환율로 매우 정확합니다.

**✅ 서브 API (Currency-API JSDelivr 폴백)**
위의 주요 30개국 목록에 없는 통화 코드(예: 대만 `TWD`, 베트남 `VND`, 러시아 `RUB` 등)를 요청할 경우, 150개 이상의 전 세계 통화를 지원하는 서브 오픈 API로 자동 전환(Fallback)되어 해당 환율을 가져옵니다.
* **업데이트 주기:** 매일 주기적으로 업데이트됩니다.

*존재하지 않거나 어떤 API에서도 제공하지 않는 잘못된 통화를 요청할 경우에만 에러를 반환합니다.*

### 설치 및 연동 방법

Node.js 환경의 `npx` 명령어를 통해 손쉽게 실행할 수 있습니다. 수동으로 다운로드하거나 빌드할 필요가 없습니다!

#### Claude Desktop 연동 (추천)

1. Claude Desktop 설정 파일을 엽니다:
   - **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. `mcpServers` 항목에 다음 설정을 추가합니다:

```json
{
  "mcpServers": {
    "exchange-rate": {
      "command": "npx",
      "args": [
        "-y",
        "exchange-rate-mcp"
      ]
    }
  }
}
```

3. Claude Desktop을 완전히 재시작합니다. 이제 `get_exchange_rate` 도구를 사용할 수 있습니다!

### 로컬 개발 환경 구성

코드를 직접 수정하거나 로컬에서 구동해보고 싶은 경우:

1. 레포지토리를 클론하고 패키지를 설치합니다:
```bash
git clone https://github.com/NotNull92/exchange-rate-mcp.git
cd exchange-rate-mcp
npm install
```

2. 빌드하고 실행합니다:
```bash
npm run build
npm start
```

### 제공되는 도구(Tools)

#### `get_exchange_rate`
두 통화 간의 현재 환율을 조회합니다. 결과 텍스트에는 어떤 API(Frankfurter 또는 폴백)에서 가져온 데이터인지 표기됩니다.
- **파라미터 (Parameters):**
  - `from` (문자열, 필수): 기준이 되는 통화 코드 (예: "USD")
  - `to` (문자열, 필수): 대상이 되는 통화 코드 (예: "KRW")
