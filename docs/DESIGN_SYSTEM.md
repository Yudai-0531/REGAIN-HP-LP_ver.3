# REGAIN -Homepage- デザインシステム

## 1. カラーパレット

### CSS変数
```css
:root {
  --bg-primary: #0D0D0D;
  --bg-secondary: #1A1A1A;
  --bg-elevated: #242424;
  --accent-red: #D7003A;
  --accent-red-hover: #FF1A4A;
  --accent-red-glow: rgba(215, 0, 58, 0.3);
  --text-primary: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-muted: #666666;
  --hud-cyan: #00E5FF;
  --hud-green: #00FF88;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(215, 0, 58, 0.4);
}
```

### グラデーション
- ヒーロー背景: `radial-gradient(ellipse at 30% 50%, rgba(215,0,58,0.15), transparent 60%)`
- カードグロー: `linear-gradient(135deg, rgba(215,0,58,0.1), transparent)`
- HUDライン: `linear-gradient(90deg, transparent, var(--hud-cyan), transparent)`

## 2. タイポグラフィ

### 日本語フォント（優先順）
1. **Zen Kaku Gothic New**（ゴシック・モダン・力強い）
2. **Noto Sans JP**（フォールバック）

### 英字フォント
1. **Orbitron**（見出し・ラベル用。サイバー感）
2. **Rajdhani**（サブ見出し・数字用）

### サイズスケール（デスクトップ / モバイル）
- ヒーロー見出し: 72px / 36px（font-weight: 900）
- セクション見出し: 48px / 28px（font-weight: 800）
- サブ見出し: 24px / 18px（font-weight: 600）
- 本文: 16px / 15px（font-weight: 400, line-height: 1.8）
- キャプション: 12px / 11px（font-weight: 500, letter-spacing: 0.1em, uppercase）

### 日本語の行間
- 見出し: line-height: 1.3
- 本文: line-height: 1.8〜2.0（日本語は広めに）

## 3. スペーシング

- セクション間余白: 120px（モバイル80px）
- コンテナ最大幅: 1200px
- コンテナパディング: 0 24px（モバイル 0 16px）
- カード内パディング: 32px（モバイル 24px）

## 4. コンポーネントスタイル

### ボタン: プライマリ（CTA）
- 背景: `var(--accent-red)`
- テキスト: 白、フォントウェイト700、letter-spacing 0.05em
- パディング: 16px 40px
- ボーダー: なし
- ホバー: background → `var(--accent-red-hover)`, box-shadow: `0 0 30px var(--accent-red-glow)`
- 脈打つアニメーション: ボーダーが明滅（pulse-border keyframes）

### ボタン: セカンダリ
- 背景: transparent
- ボーダー: 1px solid `var(--border-accent)`
- ホバー: 背景 `rgba(215,0,58,0.1)`

### カード（プランカード等）
- 背景: `var(--bg-secondary)`
- ボーダー: 1px solid `var(--border-subtle)`
- 角丸: 4px（シャープ）
- HUD装飾: 四隅にL字型のコーナーパーツ（赤 or シアン）
- ホバー: ボーダー → `var(--border-accent)`, box-shadow: `0 0 20px var(--accent-red-glow)`

### HUD装飾パーツ
- スキャンライン: 1px高の半透明白ライン、上から下へゆっくり移動
- コーナーブラケット: position absoluteで四隅にL字線
- ステータスバー: Orbitronフォントで小さなラベル（"SYSTEM ACTIVE" 等）
- グリッチエフェクト: テキストが一瞬ずれるCSS animation

## 5. アニメーション方針

### ページロード（ヒーローのみ）
- テキスト: グリッチエフェクト → フェードイン（stagger 0.2s）
- 背景: 微かなノイズテクスチャがフェードイン
- CTA: 0.8s後にフェードアップ

### スクロール連動（全セクション共通）
- 要素が画面に入った時: フェードアップ（Y: 40px → 0, opacity: 0 → 1）
- duration: 0.6s, ease: power2.out
- 子要素は stagger 0.1s で順番表示
- 一度だけ再生

### ホバー
- ボタン: scale(1.03) + グロー
- カード: ボーダーカラー変化 + 微かな上昇（Y: -4px）
- リンク: 赤のアンダーラインがスライドイン

### 特殊演出
- コスト比較グラフ: スクロールで画面に入った時にアニメーション描画
- プランカード: ホバーでスペック詳細が展開
- ヒーローの「月額管理費」テキスト: グリッチ/粉砕エフェクト

## 6. AIスロップ回避チェックリスト

- ❌ 白背景を使っていないか
- ❌ フォントがInter/Roboto/Arialになっていないか
- ❌ 紫グラデーションが出現していないか
- ❌ 角丸が8pxを超えていないか
- ❌ セクションにアニメーションがないか
- ❌ 全セクション中央揃えで単調になっていないか
- ❌ SPOITEと似た「おとなしい」デザインになっていないか
- ❌ HUD装飾（コーナー、スキャンライン等）が入っているか
