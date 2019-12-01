
以下のパラメータに従って、ファイル名のリストを出力する
  - baseUrl : DMSF プラグインの入った Redmine
  - project : ファイル名のリスト作るプロジェクト

# Installation and Usage

```
$ yarn install
$ vim config/default.json
$ node index.js
```

## default.json
  - baseUrl : Redmina URL
  - project : プロジェクトID
  - username : ログインするユーザーID
  - passwd :  パスワード