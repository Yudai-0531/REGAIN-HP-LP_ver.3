# REGAIN -Homepage- デザインシステム

## カラーパレット

| Token | HEX | 用途 |
|---|---|---|
| `--color-bg` | `#0D0D0D` | 全体背景（漆黒） |
| `--color-accent` | `#D7003A` | CTA・強調テキスト（攻撃的な赤） |
| `--color-accent-hover` | `#FF1A53` | ホバー時のアクセント |
| `--color-text` | `#FFFFFF` | 本文テキスト（輝く白） |
| `--color-text-muted` | `rgba(255,255,255,0.6)` | 補足テキスト |
| `--color-hud-cyan` | `#00F0FF` | HUD装飾・サブアクセント |
| `--color-hud-green` | `#00FF88` | ステータス表示・微光 |
| `--color-surface` | `#1A1A1A` | カード・セクション背景 |
| `--color-border` | `rgba(255,255,255,0.1)` | ボーダー |

## タイポグラフィ

### フォントファミリー
- **日本語見出し**: `Zen Kaku Gothic New`, weight 900
- **英字・装飾**: `Orbitron`, weight 400-900
- **本文**: `Zen Kaku Gothic New`, weight 400-700

### フォントサイズ（モバイルファースト）

| Token | Mobile | Desktop | 用途 |
|---|---|---|---|
| `--text-hero` | 36px | 72px | ヒーロー見出し |
| `--text-section` | 28px | 48px | セクション見出し |
| `--text-sub` | 18px | 24px | サブ見出し |
| `--text-body` | 16px | 18px | 本文 |
| `--text-small` | 12px | 14px | 注釈・装飾 |

### 行間
- 日本語テキスト: `line-height: 1.8`（広め）
- 英字: `line-height: 1.4`

## スペーシング

- セクション間: 最低 `100px`
- コンテンツ内: `24px` / `48px` / `64px`
- モバイルパディング: `20px`
- デスクトップパディング: `80px`

## コンポーネント

### ボタン
- 角丸: `4px`（シャープ）
- パディング: `16px 48px`
- フォントサイズ: `18px`
- テキスト変換: `uppercase`（英字の場合）
- CTAボタン: `--color-accent` 背景、pulse アニメーション

### カード
- 角丸: `4px`（最大 `8px`、HUD風シャープさ維持）
- ボーダー: `1px solid var(--color-border)`
- 背景: `var(--color-surface)`
- HUDコーナー装飾付き

### HUD装飾
- コーナーブラケット: 2pxの `--color-hud-cyan` ライン
- スキャンライン: 1px 白線、上から下へスクロール
- グリッチエフェクト: テキスト表示時の演出

## アニメーション

### 必須アニメーション
- 全セクション: スクロール連動フェードイン
- テキスト: stagger 表示（0.2s 間隔）
- CTA: pulse ボーダーアニメーション
- 背景: 微かなスキャンライン

### ライブラリ
- GSAP (GreenSock Animation Platform) を使用
- ScrollTrigger プラグインでスクロール連動

## レスポンシブブレークポイント

| Name | Width |
|---|---|
| Mobile | < 768px |
| Tablet | 768px - 1023px |
| Desktop | >= 1024px |
