const vm = new Vue({
  el: "#app",
  data: {
    header: {
      home: true,
      sell: false,
      search: false,
      notification: false,
      mypage: false,
    },
    main: {
      home: true,
      sell: false,
      search: false,
      notification: false,
      mypage: false,
      goods: false,
      favorite: false,
    },
    footer: {
      home: {
        name: "ホーム",
        page: "home",
        icon: "img/svg/home_24px.svg",
        trueIcon: "img/svg/home_true_24px.svg",
        select: true,
      },
      sell: {
        name: "売る",
        page: "sell",
        icon: "img/svg/sell_24px.svg",
        trueIcon: "img/svg/sell_true_24px.svg",
        select: false,
      },
      search: {
        name: "探し物",
        page: "search",
        icon: "img/svg/search_24px.svg",
        trueIcon: "img/svg/search_true_24px.svg",
        select: false,
      },
      notification: {
        name: "お知らせ",
        page: "notification",
        icon: "img/svg/notifications_24px.svg",
        trueIcon: "img/svg/notifications_true_24px.svg",
        select: false,
      },
      mypage: {
        name: "マイページ",
        page: "mypage",
        icon: "img/svg/mypage_24px.svg",
        trueIcon: "img/svg/mypage_true_24px.svg",
        select: false,
      },
    },
    priceBtn: true,
    notification: 1,
    createItemNumber: 1,
    selectItemName: "",
    itemImgCount: 0,
    addPhotoCount: 0,
    newItemImg: [],
    category: [
      "選択してください",
      "レディース",
      "メンズ",
      "ベビー・キッズ",
      "インテリア・住まい・小物",
      "本",
      "音楽",
      "ゲーム",
      "おもちゃ",
      "グッズ",
      "コスメ・香水・美容",
      "家電・スマホ・カメラ",
      "スポーツ・レンジャー",
      "ハンドメイド",
      "チケット",
      "自動車・オートバイ",
      "その他",
    ],
    itemState: [
      "選択してください",
      "新品、未使用",
      "未使用に近い",
      "目立った傷や汚れなし",
      "やや傷や汚れあり",
      "傷や汚れあり",
    ],
    priceCut: ["選択してください", "値上げ交渉あり", "値上げ交渉なし"],
    items: {
      item0: {
        name:
          "Nintendo Switch ドラゴンクエストXI S ロトエディション HAD-S-KBAEA",
        img: ["img/switch.png", "img/switch.png", "img/switch.png"],
        price: 60000,
        totalFavorite: 12,
        favorite: 0,
        description:
          "Nintendo Switch ドラゴンクエストXI S ロトエディション HAD-S-KBAEA<br><br>息子の誕生日のプレゼントでどうしても欲しいです。<br>誕生日プレゼントのため、新品がいいですが新品に近ければ大丈夫です。<br>詳しくは取引チャットでしましょう！",
        category: 7,
        state: 1,
        priceCut: 1,
        hostUser: "user0",
      },
    },
    userProfile: {
      user0: {
        name: "おかざき るい",
        img: "img/profileImg.jpeg",
      },
    },
  },
  methods: {
    sliceBytes: function (item) {
      let itemName_array = item.name.split("");
      let count = 0;
      let str = "";
      for (i = 0; i < itemName_array.length; i++) {
        let n = escape(itemName_array[i]);
        if (n.length < 4) {
          count++;
        } else {
          count += 2;
        }
        if (count > 15) {
          return str + " ...";
        }
        str += item.name.charAt(i);
      }
      return item.name;
    },
    threeBoolData: function (data, bool) {
      this.header[data] = bool;
      this.main[data] = bool;
      this.footer[data].select = bool;
    },
    changePage: function (before, after) {
      this.threeBoolData(before, false);
      // this.header[before] = false;
      // this.main[before] = false;
      // this.footer[before].select = false;
      this.threeBoolData(after, true);
      // this.header[after] = true;
      // this.main[after] = true;
      // this.footer[after].select = true;
    },
    footerChangePage: function (after) {
      for (let i = 0; i < Object.keys(this.footer).length; i++) {
        // console.log(Object.keys(this.footer)[i]);
        // console.log(this.footer[Object.keys(this.footer)[i]]);
        // console.log(this.footer[Object.keys(this.footer)[i]].select);
        this.threeBoolData(Object.keys(this.footer)[i], false);
      }
      this.threeBoolData(after.page, true);
      // console.log(after.page);

      // console.log(Object.keys(this.footer));
      // Object.keys() で配列の key 情報が取得できる。
    },
    itemClick: function () {
      this.main.goods = true;
      this.main.home = false;
    },
    itemClose: function () {
      this.itemImgCount = 0;
      this.main.goods = false;
      this.main.home = true;
    },
    changeItemImg: function (selectItemName, pulsminus) {
      if (pulsminus === 1) {
        if (this.items[selectItemName].img.length - 1 === this.itemImgCount) {
          this.itemImgCount = 0;
        } else {
          this.itemImgCount++;
        }
      } else if (pulsminus === -1) {
        if (0 === this.itemImgCount) {
          this.itemImgCount = this.items[selectItemName].img.length - 1;
        } else {
          this.itemImgCount--;
        }
      } else {
        // console.log("値が正しくありません");
      }
    },
    addFile: function (btnNumber) {
      if (btnNumber === this.addPhotoCount + 1) {
        document.getElementById("photoFile" + btnNumber).click();
      }
    },
    inputImg: function (event) {
      if (this.addPhotoCount === 0) {
        this.newItemImg.splice(0);
      }

      var img = event.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(img[0]);

      var vm = this;
      reader.onload = function () {
        var dataUrl = reader.result;
        vm.newItemImg.push(dataUrl);
      };
      this.addPhotoCount++;
    },
    changePrice: function () {
      var itemPrice = document.getElementById("itemPrice").value;
      var itemPriceFee = document.getElementById("itemPriceFee");
      var itemPricePayment = document.getElementById("itemPricePayment");
      if (itemPrice == "") {
        itemPrice = 0;
      }
      var price = parseInt(itemPrice, 10);
      var fee = parseInt(price / 10, 10);
      itemPriceFee.textContent = fee + "円";
      itemPricePayment.textContent = itemPrice - fee + "円";
    },
    newItemCreate: function () {
      var defaultItemObject = {
        name: "",
        img: [],
        price: "",
        totalFavorite: 0,
        favorite: 0,
        description: "",
        category: "",
        state: "",
        priceCut: "",
        hostUser: "user0",
      };
      var objName = "item" + this.createItemNumber;
      var itemName = document.getElementById("itemName").value;
      var itemImg = this.newItemImg.concat();
      var totalFavorite = Math.floor(Math.random() * (100 + 1 - 0)) + 0;
      var itemDescription = document
        .getElementById("itemDescription")
        .value.replace(/\r?\n/g, "<br>");
      var itemCategory = this.category.indexOf(
        document.getElementById("itemCategory").value
      );
      var itemState = this.itemState.indexOf(
        document.getElementById("itemState").value
      );
      var itemPrice;
      var itemPriceCut;
      if (this.priceBtn === false) {
        itemPrice = -1;
        itemPriceCut = -1;
      } else if (document.getElementById("itemPrice").value === "") {
        itemPrice = 0;
      } else {
        itemPrice = parseInt(document.getElementById("itemPrice").value, 10);
        itemPriceCut = this.priceCut.indexOf(
          document.getElementById("itemPriceCut").value
        );
      }
      // console.log(objName);
      // console.log(itemName);
      // console.log(itemImg);
      // console.log(itemPrice);
      // console.log(itemDescription);
      // console.log(itemCategory);
      // console.log(itemState);
      // console.log(itemPriceCut);

      this.$set(this.items, objName, defaultItemObject);

      this.items[objName].name = itemName;
      this.items[objName].img = itemImg.concat();
      this.items[objName].price = itemPrice;
      this.items[objName].description = itemDescription;
      this.items[objName].category = itemCategory;
      this.items[objName].state = itemState;
      this.items[objName].priceCut = itemPriceCut;

      this.items[objName].totalFavorite = totalFavorite;

      // console.log(this.items[objName].img);
      // console.log(this.items);

      this.createItemNumber++;
      this.addPhotoCount = 0;
      this.newItemImg = [];
      this.changePage("search", "home");
    },
    createConfirm: function () {
      return window.confirm(
        "入力、選択されていない項目があります。よろしいですか？"
      );
    },
    // 移動はまだ
    moveConfirm: function () {
      var bool;
      bool = window.confirm(
        "入力、選択されている項目があります。内容が失われますがよろしいですか？"
      );
    },
    dir: function (any) {
      console.log(any);
      console.dir(any);
    },
  },
});

// const inputFiles =
