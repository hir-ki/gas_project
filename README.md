# gas_project

## Description

機能：Notion DBに記載している単語とその説明をランダムに2つ取得してLINEに通知する。
実装目的・背景：単語をNotionに記載していくだけでは覚えられないので、LINEで定期通知することで覚えられるようにする。

## Usage

```
npm ci
```

### 必要なトークン等を取得

事前に必要なトークン等は以下
以下のトークン情報等をGASのスクリプト・プロパティにセットする
(下記のclasp openでGASのサービス画面を開ける)

-   LINE Notify APIのアクセストークン
-   Notion APIのアクセストークン
-   NotionのデータベースのID

### 作成したコードを GAS 環境へ push する

```
clasp push
```

### GAS 環境にあるアプリケーションを WEB エディターで表示する

```
clasp open
```

### 定期実行する

サービス画面にてトリガーを設定することで定期実行することができる

## curl で情報を取得する

### データベースの情報を取得する

```
curl 'https://api.notion.com/v1/databases/<データベースID>' \
  -H 'Authorization: Bearer <Integrationトークン>' \
  -H 'Notion-Version: 2022-06-28'
```

### データベースのアイテム一覧を取得する

```
curl -X POST 'https://api.notion.com/v1/databases/<データベースID>/query' \
-H 'Authorization: Bearer <Integrationトークン>' \
-H 'Notion-Version: 2022-06-28'
```
