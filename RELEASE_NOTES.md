# 🚀 Release v1.0.0: Initial Stable Release

The first stable release of `exchange-rate-mcp` is here! 🎉
This tool allows AI Agents (like Claude Desktop) to seamlessly fetch real-time exchange rates across the globe via the Model Context Protocol (MCP).

## ✨ Key Features
- **Dual-API System for Global Coverage**: 
  - 🥇 Primary API: **Frankfurter (ECB Data)** for 30 major currencies (USD, KRW, EUR, JPY, etc.).
  - 🥈 Fallback API: **Currency-API (JSDelivr)** for 150+ additional currencies (TWD, VND, RUB, etc.) that the ECB does not track natively.
- **Zero Configuration**: Absolutely no API keys or signups are required. It works out of the box!
- **Npx Execution**: Fully published to NPM. You can run it instantly using `npx -y exchange-rate-mcp` without downloading any source code.

## 🛠️ Installation for Claude Desktop (Zero Setup)
Simply add the following to your `claude_desktop_config.json`:
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

Enjoy seamless, secure, and real-time exchange conversions directly within your AI workflow! 🌍💰

---

## 🇰🇷 v1.0.0 릴리즈 노트

안정화된 첫 번째 정식 버전(`v1.0.0`)이 릴리즈 되었습니다! 🎉 
Claude 등 MCP 호환 AI 에이전트가 전세계 통화 환율을 실시간으로 가져올 수 있게 해주는 도구입니다.

### ✨ 주요 기능
- **이중 API(Dual-API) 폴백 시스템 탑재**:
  - 🥇 메인 API: 유럽 중앙은행(ECB) 데이터를 기반으로 한 **Frankfurter API** (주요 30개국 통화 지원)
  - 🥈 서브 API: 메인에서 지원하지 않는 국가(대만 TWD, 베트남 VND, 러시아 RUB 등 150여 개국)를 위한 대체 오픈소스 API 자동 폴백 지원
- **설정/가입 불필요 (Zero Config)**: API 키 발급 등의 귀찮은 과정 없이 누구나 즉시 이용할 수 있는 완전 개방형 API로만 구성되었습니다!
- **빠른 실행 (npx)**: NPM 배포처리가 완료되어 소스코드를 다운로드하거나 빌드할 필요 없이 `npx` 명령어로 즉각적인 사용이 가능합니다.

### 🛠️ Claude Desktop 연동 방법
`claude_desktop_config.json` 파일에 아래 내용을 추가하시기만 하면 바로 동작합니다!
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
