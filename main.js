const discordWebHookURL = process.env.DISCORD_WEBHOOK_URL;
const spreadsheetId = process.env.SPREADSHEET_ID;

const onOpen = () => {
  // const ui = SpreadsheetApp.getUi(); これはスプレッドシート上に追加したとき(コンテナバインド)にしか使えない
  const ui = SpreadsheetApp.openByUrl(spreadsheetId); //スタンドアローンの場合はこっち
  // ↓はコンテナバインドの場合でしか使えない
  // const menu = ui.createMenu("自作関数など");
  // menu.addItem("実行する", "myFunction");
  // menu.addItem("Discordへ通知", "discordWebHook");
  // menu.addItem("Discordへメンション通知", "discordWebHookMention");
  // menu.addItem("Discordへ埋め込み投稿", "discordWebHookEmbeds");
  // menu.addToUi();
};

function discordWebHook() {
  const message = {
    content: "GASからの通知",
    tts: false,
  };
  const params = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    payload: JSON.stringify(message),
  };

  UrlFetchApp.fetch(discordWebHookURL, params);
}

function discordWebHookMention() {
  const message = {
    content: "<@442986553745211412>をメンションしました",
    tts: false,
  };
  const params = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    payload: JSON.stringify(message),
  };

  UrlFetchApp.fetch(discordWebHookURL, params);
}
function discordWebHookEmbeds() {
  const colorCode = parseInt("ff6fac", 16);
  const message = {
    content: "埋め込みコンテンツ投稿テスト",
    tts: false,
    embeds: [
      {
        // 本文
        title: "【ウマ娘 プリティーダービー】OP映像",
        // リンク(上のタイトルと組み合わせるとリンクテキストになります)
        url: "https://youtu.be/cmuTy73jzSs",
        // 投稿文右上に指定URLの画像をサムネイル表示
        thumbnail: {
          url: "https://cdn.icon-icons.com/icons2/1584/PNG/512/3721679-youtube_108064.png",
        },
        // 画像を埋め込み
        image: { url: "http://img.youtube.com/vi/cmuTy73jzSs/mqdefault.jpg" },
        // 投稿文の色を指定(10進数で指定が必要)
        color: colorCode,
        // 簡単なタイトルと文章を表のように並べることができます(1行:3つまで, サムネイルが入ると2つまで表示)
        fields: [
          {
            name: ":arrow_forward: 再生数",
            value: "362万",
            inline: true,
          },
          {
            name: ":thumbsup: 高評価",
            value: "6.5万",
            inline: true,
          },
        ],
        // フッター(アイコンも指定可能)
        footer: {
          text: "https://twitter.com/uma_musu?s=20",
          icon_url:
            "https://help.twitter.com/content/dam/help-twitter/brand/logo.png",
        },
      },
    ],
  };
  const params = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    payload: JSON.stringify(message),
  };
  UrlFetchApp.fetch(discordWebHookURL, params);
}
function myFunction() {
  console.log("test");
  let fuga = "変数";
  console.log(`jsなので${fuga}の文字列結合とかもできる`);
}
