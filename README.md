# gas_project

## Description

Notion DBに記載している単語とその説明をランダムに2つ取得してLINEに通知する。
Notionに記載していくだけでは覚えられないので、LINEで定期通知することで単語を覚えられるようにする。

## Usage

### 必要なトークン等を取得

事前に必要なトークン等は以下

-   LINE Notify APIのアクセストークン
-   Notion APIのアクセストークン
-   NotionのデータベースのID

### 作成したコードを google 環境へ push する

```
clasp push
```

### Google 環境にあるアプリケーションを WEB エディターで表示する

```
clasp open
```

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
