# 羅家祖傳黑砂糖刨冰

以參考圖為視覺方向製作的響應式品牌網站。頁面由可編輯的 Angular 元件、樣式與 Express API 組成，不會把整張參考圖當作背景圖片；參考圖中的品牌標誌與店家照片則分別作為網站素材。

## 技術架構

- **Angular 20**：獨立元件式前端，負責導覽、人氣冰品、品牌故事、消息與店鋪資訊。
- **Node.js + Express 5**：提供單頁網站及 `/api/health`、`/api/menu`、`/api/story`、`/api/store` REST 路由。
- **MongoDB + Mongoose**：設定 `MONGODB_URI` 後，菜單 API 會讀取 `menu_items` collection；未設定或沒有菜單資料時，網站使用隨專案提供的唯讀菜單呈現，不會阻擋瀏覽。網站不提供未授權的資料寫入端點。

## 本機開發

環境需 Node.js 20 或更新版本與 pnpm 11。執行 `pnpm install` 安裝依賴，再執行 `pnpm build` 建置 Angular 前端及 Express 伺服器，最後執行 `pnpm start` 啟動網站（預設 port 3000）。`pnpm check` 會重建前端並檢查伺服器 TypeScript。

要啟用 MongoDB，將 `MONGODB_URI` 設為 MongoDB 連線字串；正式部署請使用 Webdev 的受保護環境變數設定，不要將連線字串提交到 Git 或放入前端程式碼。沒有資料庫連線時，網站仍以參考圖素材與預設菜單正常顯示。

## 主要檔案

- `src/app/`：Angular 頁面元件與內容。
- `src/styles.css`：桌機、平板、手機版版面與品牌樣式。
- `public/images/`：網站使用的品牌識別與七張產品、熬煮及店面照片；建置時原樣複製到網站的 `/images/` 路徑。
- `server/`：Express REST API 及 Mongoose 菜單模型。
- `public/manus-routes.json`：網站頁面路由清單。
